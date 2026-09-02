'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  UserPlus,
  Search,
  CalendarCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: UserPlus,
    title: 'Create Your Account',
    description:
      'Sign up in seconds with your email. Create a secure patient profile and get instant access to hundreds of verified doctors.',
    color: '#0284C7', // Sky Blue / Cyan Accent
    bgColor: '#F0F9FF',
    borderColor: '#BAE6FD',
    badge: 'Step 01',
  },
  {
    id: 2,
    icon: Search,
    title: 'Find the Right Doctor',
    description:
      'Browse by specialty, location, or availability. Read real patient reviews and compare doctors to find your perfect match.',
    color: '#4F46E5', // Indigo Accent
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    badge: 'Step 02',
  },
  {
    id: 3,
    icon: CalendarCheck,
    title: 'Book & Consult',
    description:
      "Pick a time slot that works for you, pay securely online, and attend your consultation. It's that simple!",
    color: '#059669', // Emerald Accent
    bgColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    badge: 'Step 03',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const HowItWorksSection = () => {
  return (
    <section className="relative bg-slate-50/50 py-20 lg:py-28 overflow-hidden">
      {/* Light Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-sky-100/60 via-indigo-50/40 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-200/30 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 shadow-sm mb-4"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-sky-700 tracking-wide uppercase">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Get Started in{' '}
            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              3 Easy Steps
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal"
          >
            From registration to consultation — the entire process takes under 5 minutes.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-20 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-[2px] bg-gradient-to-r from-sky-200 via-indigo-200 to-emerald-200 z-0" />

          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group flex flex-col items-center text-center z-10"
              >
                {/* Step Badge */}
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3.5 py-1 rounded-full border shadow-xs"
                  style={{
                    color: step.color,
                    borderColor: step.borderColor,
                    backgroundColor: step.bgColor,
                  }}
                >
                  {step.badge}
                </span>

                {/* Icon Container */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mt-2 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: step.bgColor,
                    border: `1px solid ${step.borderColor}`,
                  }}
                >
                  <IconComponent
                    className="w-9 h-9"
                    style={{ color: step.color }}
                  />
                </div>

                {/* Card Content */}
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom Highlight Line */}
                <div
                  className="w-10 h-1 rounded-full mt-6 opacity-40 group-hover:opacity-100 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: step.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold hover:from-sky-700 hover:to-indigo-700 shadow-md hover:shadow-lg shadow-sky-500/20 transition-all duration-200 text-sm"
          >
            Start Your Journey Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;