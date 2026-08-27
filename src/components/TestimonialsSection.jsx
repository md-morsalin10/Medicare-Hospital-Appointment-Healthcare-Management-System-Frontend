'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rafiqul Islam',
    role: 'Patient — Dhaka',
    review:
      'MediCare Connect saved me hours of waiting. I booked a cardiologist appointment in 2 minutes and got an amazing consultation. The whole process was smooth and professional!',
    rating: 5,
    avatar: 'RI',
    color: '#0E7490',
    specialty: 'Cardiology Visit',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'Patient — Chittagong',
    review:
      'As a working mother, finding time for doctor visits was always a challenge. This platform made it incredibly easy to find pediatricians and book for my kids without any hassle.',
    rating: 5,
    avatar: 'NJ',
    color: '#10B981',
    specialty: 'Pediatrics Visit',
  },
  {
    id: 3,
    name: 'Arif Hossain',
    role: 'Patient — Sylhet',
    review:
      'The doctor profiles are very detailed — ratings, experience, fees — everything is transparent. I found a brilliant neurologist through this platform. Highly recommended!',
    rating: 5,
    avatar: 'AH',
    color: '#8B5CF6',
    specialty: 'Neurology Visit',
  },
  {
    id: 4,
    name: 'Sumaiya Akter',
    role: 'Patient — Rajshahi',
    review:
      'I was skeptical at first, but the secure payment and verified doctor list gave me confidence. My appointment was confirmed instantly and the doctor was wonderful!',
    rating: 5,
    avatar: 'SA',
    color: '#F59E0B',
    specialty: 'General Medicine',
  },
  {
    id: 5,
    name: 'Kamrul Hasan',
    role: 'Patient — Khulna',
    review:
      'Outstanding service! The platform is user-friendly and the doctors are extremely professional. My health records are now all in one place — this is the future of healthcare!',
    rating: 5,
    avatar: 'KH',
    color: '#EF4444',
    specialty: 'Orthopedics Visit',
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    }),
  };

  const t = testimonials[current];

  return (
    <section className="bg-[#F8FAFC] py-16 lg:py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#0E7490]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7490]/10 border border-[#0E7490]/20 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0E7490]" />
            <span className="text-xs font-semibold text-[#0E7490] tracking-wide uppercase">
              Patient Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            Loved by{' '}
            <span className="text-[#0E7490]">Thousands of Patients</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-gray-500 mt-4 leading-relaxed"
          >
            Real experiences from real patients who transformed their healthcare journey with MediCare Connect.
          </motion.p>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 p-8 sm:p-12 relative overflow-hidden"
            >
              {/* Decorative accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}80)` }}
              />

              {/* Big quote icon */}
              <Quote
                className="absolute top-8 right-8 w-16 h-16 opacity-5"
                style={{ color: t.color }}
              />

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}CC)`,
                      boxShadow: `0 8px 32px ${t.color}40`,
                    }}
                  >
                    {t.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span
                      className="text-xs font-semibold ml-2 px-2.5 py-0.5 rounded-full"
                      style={{ background: `${t.color}15`, color: t.color }}
                    >
                      {t.specialty}
                    </span>
                  </div>

                  {/* Review */}
                  <blockquote className="text-base sm:text-lg text-[#374151] leading-relaxed font-medium italic mb-5">
                    "{t.review}"
                  </blockquote>

                  {/* Name & Role */}
                  <div>
                    <p className="font-bold text-[#0F172A] text-base">{t.name}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full focus:outline-none"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background: i === current ? '#0E7490' : '#CBD5E1',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#0E7490] hover:text-[#0E7490] hover:bg-[#EEF8FC] transition-all duration-200 shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-xl bg-[#0E7490] flex items-center justify-center text-white hover:bg-[#085369] transition-all duration-200 shadow-md shadow-[#0E7490]/20"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
