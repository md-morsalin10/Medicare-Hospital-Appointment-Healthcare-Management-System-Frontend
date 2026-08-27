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
    color: '#0E7490',
    bgColor: '#EEF8FC',
    borderColor: 'rgba(14,116,144,0.2)',
    badge: 'Step 01',
  },
  {
    id: 2,
    icon: Search,
    title: 'Find the Right Doctor',
    description:
      'Browse by specialty, location, or availability. Read real patient reviews and compare doctors to find your perfect match.',
    color: '#6366F1',
    bgColor: '#F0F0FF',
    borderColor: 'rgba(99,102,241,0.2)',
    badge: 'Step 02',
  },
  {
    id: 3,
    icon: CalendarCheck,
    title: 'Book & Consult',
    description:
      'Pick a time slot that works for you, pay securely online, and attend your consultation. It\'s that simple!',
    color: '#10B981',
    bgColor: '#ECFDF5',
    borderColor: 'rgba(16,185,129,0.2)',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HowItWorksSection = () => {
  return (
    <section className="relative bg-[#0F172A] py-20 lg:py-28 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zNHY2aC02VjBoNnpNNiAzNHY2SDB2LTZoNnptMC0zNHY2SDBWMGg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0E7490]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#6366F1]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0E7490]" />
            <span className="text-xs font-semibold text-[#7DD3FC] tracking-wide uppercase">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Get Started in{' '}
            <span className="text-[#0E7490]">3 Easy Steps</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-400 mt-4 leading-relaxed"
          >
            From registration to consultation — the entire process takes under 5 minutes.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-[#0E7490]/30 via-[#6366F1]/30 to-[#10B981]/30 z-0" />

          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-white/20 hover:bg-white/8 transition-all duration-300 group flex flex-col items-center text-center z-10"
              >
                {/* Step badge */}
                <span
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full border"
                  style={{
                    color: step.color,
                    borderColor: step.borderColor,
                    background: step.bgColor,
                  }}
                >
                  {step.badge}
                </span>

                {/* Icon */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mt-2 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `${step.color}20`,
                    border: `1.5px solid ${step.borderColor}`,
                    boxShadow: `0 8px 32px ${step.color}20`,
                  }}
                >
                  <IconComponent
                    className="w-9 h-9"
                    style={{ color: step.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom glow line */}
                <div
                  className="w-12 h-0.5 rounded-full mt-6 group-hover:w-full transition-all duration-500"
                  style={{ background: step.color }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0E7490] text-white font-semibold hover:bg-[#085369] shadow-lg shadow-[#0E7490]/30 hover:shadow-[#0E7490]/50 transition-all duration-200 text-sm"
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
