'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import gsap from 'gsap';

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
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
    statIcon: '📈',
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
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    statIcon: '👨‍⚕️',
    statTitle: 'Verified Doctors',
    statValue: '500+',
  },
  {
    id: 3,
    badge: 'Fast & Secure Booking',
    title: 'Effortless Appointment',
    highlight: 'Scheduling',
    description:
      'Skip the long waiting lines. Choose your preferred doctor, time slot, and manage your healthcare journey in just a few clicks.',
    image:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
    statIcon: '🗓️',
    statTitle: 'Appointments Booked',
    statValue: '10K+',
  },
];

const Banner = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // GSAP Animation Trigger on Slide Change
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content Fade & Slide Up Animation
      gsap.fromTo(
        '.gsap-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.gsap-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.gsap-desc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.gsap-btn',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)' }
      );

      // Image Container Scale & Fade Animation
      gsap.fromTo(
        '.gsap-image-box',
        { opacity: 0, scale: 0.95, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // Stat Badge Float Animation
      gsap.fromTo(
        '.gsap-stat-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'elastic.out(1, 0.75)' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-[#EEF8FC] via-[#F4F9FD] to-[#EBF5FA] py-12 lg:py-20 overflow-hidden">
      {/* Background Soft Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0E7490]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

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
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Side: Content */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Badge */}
                  <div className="gsap-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#0E7490]/20 backdrop-blur-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#0E7490] animate-pulse" />
                    <span className="text-xs font-semibold text-[#0E7490] tracking-wide">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="gsap-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                    {slide.title}{' '}
                    <span className="text-[#0E7490] relative inline-block">
                      {slide.highlight}
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="gsap-desc text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="gsap-btn flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="/doctors"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0E7490] text-white font-medium hover:bg-[#085369] shadow-md shadow-[#0E7490]/20 hover:shadow-lg transition-all duration-200"
                    >
                      Find a Doctor
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>

                    <Link
                      href="/doctors"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[#0E7490] text-[#0E7490] font-medium bg-white/60 hover:bg-[#0E7490] hover:text-white transition-all duration-200 shadow-sm"
                    >
                      Book Appointment
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right Side: Image with Floating Stat Badge */}
                <div className="lg:col-span-6 relative flex justify-center">
                  <div className="gsap-image-box relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[380px] sm:h-[460px] object-cover object-center"
                    />

                    {/* Overlay floating badge on bottom left */}
                    <div className="gsap-stat-card absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-3.5 px-5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xl font-bold">
                        {slide.statIcon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          {slide.statTitle}
                        </p>
                        <p className="text-lg font-extrabold text-[#0F172A]">
                          {slide.statValue}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;