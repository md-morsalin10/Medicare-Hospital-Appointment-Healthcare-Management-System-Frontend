'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  TrendingUp, 
  UserCheck, 
  CalendarCheck, 
  Sparkles,
  Search,
  Heart,
  Stethoscope,
  MapPin
} from 'lucide-react';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slidesData = [
  {
    id: 1,
    badge: 'Trusted Healthcare Network',
    title: 'Modern Healthcare at Your',
    highlight: 'Fingertips',
    description:
      'Connect with top-rated medical professionals, schedule appointments, and manage your health journey—all in one secure, easy-to-use platform.',
    image: 'https://images.unsplash.com/photo-1758691463582-11aea602cd4a',
    icon: TrendingUp,
    statTitle: 'Patient Satisfaction',
    statValue: '98.5%',
  },
  {
    id: 2,
    badge: '24/7 Expert Doctors',
    title: 'Your Health Is Our',
    highlight: 'Top Priority',
    description:
      'Book online consultations anytime, anywhere. Experience seamless medical care with top specialist doctors near you.',
    image: 'https://images.unsplash.com/photo-1685997179880-6449203a053e',
    icon: UserCheck,
    statTitle: 'Verified Specialists',
    statValue: '500+',
  },
  {
    id: 3,
    badge: 'Fast & Secure Booking',
    title: 'Effortless Appointment',
    highlight: 'Scheduling',
    description:
      'Skip the long waiting lines. Choose your preferred doctor, time slot, and manage your healthcare journey in just a few clicks.',
    image: 'https://images.unsplash.com/photo-1659353885034-4772017e1dfc',
    icon: CalendarCheck,
    statTitle: 'Appointments Booked',
    statValue: '10K+',
  },
  {
    id: 4,
    badge: 'Expert Medical Care',
    title: 'Personalized Care for',
    highlight: 'Your Family',
    description:
      'Receive world-class diagnostic and treatment guidance from highly trained specialists with years of experience.',
    image: 'https://images.unsplash.com/photo-1670191247079-f9713ae06dcf',
    icon: Sparkles,
    statTitle: 'Positive Reviews',
    statValue: '15K+',
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative bg-gradient-to-br from-[#EEF8FC] via-[#F4F9FD] to-[#EBF5FA] py-12 lg:py-20 overflow-hidden">
      {/* Background Soft Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0E7490]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating decorative medical icons */}
      <div className="absolute top-12 right-[10%] opacity-10 animate-pulse pointer-events-none hidden lg:block">
        <Heart className="w-10 h-10 text-[#0E7490]" />
      </div>
      <div className="absolute bottom-20 left-[6%] opacity-8 pointer-events-none hidden lg:block" style={{animation: 'pulse 3s ease-in-out 1s infinite'}}>
        <Stethoscope className="w-12 h-12 text-[#10B981]" />
      </div>
      <div className="absolute top-1/2 right-[4%] opacity-5 pointer-events-none hidden xl:block">
        <div className="w-24 h-24 rounded-full border-4 border-[#0E7490]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="banner-swiper !pb-12"
        >
          {slidesData.map((slide, index) => {
            const IconComponent = slide.icon;
            const isActive = activeIndex === index;

            return (
              <SwiperSlide key={slide.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Side: Content */}
                  <div className="lg:col-span-6 space-y-6">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`slide-content-${slide.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                        >
                          {/* Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#0E7490]/20 backdrop-blur-sm shadow-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#0E7490] animate-pulse" />
                            <span className="text-xs font-semibold text-[#0E7490] tracking-wide">
                              {slide.badge}
                            </span>
                          </motion.div>

                          {/* Heading */}
                          <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]"
                          >
                            {slide.title}{' '}
                            <span className="text-[#0E7490] relative inline-block">
                              {slide.highlight}
                            </span>
                          </motion.h1>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed"
                          >
                            {slide.description}
                          </motion.p>

                          {/* CTA Buttons */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-4 pt-2"
                          >
                            <Link
                              href="/doctors"
                              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0E7490] text-white font-medium hover:bg-[#085369] shadow-md shadow-[#0E7490]/20 hover:shadow-lg transition-all duration-200"
                            >
                              Find a Doctor
                              <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                              href="/doctors"
                              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#0E7490] text-[#0E7490] font-medium bg-white/60 hover:bg-[#0E7490] hover:text-white transition-all duration-200 shadow-sm"
                            >
                              Book Appointment
                              <Calendar className="w-4 h-4" />
                            </Link>
                          </motion.div>

                          {/* Quick Search Bar */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="w-full max-w-xl"
                          >
                            <form
                              onSubmit={(e) => e.preventDefault()}
                              className="flex items-center bg-white/90 backdrop-blur-md rounded-2xl border border-[#0E7490]/20 shadow-lg shadow-[#0E7490]/10 overflow-hidden p-1.5 gap-2"
                            >
                              <div className="flex items-center gap-2 flex-1 px-3">
                                <Search className="w-4 h-4 text-[#0E7490] flex-shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Search by specialty, doctor name..."
                                  className="flex-1 text-sm text-[#0F172A] placeholder-gray-400 bg-transparent focus:outline-none py-1.5 font-medium"
                                />
                              </div>
                              <div className="hidden sm:flex items-center gap-1.5 px-3 border-l border-gray-200">
                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <input
                                  type="text"
                                  placeholder="Location"
                                  className="w-24 text-sm text-[#0F172A] placeholder-gray-400 bg-transparent focus:outline-none py-1.5 font-medium"
                                />
                              </div>
                              <button
                                type="submit"
                                className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-[#0E7490] text-white text-sm font-semibold hover:bg-[#085369] transition-colors duration-200 flex items-center gap-1.5 shadow-md shadow-[#0E7490]/20"
                              >
                                <Search className="w-3.5 h-3.5" />
                                Search
                              </button>
                            </form>
                            <p className="text-xs text-gray-400 mt-2 ml-1 font-medium">
                              🔥 Popular: <span className="text-[#0E7490] cursor-pointer hover:underline">Cardiology</span> · <span className="text-[#0E7490] cursor-pointer hover:underline">Neurology</span> · <span className="text-[#0E7490] cursor-pointer hover:underline">Pediatrics</span>
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Side: Image with Floating Stat Badge */}
                  <div className="lg:col-span-6 relative flex justify-center">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`slide-image-${slide.id}`}
                          initial={{ opacity: 0, x: 40, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -40, scale: 0.95 }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white"
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                          />

                          {/* Overlay floating badge on bottom left */}
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-3.5 px-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center font-bold">
                              <IconComponent className="w-5 h-5 text-[#10B981]" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-medium">
                                {slide.statTitle}
                              </p>
                              <p className="text-lg font-extrabold text-[#0F172A]">
                                {slide.statValue}
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;