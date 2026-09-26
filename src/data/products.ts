import { Product, CustomerReview } from '@/types/ecommerce';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'emerald-royal-choker-set',
    name: 'Royal Emerald Green & Kundan Choker Necklace Set',
    category: 'Necklace Sets',
    price: 899,
    mrp: 1999,
    discountPercentage: 55,
    rating: 4.9,
    reviewsCount: 342,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475152-47eac9413247?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Exquisitely handcrafted Kundan choker set adorned with rich emerald green drops and micro-pearl accents. Featuring 18K PVD gold plating, this set is anti-tarnish, hypoallergenic, and crafted for royal festive elegance.',
    material: 'Brass base with 18K PVD Micro Gold Plating, Hydro Emerald Beads, Kundan Crystals',
    inStock: true,
    stockStatus: 'In Stock - Dispatches in 24 Hours',
    isFeatured: true,
    isNewArrival: true,
    isAntiTarnish: true,
    specifications: {
      'Plating': '18K PVD Gold Electroplating (Anti-Tarnish)',
      'Stone Type': 'Handcut Kundan & Emerald Beads',
      'Closure': 'Adjustable Dori (Thread Tassel)',
      'Weight': '85 grams (Necklace + Matching Jhumka Earrings)',
      'Packaging': 'Velvet-lined Luxury Keepsake Gift Box'
    },
    shippingInfo: 'Free Express Delivery on all orders above ₹499. Dispatched within 24 hours with live courier tracking.',
    returnPolicy: '7-Day Hassle-free Exchange/Return policy. In case of any damage or quality issue, replacement is delivered immediately.'
  },
  {
    id: 'prod-2',
    slug: 'anarkali-mulmul-kurti-set',
    name: 'Gulabi Bagh Handblock Pure Mulmul Anarkali Kurti Set',
    category: 'Ethnic Kurti Sets',
    price: 1299,
    mrp: 2799,
    discountPercentage: 54,
    rating: 4.8,
    reviewsCount: 489,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733975-dd285a8a6190?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A breathable, super-soft pure Jaipur Mulmul cotton Anarkali set featuring timeless floral handblock prints, intricate Gota Patti detailing on the neckline, matching straight pants, and a featherlight Kota Doria dupatta.',
    material: '100% Breathable Pure Mulmul Cotton with Organza Gota Detailing',
    inStock: true,
    stockStatus: 'In Stock - Ships in 24 Hours',
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'XXL (44")'],
    colors: ['Dusty Rose Pink', 'Ivory Mint', 'Maroon Festive'],
    isFeatured: true,
    isNewArrival: true,
    specifications: {
      'Fabric': '100% Pure Fine Mulmul Cotton',
      'Kurti Length': '48 Inches (Calf Length Flared Anarkali)',
      'Sleeve Length': '3/4th Sleeves with Gota Lace',
      'Bottom Type': 'Straight Cotton Pant with Elasticated Waistband',
      'Dupatta': '2.25 Meters Handprinted Soft Mulmul with Tassels',
      'Wash Care': 'Gentle Handwash / Machine Wash with Cold Water'
    },
    shippingInfo: 'Cash on Delivery Available across all 28 states. Free shipping within 4-6 business days.',
    returnPolicy: '7-Day Size Exchange and Return guarantee. Doorstep reverse pickup available.'
  },
  {
    id: 'prod-3',
    slug: 'boho-silver-oxidised-jhumkas',
    name: 'Vintage Chandbali Boho Oxidised Silver Statement Jhumkas',
    category: 'Oxidised Earrings',
    price: 399,
    mrp: 899,
    discountPercentage: 56,
    rating: 4.9,
    reviewsCount: 712,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Intricately carved tribal German silver oxidised jhumkas accented with delicate dancing ghungroos. Lightweight on ears and coated with skin-friendly anti-tarnish polish so the shine never fades.',
    material: 'Premium German Silver & Brass with High-Durability Oxidised Finish',
    inStock: true,
    stockStatus: 'In Stock - Ships in 24 Hours',
    isFeatured: true,
    isAntiTarnish: true,
    specifications: {
      'Style': 'Tribal Bohemian Chandbali Jhumka',
      'Earring Height': '3.2 Inches',
      'Weight': 'Lightweight 24 grams per pair (No earlobe pulling)',
      'Skin Friendly': '100% Nickel & Lead Free',
      'Tarnish Protection': 'Dual-coat Anti-Oxidation Seal'
    },
    shippingInfo: 'Free Delivery on prepaid orders or COD orders above ₹499.',
    returnPolicy: '7-Day Replacement Guarantee against transit damages.'
  },
  {
    id: 'prod-4',
    slug: 'rose-gold-waterproof-snake-chain',
    name: '18K Gold Plated Waterproof Herringbone Snake Chain & Pendant',
    category: 'Necklace Sets',
    price: 649,
    mrp: 1499,
    discountPercentage: 57,
    rating: 5.0,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'The viral waterproof daily-wear chain! Crafted in surgical-grade 316L stainless steel with vacuum PVD 18K gold dipping. Wear it to the gym, in the shower, or to a party without fear of rusting, green skin, or tarnishing.',
    material: '316L Surgical Stainless Steel, 18K Real PVD Gold Plating',
    inStock: true,
    stockStatus: 'In Stock - Fast Dispatch',
    isFeatured: true,
    isAntiTarnish: true,
    specifications: {
      'Waterproof': '100% Waterproof, Sweatproof & Perfume-safe',
      'Chain Length': '16 Inches + 2 Inches Extender Chain',
      'Width': '3mm Flat Sleek Herringbone',
      'Hypoallergenic': 'Yes (Zero irritation for sensitive skin)',
      'Guarantee': 'Lifetime Color Guarantee against rust'
    },
    shippingInfo: 'Dispatched in 24 hours. COD available with zero advance payment.',
    returnPolicy: '7-Day Return and Lifetime Anti-Tarnish Assurance.'
  },
  {
    id: 'prod-5',
    slug: 'korean-floral-chiffon-peplum-top',
    name: 'Parisian French Floral Chiffon Peplum Ruched Top',
    category: 'Western Tops',
    price: 599,
    mrp: 1299,
    discountPercentage: 54,
    rating: 4.7,
    reviewsCount: 231,
    images: [
      'https://images.unsplash.com/photo-1564257631407-4deb129f042b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Chic sweetheart neck peplum top crafted from airy premium georgette chiffon with inner butter-crepe lining. Features smocked elastic back for a sculpted silhouette, puffed sleeves, and dainty romantic floral print.',
    material: 'Imported Micro-Georgette Chiffon with Soft Stretch Lining',
    inStock: true,
    stockStatus: 'In Stock - Dispatches in 24 Hours',
    sizes: ['XS (32")', 'S (34")', 'M (36")', 'L (38")', 'XL (40")'],
    colors: ['Vintage Blue Floral', 'Blush Peach Rose', 'Lavender Bloom'],
    isFeatured: true,
    isNewArrival: true,
    specifications: {
      'Fit': 'Slim Fit with Smocked Stretch Back',
      'Neckline': 'Sweetheart Neck with Ruched Bust',
      'Sleeve': 'Sheer Balloon Puff Sleeves with Elastic Cuffs',
      'Fabric Care': 'Machine Wash Gentle Cycle, Steam Iron'
    },
    shippingInfo: 'Fast 4-5 Day delivery via Delhivery / Shadowfax.',
    returnPolicy: '7-Day Size Exchange and Easy Return with home pickup.'
  },
  {
    id: 'prod-6',
    slug: 'chikankari-embroidered-lucknowi-kurti',
    name: 'Lucknowi Hand Embroidered Modal Cotton Chikankari Kurti',
    category: 'Ethnic Kurti Sets',
    price: 999,
    mrp: 2199,
    discountPercentage: 55,
    rating: 4.9,
    reviewsCount: 418,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Traditional handcrafted Lucknowi Chikankari embroidered straight kurti in ultra-soft premium modal cotton. Comes with complimentary matching slip and features intricate Bakhiya and Phanda stitches.',
    material: 'Pure Modal Cotton (Silky soft finish)',
    inStock: true,
    stockStatus: 'In Stock - Ready to Ship',
    sizes: ['S (36")', 'M (38")', 'L (40")', 'XL (42")', 'XXL (44")'],
    colors: ['Powder Blue', 'Lilac Orchid', 'Mint Green', 'Ivory White'],
    isFeatured: true,
    specifications: {
      'Embroidery': 'Original Lucknowi Handcrafted Chikankari Stitches',
      'Kurti Length': '46 Inches Straight Cut with Side Slits',
      'Transparency': 'Comes with matching cotton inner slip included',
      'Style Tip': 'Pair with silver oxidised earrings and white palazzo'
    },
    shippingInfo: 'Delivered in 3-5 days across all Indian PIN codes.',
    returnPolicy: '7 Days Return & Size Exchange guaranteed.'
  },
  {
    id: 'prod-7',
    slug: 'mirror-work-tribal-silver-earrings',
    name: 'Royal Afghan Mirror Work Handcrafted Silver Dangler Earrings',
    category: 'Oxidised Earrings',
    price: 349,
    mrp: 799,
    discountPercentage: 56,
    rating: 4.8,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Statement tribal Afghan danglers adorned with real reflective mirror work and antique silver carved filigree. Hypoallergenic push-back closure, perfect for college, office, and festive poojas.',
    material: 'Silver-toned Brass with Real Mirror Inlays',
    inStock: true,
    stockStatus: 'In Stock - Dispatches in 24 Hours',
    isFeatured: false,
    isAntiTarnish: true,
    specifications: {
      'Length': '2.8 Inches',
      'Weight': '18 Grams',
      'Closure': 'Secure Push Back Post'
    },
    shippingInfo: 'Cash on Delivery Available. Fast Shipping across India.',
    returnPolicy: '7-Day Replacement Guarantee.'
  },
  {
    id: 'prod-8',
    slug: 'satin-cowl-neck-halter-top',
    name: 'Sleek Champagne Silk Satin Cowl Neck Backless Party Top',
    category: 'Western Tops',
    price: 549,
    mrp: 1199,
    discountPercentage: 54,
    rating: 4.8,
    reviewsCount: 195,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564257631407-4deb129f042b?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Ultra-luxurious heavyweight liquid silk satin cowl neck top with an elegant criss-cross tie-up back. Drapes like a dream and pairs effortlessly with wide-leg trousers or denim.',
    material: 'High-Grade Stretch Mulberry Silk Satin',
    inStock: true,
    stockStatus: 'In Stock - Ships in 24 Hours',
    sizes: ['XS (32")', 'S (34")', 'M (36")', 'L (38")'],
    colors: ['Champagne Rose', 'Emerald Green', 'Midnight Black'],
    isFeatured: false,
    specifications: {
      'Fit': 'Relaxed Draped Cowl Front with Adjustable Tie Back',
      'Fabric Sheen': 'Rich Liquid Luster Finish',
      'Occasion': 'Clubwear, Dinner Date, Cocktail Party'
    },
    shippingInfo: 'Express 3-4 Days delivery.',
    returnPolicy: '7-Day Return and Size Exchange.'
  }
];

export const CATEGORIES = [
  {
    id: 'jewellery-earrings',
    name: 'Oxidised Earrings',
    count: '48+ Designs',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    tag: 'Trending Tribal & Jhumkas'
  },
  {
    id: 'jewellery-necklaces',
    name: 'Necklace Sets',
    count: '35+ Designs',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
    tag: '18K Anti-Tarnish & Kundan'
  },
  {
    id: 'ethnic-wear',
    name: 'Ethnic Kurti Sets',
    count: '60+ Designs',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
    tag: 'Pure Mulmul & Chikankari'
  },
  {
    id: 'western-wear',
    name: 'Western Tops',
    count: '40+ Designs',
    image: 'https://images.unsplash.com/photo-1564257631407-4deb129f042b?q=80&w=800&auto=format&fit=crop',
    tag: 'Korean Floral & Satin'
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Pooja Sharma',
    city: 'Jaipur, Rajasthan',
    rating: 5,
    date: '2 days ago',
    comment: 'I was skeptical about the anti-tarnish claim, but I have worn the waterproof snake chain in the shower every day for 3 weeks and it looks just like real gold! No tarnishing at all. The COD delivery arrived in 4 days.',
    verified: true,
    productName: '18K Gold Plated Waterproof Herringbone Snake Chain',
    userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    author: 'Ananya Verma',
    city: 'Bengaluru, Karnataka',
    rating: 5,
    date: '4 days ago',
    comment: 'The Mulmul Anarkali set is so soft and light! The Gota patti work is neat, not scratchy at all. Size M fit me like a dream. Thank you RUAN for the fast delivery and WhatsApp order updates.',
    verified: true,
    productName: 'Gulabi Bagh Handblock Pure Mulmul Anarkali Kurti Set',
    userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    author: 'Simran Kaur',
    city: 'Chandigarh, Punjab',
    rating: 5,
    date: '1 week ago',
    comment: 'Received the Kundan Choker set for my cousin’s wedding and got so many compliments! The packaging was like a jewellery boutique. Cash on Delivery made me feel safe buying from a new brand.',
    verified: true,
    productName: 'Royal Emerald Green & Kundan Choker Necklace Set',
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-4',
    author: 'Rhea Sen',
    city: 'Kolkata, West Bengal',
    rating: 5,
    date: '2 weeks ago',
    comment: 'These oxidised jhumkas are surprisingly lightweight! Usually heavy statement earrings hurt my ears, but I wore these for 8 hours without any pain. Highly recommend RUAN!',
    verified: true,
    productName: 'Vintage Chandbali Boho Oxidised Silver Statement Jhumkas',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
  }
];

export const INITIAL_SAMPLE_ORDERS = [
  {
    id: 'ORD-8492',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1
      }
    ],
    subtotal: 899,
    discount: 0,
    shippingFee: 0,
    total: 899,
    paymentMethod: 'COD' as const,
    shippingAddress: {
      fullName: 'Sunita Rao',
      mobileNumber: '9845123987',
      pincode: '560034',
      city: 'Bengaluru',
      state: 'Karnataka',
      addressLine: 'Flat 402, Sunshine Residency, 12th Main, Koramangala 4th Block',
      landmark: 'Near Wipro Park'
    },
    status: 'Dispatched' as const,
    createdAt: '2026-09-18T10:15:00.000Z',
    courierName: 'Delhivery Surface',
    awbNumber: 'DLV8932401849',
    trackingUrl: 'https://www.delhivery.com/track/package/DLV8932401849',
    estimatedDeliveryDate: '22 Sep 2026'
  },
  {
    id: 'ORD-8491',
    items: [
      {
        product: PRODUCTS[1],
        quantity: 1,
        selectedSize: 'M (38")',
        selectedColor: 'Dusty Rose Pink'
      }
    ],
    subtotal: 1299,
    discount: 194, // DIRECT15
    shippingFee: 0,
    total: 1105,
    paymentMethod: 'COD' as const,
    shippingAddress: {
      fullName: 'Kavita Mathur',
      mobileNumber: '9829012456',
      pincode: '302017',
      city: 'Jaipur',
      state: 'Rajasthan',
      addressLine: 'Plot 54, Malviya Nagar Sector 3',
      landmark: 'Behind World Trade Park'
    },
    status: 'Confirmed' as const,
    createdAt: '2026-09-19T09:30:00.000Z',
    estimatedDeliveryDate: '24 Sep 2026'
  }
];
