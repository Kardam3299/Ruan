'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, ShippingAddress, OrderStatus } from '@/types/ecommerce';
import { PRODUCTS, INITIAL_SAMPLE_ORDERS } from '@/data/products';
import { saveOrderToCloud, fetchOrdersFromCloud, updateOrderInCloud } from '@/lib/db';

interface CouponState {
  code: string;
  percentage: number;
  discountAmount: number;
  applied: boolean;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  finalTotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  
  // Coupon
  coupon: CouponState;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Modals & UI
  isSizeChartOpen: boolean;
  setIsSizeChartOpen: (open: boolean) => void;
  sizeChartCategory: string;
  openSizeChart: (category: string) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Checkout & Orders
  orders: Order[];
  placeOrder: (shippingAddress: ShippingAddress, paymentMethod: 'COD' | 'Prepaid', userId?: string, customerEmail?: string) => Order;
  getOrderById: (orderIdOrPhone: string) => Order | undefined;
  getUserOrders: (userIdOrEmail: string) => Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderCourier: (orderId: string, courierName: string, awbNumber: string) => void;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;

  // Product Management (Admin)
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 499;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [sizeChartCategory, setSizeChartCategory] = useState('Ethnic Kurti Sets');
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Orders initialized with samples or local storage
  const [orders, setOrders] = useState<Order[]>([]);

  // Coupon
  const [coupon, setCoupon] = useState<CouponState>({
    code: '',
    percentage: 0,
    discountAmount: 0,
    applied: false
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      // Products
      const savedProducts = localStorage.getItem('aura_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        localStorage.setItem('aura_products', JSON.stringify(PRODUCTS));
      }

      // Cart
      const savedCart = localStorage.getItem('aura_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      // Wishlist
      const savedWishlist = localStorage.getItem('aura_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      // Orders (Local cache first, then sync with cloud Firestore)
      const savedOrders = localStorage.getItem('aura_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(INITIAL_SAMPLE_ORDERS);
        localStorage.setItem('aura_orders', JSON.stringify(INITIAL_SAMPLE_ORDERS));
      }

      // Fetch latest orders from central cloud database if connected
      fetchOrdersFromCloud().then((cloudOrders) => {
        if (cloudOrders && cloudOrders.length > 0) {
          setOrders((localOrders) => {
            const map = new Map<string, Order>();
            localOrders.forEach((o) => map.set(o.id, o));
            cloudOrders.forEach((o) => map.set(o.id, o)); // Cloud takes priority
            return Array.from(map.values());
          });
        }
      }).catch((e) => console.warn('[Cloud Sync] Fetch notice:', e));
    } catch (e) {
      console.error('Failed to parse localStorage data', e);
      setOrders(INITIAL_SAMPLE_ORDERS);
    }
  }, []);

  // Sync products
  useEffect(() => {
    try {
      localStorage.setItem('aura_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  // Sync cart
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Sync wishlist
  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Sync orders
  useEffect(() => {
    try {
      localStorage.setItem('aura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const discountAmount = coupon.applied ? Math.round((cartSubtotal * coupon.percentage) / 100) : 0;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 50;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: selectedSize || (product.sizes ? product.sizes[0] : undefined),
            selectedColor: selectedColor || (product.colors ? product.colors[0] : undefined)
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && (!selectedSize || item.selectedSize === selectedSize))
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!selectedSize || item.selectedSize === selectedSize)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon({ code: '', percentage: 0, discountAmount: 0, applied: false });
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'DIRECT15') {
      const disc = Math.round((cartSubtotal * 15) / 100);
      setCoupon({
        code: cleanCode,
        percentage: 15,
        discountAmount: disc,
        applied: true
      });
      setCouponError(null);
      return true;
    } else if (cleanCode === 'WELCOME10') {
      const disc = Math.round((cartSubtotal * 10) / 100);
      setCoupon({
        code: cleanCode,
        percentage: 10,
        discountAmount: disc,
        applied: true
      });
      setCouponError(null);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try "DIRECT15" for 15% OFF.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon({ code: '', percentage: 0, discountAmount: 0, applied: false });
    setCouponError(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const openSizeChart = (category: string) => {
    setSizeChartCategory(category);
    setIsSizeChartOpen(true);
  };

  const placeOrder = (
    shippingAddress: ShippingAddress,
    paymentMethod: 'COD' | 'Prepaid',
    userId?: string,
    customerEmail?: string
  ): Order => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `ORD-${orderNumber}`;
    
    // Delivery estimated 4-6 days from today
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', options);

    const newOrder: Order = {
      id: newOrderId,
      userId,
      customerEmail,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      total: finalTotal,
      paymentMethod,
      shippingAddress,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: formattedDeliveryDate
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Persist to central cloud database (Firebase Firestore)
    saveOrderToCloud(newOrder).catch((err) => {
      console.warn('[Cloud Sync] Background order save notification:', err);
    });

    return newOrder;
  };

  const getOrderById = (query: string): Order | undefined => {
    const cleanQuery = query.trim().toUpperCase();
    return orders.find(
      (order) =>
        order.id.toUpperCase() === cleanQuery ||
        order.id.replace('#', '').toUpperCase() === cleanQuery ||
        order.shippingAddress.mobileNumber.includes(cleanQuery)
    );
  };

  const getUserOrders = (userIdOrEmail: string): Order[] => {
    const clean = userIdOrEmail.trim().toLowerCase();
    return orders.filter(
      (order) =>
        (order.userId && order.userId.toLowerCase() === clean) ||
        (order.customerEmail && order.customerEmail.toLowerCase() === clean) ||
        order.shippingAddress.mobileNumber === clean
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );

    // Sync update to cloud
    updateOrderInCloud(orderId, { status }).catch((err) => {
      console.warn('[Cloud Sync] Status update notification:', err);
    });
  };

  const updateOrderCourier = (orderId: string, courierName: string, awbNumber: string) => {
    const trackingUrl = courierName.toLowerCase().includes('delhivery')
      ? `https://www.delhivery.com/track/package/${awbNumber}`
      : `https://track.shipway.com/${awbNumber}`;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              courierName,
              awbNumber,
              trackingUrl,
              status: 'Dispatched'
            }
          : order
      )
    );

    // Sync courier update to cloud
    updateOrderInCloud(orderId, {
      courierName,
      awbNumber,
      trackingUrl,
      status: 'Dispatched'
    }).catch((err) => {
      console.warn('[Cloud Sync] Courier update notification:', err);
    });
  };

  // Product Management
  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartCount,
        cartSubtotal,
        finalTotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        couponError,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isSizeChartOpen,
        setIsSizeChartOpen,
        sizeChartCategory,
        openSizeChart,
        isTrackModalOpen,
        setIsTrackModalOpen,
        searchQuery,
        setSearchQuery,
        orders,
        placeOrder,
        getOrderById,
        getUserOrders,
        updateOrderStatus,
        updateOrderCourier,
        activeOrder,
        setActiveOrder,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
