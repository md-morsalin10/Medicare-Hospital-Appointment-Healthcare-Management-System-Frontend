'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CalendarCheck2, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Clock, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Easy Online Appointment',
    description: 'Book appointments with top specialists in just a few clicks. No more long queue waiting times.',
    icon: CalendarCheck2,
    badge: 'Fast Booking',
    gradient: 'from-[#0E7490] to-[#06B6D4]',
    glow: 'rgba(14,116,144,0.15)',
    iconColor: '#0E7490',
    iconBg: '#EEF8FC',
  },
  {
    id: 2,
    title: 'Verified Medical Doctors',
    description: 'Every doctor on our platform is thoroughly verified by administrators before providing consultation.',
    icon: UserCheck,
    badge: '100% Verified',
    gradient: 'from-[#10B981] to-[#34D399]',
    glow: 'rgba(16,185,129,0.15)',
    iconColor: '#10B981',
    iconBg: '#ECFDF5',
  },
  {
    id: 3,
    title: 'Secure Stripe Payments',
    description: 'Hassle-free and encrypted payment gateway integration for seamless consultation fee settlements.',
    icon: CreditCard,
    badge: 'Safe & Encrypted',
    gradient: 'from-[#6366F1] to-[#8B5CF6]',
    glow: 'rgba(99,102,241,0.15)',
    iconColor: '#6366F1',
    iconBg: '#EEF2FF',
  },
  {
    id: 4,
    title: 'Digital Health Records',
    description: 'Access your consultation history, prescriptions, and medical reports anytime from your patient dashboard.',
    icon: FileText,
    badge: 'Cloud Stored',
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
    glow: 'rgba(245,158,11,0.15)',
    iconColor: '#F59E0B',
    iconBg: '#FFFBEB',
  },
  {
    id: 5,
    title: 'Flexible Doctor Scheduling',
    description: 'Doctors can easily manage available time slots and accept or reschedule appointments dynamically.',
    icon: Clock,
    badge: 'Real-time Sync',
    gradient: 'from-[#EC4899] to-[#F472B6]',
    glow: 'rgba(236,72,153,0.15)',
    iconColor: '#EC4899',
    iconBg: '#FDF2F8',
  },
  {
    id: 6,
    title: 'Role-Based Dashboard Security',
    description: 'Dedicated and secured interactive portals for Patients, Doctors, and System Administrators.',
    icon: ShieldCheck,
    badge: 'High Security',
    gradient: 'from-[#0F172A] to-[#1E293B]',
    glow: 'rgba(15,23,42,0.1)',
    iconColor: '#0F172A',
    iconBg: '#F1F5F9',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Background Subtle Pattern/Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#0E7490]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E7490]/10 border border-[#0E7490]/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#0E7490]" />
            <span className="text-xs font-semibold text-[#0E7490] tracking-wide uppercase">
              Why Choose MediCare Connect
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            A Smarter Way to Manage Your <span className="text-[#0E7490]">Healthcare</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed"
          >
            MediCare Connect bridges the gap between patients, doctors, and healthcare administrators through a unified, fast, and secure digital platform.
          </motion.p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <motion.div
                key={feature.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="relative bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-7 hover:border-transparent hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                style={{
                  '--glow': feature.glow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 60px ${feature.glow}`;
                  e.currentTarget.style.borderColor = feature.iconColor + '30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                {/* Gradient top accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm"
                      style={{
                        background: feature.iconBg,
                        border: `1.5px solid ${feature.iconColor}20`,
                      }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: feature.iconColor }} />
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        background: feature.iconBg,
                        color: feature.iconColor,
                        border: `1px solid ${feature.iconColor}20`,
                      }}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="text-xl font-bold text-[#0F172A] mb-3 transition-colors duration-200"
                    style={{}}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom: Learn More */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 group-hover:border-transparent transition-colors duration-300">
                  <Link
                    href="/doctors"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                    style={{ color: feature.iconColor }}
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                  {/* Bottom glow line */}
                  <div
                    className="h-0.5 rounded-full w-8 group-hover:w-16 transition-all duration-300"
                    style={{ background: `linear-gradient(90deg, ${feature.iconColor}, transparent)` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;