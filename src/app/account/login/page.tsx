'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Smartphone,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  User,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login, register, isAuthenticated } = useAuth();

  // Mode: 'mobile-otp' | 'password' | 'register'
  const [authMode, setAuthMode] = useState<'mobile-otp' | 'password' | 'register'>('mobile-otp');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mobile OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpStep, setOtpStep] = useState<'enter-phone' | 'enter-otp'>('enter-phone');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [otpSentNotification, setOtpSentNotification] = useState<string | null>(null);

  // Email/Password login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  // OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds]);

  // Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);

    // Simulate SMS Gateway dispatch (Fast2SMS / MSG91 / Firebase)
    setTimeout(() => {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(code);
      setOtpStep('enter-otp');
      setLoading(false);
      setTimerSeconds(45);
      setIsTimerActive(true);
      setOtpSentNotification(`SMS Sent to +91 ${clean}! Use demo OTP: ${code}`);
    }, 600);
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timerSeconds > 0) return;
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setTimerSeconds(45);
    setIsTimerActive(true);
    setOtpSentNotification(`New OTP Sent: ${code}`);
  };

  // OTP Input Change
  const handleOtpBoxChange = (val: string, index: number) => {
    if (val.length > 1) {
      val = val[val.length - 1];
    }
    const updated = [...enteredOtp];
    updated[index] = val;
    setEnteredOtp(updated);

    // Auto-focus next box
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Verify OTP & Login
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const codeEntered = enteredOtp.join('');

    if (codeEntered !== generatedOtp && codeEntered !== '1234') {
      setError('Incorrect OTP. Please enter the 4-digit code shown above or "1234".');
      return;
    }

    setLoading(true);

    // Look up or auto-register user by phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const dbStr = localStorage.getItem('aura_users_db');
    let db: any[] = dbStr ? JSON.parse(dbStr) : [];
    let existing = db.find((u) => u.phone === cleanPhone);

    if (!existing) {
      existing = {
        id: `usr-${Date.now()}`,
        name: `Customer (${cleanPhone.slice(-4)})`,
        email: `${cleanPhone}@customer.auratrends.in`,
        phone: cleanPhone,
        addresses: [],
        createdAt: new Date().toISOString()
      };
      db.push(existing);
      localStorage.setItem('aura_users_db', JSON.stringify(db));
    }

    localStorage.setItem('aura_active_user', JSON.stringify(existing));
    setLoading(false);
    window.location.href = '/account';
  };

  // Password login handler
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(loginEmail, loginPassword);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  // Registration handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = regPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await register(regName, regEmail, cleanPhone, regPassword);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBE5DC] shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#F3EAE2] text-[#A57C5D] flex items-center justify-center mx-auto">
            {authMode === 'mobile-otp' ? (
              <Smartphone className="w-6 h-6 text-[#C59B7B]" />
            ) : (
              <User className="w-6 h-6 text-[#C59B7B]" />
            )}
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C59B7B] font-bold">
            Verified Customer Login
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1E232A]">
            {authMode === 'register'
              ? 'Create New Account'
              : authMode === 'mobile-otp'
              ? 'Login with Mobile OTP'
              : 'Sign In with Password'}
          </h1>
          <p className="text-xs text-gray-500">
            {authMode === 'mobile-otp'
              ? 'Fast & secure mobile verification for instant Cash on Delivery orders.'
              : 'Access your order tracking, wishlists, and saved addresses.'}
          </p>
        </div>

        {/* Auth Mode Toggle Bar */}
        <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#EBE5DC] text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('mobile-otp');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authMode === 'mobile-otp'
                ? 'bg-[#1E232A] text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authMode === 'password'
                ? 'bg-[#1E232A] text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              authMode === 'register'
                ? 'bg-[#1E232A] text-white shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Register
          </button>
        </div>

        {/* Notification Toast */}
        {otpSentNotification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between animate-fadeIn">
            <span className="font-semibold">{otpSentNotification}</span>
            <button
              onClick={() => setOtpSentNotification(null)}
              className="text-emerald-700 hover:underline font-bold text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. MOBILE OTP LOGIN FLOW */}
        {authMode === 'mobile-otp' && (
          <div>
            {otpStep === 'enter-phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E232A] mb-1">
                    Enter Your 10-Digit Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-gray-500 font-bold">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      autoFocus
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-12 pr-3 py-2.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B] font-medium"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    We will send a 4-digit verification OTP via SMS.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>{loading ? 'Sending OTP...' : 'Send Verification OTP'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fadeIn">
                <div className="text-center space-y-1">
                  <span className="text-xs text-gray-600">
                    Enter 4-Digit OTP sent to <strong>+91 {phoneNumber}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtpStep('enter-phone')}
                    className="text-[11px] text-[#A57C5D] hover:underline font-semibold block mx-auto"
                  >
                    Change Number
                  </button>
                </div>

                {/* 4-Box OTP Input */}
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-box-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      autoFocus={idx === 0}
                      value={enteredOtp[idx]}
                      onChange={(e) => handleOtpBoxChange(e.target.value, idx)}
                      className="w-12 h-12 text-center text-lg font-bold bg-[#FAF7F2] border-2 border-gray-300 rounded-xl focus:border-[#C59B7B] focus:bg-white focus:outline-none transition-all"
                    />
                  ))}
                </div>

                {/* Resend Timer */}
                <div className="text-center text-xs text-gray-500">
                  {isTimerActive ? (
                    <span>Resend OTP in <strong>{timerSeconds}s</strong></span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#A57C5D] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Resend OTP SMS
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || enteredOtp.join('').length < 4}
                  className="w-full py-3.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{loading ? 'Verifying...' : 'Verify OTP & Continue'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. PASSWORD LOGIN */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1E232A] mb-1">
                Email Address or 10-Digit Mobile
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. priya@example.com or 9845123987"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E232A] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C59B7B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  setLoginEmail('priya@example.com');
                  setLoginPassword('password123');
                }}
                className="text-[11px] text-[#A57C5D] hover:underline font-semibold"
              >
                Auto-fill demo customer (Priya Sharma)
              </button>
            </div>
          </form>
        )}

        {/* 3. REGISTRATION FORM */}
        {authMode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#1E232A] mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Verma"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#C59B7B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E232A] mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. ananya@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#C59B7B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E232A] mb-1">10-Digit Mobile Number *</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-gray-500 font-bold">+91</span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="w-full pl-12 pr-3 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#C59B7B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E232A] mb-1">Password *</label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-[#C59B7B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1E232A] hover:bg-[#C59B7B] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer Trust Guarantee */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-around text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> OTP Verified
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B7B]" /> 100% Data Confidential
          </span>
        </div>

      </div>
    </div>
  );
}
