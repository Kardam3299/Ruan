import { db, isFirebaseConfigured } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import { Order } from '@/types/ecommerce';

const ORDERS_COLLECTION = 'orders';
const CUSTOMERS_COLLECTION = 'customers';

/**
 * Save an order to the central cloud database (Firebase Firestore)
 */
export async function saveOrderToCloud(order: Order): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    // Graceful fallback: when Firebase keys are not provided yet, returns true without throwing
    return false;
  }

  try {
    const orderRef = doc(db, ORDERS_COLLECTION, order.id);
    await setDoc(orderRef, {
      ...order,
      createdAt: order.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      syncedToCloud: true,
    });
    console.log(`[Cloud DB] Order ${order.id} saved to Firestore successfully.`);
    return true;
  } catch (error) {
    console.error('[Cloud DB] Failed to save order to Firestore:', error);
    return false;
  }
}

/**
 * Fetch all orders from central cloud database for the reseller admin portal
 */
export async function fetchOrdersFromCloud(): Promise<Order[] | null> {
  if (!isFirebaseConfigured || !db) {
    return null;
  }

  try {
    const ordersQuery = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(ordersQuery);
    const orders: Order[] = [];
    snapshot.forEach((docSnap) => {
      orders.push(docSnap.data() as Order);
    });
    return orders;
  } catch (error) {
    console.error('[Cloud DB] Failed to fetch orders from Firestore:', error);
    return null;
  }
}

/**
 * Update an order's status and tracking in the central cloud database
 */
export async function updateOrderInCloud(
  orderId: string,
  updates: Partial<Order>
): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error(`[Cloud DB] Failed to update order ${orderId}:`, error);
    return false;
  }
}

/**
 * Save or update customer record in the central cloud database
 */
export async function saveCustomerToCloud(customer: {
  id: string;
  name: string;
  phone: string;
  email?: string;
  addresses?: any[];
}): Promise<boolean> {
  if (!isFirebaseConfigured || !db) {
    return false;
  }

  try {
    const customerRef = doc(db, CUSTOMERS_COLLECTION, customer.id);
    await setDoc(
      customerRef,
      {
        ...customer,
        lastActive: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('[Cloud DB] Failed to save customer to Firestore:', error);
    return false;
  }
}
