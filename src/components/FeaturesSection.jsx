'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck2, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Easy Online Appointment',
    description: 'Book appointments with top specialists in just a few clicks. No more long queue waiting times.',
    icon: CalendarCheck2,
    badge: 'Fast Booking',
  },
  {
    id: 2,
    title: 'Verified Medical Doctors',
    description: 'Every doctor on our platform is thoroughly verified by administrators before providing consultation.',
    icon: UserCheck,
    badge: '100% Verified',
  },
  {
    id: 3,
    title: 'Secure Stripe Payments',
    description: 'Hassle-free and encrypted payment gateway integration for seamless consultation fee settlements.',
    icon: CreditCard,
    badge: 'Safe & Encrypted',
  },
  {
    id: 4,
    title: 'Digital Health Records',
    description: 'Access your consultation history, prescriptions, and medical reports anytime from your patient dashboard.',
    icon: FileText,
    badge: 'Cloud Stored',
  },
  {
    id: 5,
    title: 'Flexible Doctor Scheduling',
    description: 'Doctors can easily manage available time slots and accept or reschedule appointments dynamically.',
    icon: Clock,
    badge: 'Real-time Sync',
  },
  {
    id: 6,
    title: 'Role-Based Dashboard Security',
    description: 'Dedicated and secured interactive portals for Patients, Doctors, and System Administrators.',
    icon: ShieldCheck,
    badge: 'High Security',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-[#F8FAFC] border border-gray-200/80 rounded-2xl p-7 hover:border-[#0E7490]/40 hover:shadow-xl hover:shadow-[#0E7490]/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#0E7490] group-hover:bg-[#0E7490] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-600">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0E7490] transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Border Accent Line */}
                <div className="w-12 h-1 rounded-full bg-[#0E7490]/20 group-hover:w-full group-hover:bg-[#0E7490] transition-all duration-300 mt-6" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;