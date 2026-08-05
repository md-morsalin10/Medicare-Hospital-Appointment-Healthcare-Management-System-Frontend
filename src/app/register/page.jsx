'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

import {
  User,
  Mail,
  Lock,
  UploadCloud,
  Eye,
  EyeOff,
  Stethoscope,
  UserCheck,
  ArrowRight,
  Phone,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'male',
    photoUrl: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Password validation check (Assignment standard: 6+ chars, 1 number, 1 special char)
  const validatePassword = (pass) => {
    const hasMinLength = pass.length >= 6;
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    if (!hasMinLength) {
      return 'Password must be at least 6 characters long.';
    }
    if (!hasNumber) {
      return 'Password must include at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must include at least one special character (!@#$%^&* etc.).';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      const err = validatePassword(value);
      setPasswordError(err);
    }
  };

  // ImgBB-তে ইমেজ ফাইল আপলোড হ্যান্ডলার
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ফাইল ফরম্যাট চেক
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file!');
      return;
    }

    setUploadingImage(true);
    const imageFormData = new FormData();
    imageFormData.append('image', file);

    try {
      // ⚠️ Note: NEXT_PUBLIC_IMGBB_API_KEY আপনার .env.local ফাইলে সেট করে নিবেন
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY';
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: imageFormData,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, photoUrl: data.data.url }));
        toast.success('Profile picture uploaded successfully!');
      } else {
        toast.error('Image upload failed! Please try again.');
      }
    } catch (error) {
      toast.error('Error uploading image to ImgBB!');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photoUrl) {
      toast.error('Please upload a profile picture before submitting.');
      return;
    }

    const passError = validatePassword(formData.password);
    if (passError) {
      setPasswordError(passError);
      toast.error(passError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoUrl,
        phoneNumber: formData.phone,
        gender: formData.gender,
        role: formData.role,
      }, {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          toast.success('Account created successfully! Welcome to MediCare Connect.');
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Registration failed!');
          setLoading(false);
        }
      });

      if (error) {
        toast.error(error.message || 'Registration failed!');
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message || 'Registration failed! Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF8FC] via-[#F4F9FD] to-[#EBF5FA] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0E7490]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative z-10 my-6"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-extrabold text-[#0E7490] tracking-tight">
            MediCare
          </Link>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-2">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Join MediCare Connect to manage your healthcare journey.
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#F8FAFC] rounded-2xl border border-gray-200/80 mb-6">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, role: 'patient' }))}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              formData.role === 'patient'
                ? 'bg-[#0E7490] text-white shadow-md'
                : 'text-gray-600 hover:text-[#0E7490]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Patient
          </button>

          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, role: 'doctor' }))}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              formData.role === 'doctor'
                ? 'bg-[#0E7490] text-white shadow-md'
                : 'text-gray-600 hover:text-[#0E7490]'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            Doctor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20 transition-all"
              />
            </div>
          </div>

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

          {/* Phone Number & Gender (Grid Container) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1700-000000"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20 transition-all"
                />
              </div>
            </div>

            {/* Gender Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20 transition-all cursor-pointer"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Direct File Upload (ImgBB) */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Upload Profile Picture
            </label>
            <div className="relative">
              <label
                htmlFor="photo-upload"
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed transition-all cursor-pointer ${
                  formData.photoUrl
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700'
                    : 'border-gray-300 bg-[#F8FAFC] hover:border-[#0E7490] text-gray-600'
                }`}
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#0E7490]" />
                    <span className="text-sm font-medium text-gray-600">Uploading to ImgBB...</span>
                  </>
                ) : formData.photoUrl ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">Profile Image Uploaded!</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">Choose an image file from device</span>
                  </>
                )}
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-11 pr-11 py-3 rounded-xl bg-[#F8FAFC] border text-gray-800 text-sm focus:outline-none transition-all ${
                  passwordError
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {passwordError && (
              <div className="flex items-start gap-1.5 text-xs text-red-500 mt-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-gray-800 text-sm focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0E7490] text-white font-semibold shadow-md shadow-[#0E7490]/20 hover:bg-[#085369] transition-all duration-200 flex items-center justify-center gap-2 mt-6 disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#0E7490] hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;