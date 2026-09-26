'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShippingAddress } from '@/types/ecommerce';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: ShippingAddress[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
  saveAddress: (address: ShippingAddress) => void;
  deleteAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample pre-registered customer demo
const SEED_USERS = [
  {
    id: 'usr-1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '9845123987',
    password: 'password123',
    addresses: [
      {
        fullName: 'Priya Sharma',
        mobileNumber: '9845123987',
        pincode: '560034',
        city: 'Bengaluru',
        state: 'Karnataka',
        addressLine: 'Flat 402, Sunshine Residency, 12th Main, Koramangala 4th Block',
        landmark: 'Near Wipro Park'
      }
    ],
    createdAt: '2026-08-15T10:00:00.000Z'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load active user and user database from localStorage
  useEffect(() => {
    try {
      // Ensure seed users exist in local database
      const existingDb = localStorage.getItem('aura_users_db');
      if (!existingDb) {
        localStorage.setItem('aura_users_db', JSON.stringify(SEED_USERS));
      }

      // Check for logged-in user
      const savedUser = localStorage.getItem('aura_active_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Error loading auth state', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrPhone: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const dbStr = localStorage.getItem('aura_users_db') || JSON.stringify(SEED_USERS);
      const db: Array<User & { password: string }> = JSON.parse(dbStr);

      const cleanInput = emailOrPhone.trim().toLowerCase();
      const matched = db.find(
        (u) =>
          (u.email.toLowerCase() === cleanInput || u.phone === cleanInput) &&
          u.password === password
      );

      if (!matched) {
        return { success: false, error: 'Invalid email/phone or password. (Demo: priya@example.com / password123)' };
      }

      const { password: _, ...userData } = matched;
      setUser(userData);
      localStorage.setItem('aura_active_user', JSON.stringify(userData));
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Login failed due to an internal error.' };
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const dbStr = localStorage.getItem('aura_users_db') || JSON.stringify(SEED_USERS);
      const db: Array<User & { password: string }> = JSON.parse(dbStr);

      const cleanEmail = email.trim().toLowerCase();
      const cleanPhone = phone.replace(/\D/g, '');

      if (db.some((u) => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email already exists. Please Sign In.' };
      }

      if (db.some((u) => u.phone === cleanPhone)) {
        return { success: false, error: 'An account with this mobile number already exists. Please Sign In.' };
      }

      const newUser: User & { password: string } = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        password,
        addresses: [],
        createdAt: new Date().toISOString()
      };

      db.push(newUser);
      localStorage.setItem('aura_users_db', JSON.stringify(db));

      const { password: _, ...userData } = newUser;
      setUser(userData);
      localStorage.setItem('aura_active_user', JSON.stringify(userData));

      return { success: true };
    } catch (e) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aura_active_user');
  };

  const updateProfile = (name: string, phone: string) => {
    if (!user) return;
    const updated = { ...user, name: name.trim(), phone: phone.replace(/\D/g, '') };
    setUser(updated);
    localStorage.setItem('aura_active_user', JSON.stringify(updated));

    // Update in DB
    try {
      const dbStr = localStorage.getItem('aura_users_db');
      if (dbStr) {
        const db: Array<User & { password: string }> = JSON.parse(dbStr);
        const idx = db.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          db[idx] = { ...db[idx], name: updated.name, phone: updated.phone };
          localStorage.setItem('aura_users_db', JSON.stringify(db));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveAddress = (address: ShippingAddress) => {
    if (!user) return;
    const updatedAddresses = [address, ...user.addresses];
    const updated = { ...user, addresses: updatedAddresses };
    setUser(updated);
    localStorage.setItem('aura_active_user', JSON.stringify(updated));

    try {
      const dbStr = localStorage.getItem('aura_users_db');
      if (dbStr) {
        const db: Array<User & { password: string }> = JSON.parse(dbStr);
        const idx = db.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          db[idx].addresses = updatedAddresses;
          localStorage.setItem('aura_users_db', JSON.stringify(db));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAddress = (index: number) => {
    if (!user) return;
    const updatedAddresses = user.addresses.filter((_, i) => i !== index);
    const updated = { ...user, addresses: updatedAddresses };
    setUser(updated);
    localStorage.setItem('aura_active_user', JSON.stringify(updated));

    try {
      const dbStr = localStorage.getItem('aura_users_db');
      if (dbStr) {
        const db: Array<User & { password: string }> = JSON.parse(dbStr);
        const idx = db.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          db[idx].addresses = updatedAddresses;
          localStorage.setItem('aura_users_db', JSON.stringify(db));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const setDefaultAddress = (index: number) => {
    if (!user || !user.addresses[index]) return;
    const selected = user.addresses[index];
    const remaining = user.addresses.filter((_, i) => i !== index);
    const updatedAddresses = [selected, ...remaining];
    const updated = { ...user, addresses: updatedAddresses };
    setUser(updated);
    localStorage.setItem('aura_active_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        saveAddress,
        deleteAddress,
        setDefaultAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
