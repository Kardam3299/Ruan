export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'Oxidised Earrings' | 'Necklace Sets' | 'Ethnic Kurti Sets' | 'Western Tops';
  price: number;
  mrp: number;
  meeshoCost?: number; // Wholesale supplier price
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  material: string;
  inStock: boolean;
  stockStatus: string;
  sizes?: string[]; // for clothing or rings
  colors?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isAntiTarnish?: boolean;
  specifications: { [key: string]: string };
  shippingInfo: string;
  returnPolicy: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ShippingAddress {
  fullName: string;
  mobileNumber: string;
  pincode: string;
  city: string;
  state: string;
  addressLine: string;
  landmark?: string;
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  userId?: string;
  customerEmail?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'COD' | 'Prepaid';
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: string;
  courierName?: string;
  awbNumber?: string;
  trackingUrl?: string;
  estimatedDeliveryDate: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName: string;
  avatarUrl?: string;
  userImage?: string;
}
