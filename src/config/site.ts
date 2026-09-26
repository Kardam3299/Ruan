// RUAN - Central Business & Store Configuration

export const SITE_CONFIG = {
  name: 'RUAN',
  tagline: 'Luxury & Anti-Tarnish Everyday Jewellery & Designer Ethnic Wear',
  owner: {
    name: 'RUAN Store Owner',
    whatsappNumber: '919729656981', // 9729656981 with 91 country code
    phoneDisplay: '+91 97296 56981',
    email: 'support@ruan.in',
    operatingHours: '10:00 AM - 8:00 PM IST (Mon - Sun)',
  },
  support: {
    whatsappUrl: 'https://wa.me/919729656981',
    freeShippingThreshold: 499,
    codAvailable: true,
  },
  social: {
    instagram: 'https://instagram.com/ruan.india',
  },
};

/**
 * Generates direct WhatsApp chat URL with encoded pre-filled text
 */
export function getWhatsAppSupportUrl(message?: string): string {
  const defaultMsg = 'Hi RUAN! I am browsing your store and would like some assistance.';
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${text}`;
}

/**
 * Generates WhatsApp Order Confirmation & Owner Notification URL
 */
export function getWhatsAppOrderNotificationUrl(order: {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  total: number;
  paymentMethod: string;
  items: Array<{ title: string; quantity: number; selectedSize?: string; price: number }>;
}): string {
  const itemsSummary = order.items
    .map((item) => `• ${item.title}${item.selectedSize ? ` (Size: ${item.selectedSize})` : ''} x${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  const text = `🛍️ *NEW ORDER ON RUAN!*\n` +
    `--------------------------------\n` +
    `*Order ID:* ${order.id}\n` +
    `*Amount:* ₹${order.total} (${order.paymentMethod.toUpperCase()})\n\n` +
    `*Customer Details:*\n` +
    `👤 *Name:* ${order.customerName}\n` +
    `📱 *Phone:* ${order.customerPhone}\n` +
    `📍 *Delivery Address:*\n${order.address}, ${order.city}, ${order.state} - ${order.pincode}\n\n` +
    `*Items Ordered:*\n${itemsSummary}\n` +
    `--------------------------------\n` +
    `🚀 *Action Required:* Please open Meesho & place fulfillment to this customer address!`;

  return `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates WhatsApp Product Enquiry URL
 */
export function getWhatsAppProductEnquiryUrl(productTitle: string, price: number, size?: string): string {
  const sizeText = size ? ` in size ${size}` : '';
  const text = `Hi RUAN! I would like to order "${productTitle}"${sizeText} (₹${price}) with Cash on Delivery. Please confirm availability!`;
  return `https://wa.me/${SITE_CONFIG.owner.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
