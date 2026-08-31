'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Demo Login Helper Function
  const handleDemoFill = (email, password) => {
    setFormData({ email, password });
    toast.success('Demo credentials filled!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error?.message || 'Invalid credentials! Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Welcome back to MediCare Connect!');
      setLoading(false);

    } catch (error) {
      toast.error(error?.message || 'Invalid credentials! Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google Sign-In failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF8FC] via-[#F4F9FD] to-[#EBF5FA] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0E7490]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block text-3xl font-extrabold text-[#0E7490] tracking-tight">
            MediCare
          </Link>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-2">Welcome Back!</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your appointments and dashboard.
          </p>
        </div>

        {/* Demo Credentials Section */}
        <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
          <p className="text-xs font-semibold text-gray-500 text-center uppercase tracking-wider mb-2">
            Try Demo Credentials
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('olivera@gmail.com', 'Password@123')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-[#0E7490]/10 text-[#0E7490] hover:bg-[#0E7490] hover:text-white transition-all duration-200 border border-[#0E7490]/20"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Doctor Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('mille@gmail.com', 'Password@123')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981] hover:text-white transition-all duration-200 border border-[#10B981]/20"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Patient Demo
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@medicare.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#0E7490] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0E7490] text-white font-semibold shadow-md shadow-[#0E7490]/20 hover:bg-[#085369] transition-all duration-200 flex items-center justify-center gap-2 mt-6 disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Or Continue With
          </span>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-medium text-gray-700 text-sm shadow-sm flex items-center justify-center gap-3 transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Register Redirect Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-[#0E7490] hover:underline">
            Register Now
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default LoginPage;