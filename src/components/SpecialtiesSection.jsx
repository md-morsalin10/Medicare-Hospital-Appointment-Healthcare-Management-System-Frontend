'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Microscope,
  Activity,
  Stethoscope,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const specialties = [
  {
    id: 1,
    name: 'Cardiology',
    namebn: 'হৃদরোগ',
    icon: Heart,
    doctorCount: 45,
    color: '#EF4444',
    bgColor: '#FEF2F2',
    border: 'rgba(239,68,68,0.15)',
    query: 'Cardiology',
  },
  {
    id: 2,
    name: 'Neurology',
    namebn: 'স্নায়ুরোগ',
    icon: Brain,
    doctorCount: 32,
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    border: 'rgba(139,92,246,0.15)',
    query: 'Neurology',
  },
  {
    id: 3,
    name: 'Orthopedics',
    namebn: 'অর্থোপেডিক',
    icon: Bone,
    doctorCount: 28,
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    border: 'rgba(245,158,11,0.15)',
    query: 'Orthopedics',
  },
  {
    id: 4,
    name: 'Pediatrics',
    namebn: 'শিশুরোগ',
    icon: Baby,
    doctorCount: 56,
    color: '#10B981',
    bgColor: '#ECFDF5',
    border: 'rgba(16,185,129,0.15)',
    query: 'Pediatrics',
  },
  {
    id: 5,
    name: 'Ophthalmology',
    namebn: 'চক্ষুরোগ',
    icon: Eye,
    doctorCount: 21,
    color: '#06B6D4',
    bgColor: '#ECFEFF',
    border: 'rgba(6,182,212,0.15)',
    query: 'Ophthalmology',
  },
  {
    id: 6,
    name: 'Pathology',
    namebn: 'প্যাথলজি',
    icon: Microscope,
    doctorCount: 18,
    color: '#EC4899',
    bgColor: '#FDF2F8',
    border: 'rgba(236,72,153,0.15)',
    query: 'Pathology',
  },
  {
    id: 7,
    name: 'General Medicine',
    namebn: 'সাধারণ চিকিৎসা',
    icon: Stethoscope,
    doctorCount: 89,
    color: '#0E7490',
    bgColor: '#EEF8FC',
    border: 'rgba(14,116,144,0.15)',
    query: 'General',
  },
  {
    id: 8,
    name: 'Endocrinology',
    namebn: 'হরমোনরোগ',
    icon: Activity,
    doctorCount: 14,
    color: '#6366F1',
    bgColor: '#EEF2FF',
    border: 'rgba(99,102,241,0.15)',
    query: 'Endocrinology',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' },
  }),
};

const SpecialtiesSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#0E7490]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#6366F1]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Browse by Specialty
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
          >
            Find Specialists by{' '}
            <span className="text-[#0E7490]">Medical Field</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-gray-500 mt-4 leading-relaxed"
          >
            Choose from a wide range of medical specialties and connect with
            expert doctors who specialize in your area of concern.
          </motion.p>
        </div>

        {/* Specialty Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {specialties.map((specialty, index) => {
            const IconComponent = specialty.icon;
            return (
              <motion.div
                key={specialty.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <Link
                  href={`/doctors?specialty=${specialty.query}`}
                  className="group flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer block"
                  style={{
                    background: specialty.bgColor,
                    borderColor: specialty.border,
                    boxShadow: `0 2px 16px ${specialty.border}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 16px 48px ${specialty.border}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 2px 16px ${specialty.border}`;
                  }}
                >
                  {/* Icon Container */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm"
                    style={{
                      background: `${specialty.color}18`,
                      border: `1.5px solid ${specialty.border}`,
                    }}
                  >
                    <IconComponent
                      className="w-7 h-7 transition-transform duration-300"
                      style={{ color: specialty.color }}
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="text-sm font-bold mb-1 transition-colors duration-200"
                    style={{ color: '#0F172A' }}
                  >
                    {specialty.name}
                  </h3>

                  {/* Doctor Count */}
                  <p
                    className="text-xs font-semibold"
                    style={{ color: specialty.color }}
                  >
                    {specialty.doctorCount} Doctors
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#0E7490] text-[#0E7490] font-semibold bg-white hover:bg-[#0E7490] hover:text-white transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#0E7490]/20 text-sm"
          >
            View All Specialties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
