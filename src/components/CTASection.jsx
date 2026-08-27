'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Stethoscope, UserPlus, ShieldCheck } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#0E7490]">
      {/* Layered background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E7490] via-[#0A5F78] to-[#064E63]" />

      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-[480px] h-[480px] bg-white/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm39 0h1v40h-1zM0 0v1h40V0zM0 39v1h40v-1z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Content */}
          <div className="text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm mb-5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
              <span className="text-xs font-semibold text-[#6EE7B7] tracking-wide uppercase">
                Trusted by 10,000+ Patients
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
            >
              Your Health Journey{' '}
              <span className="text-[#6EE7B7]">Starts Today</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-white/70 mt-4 leading-relaxed max-w-lg"
            >
              Join thousands of patients who are already managing their health smarter. 
              Register for free and connect with verified doctors in minutes.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-6 justify-center lg:justify-start"
            >
              {[
                { icon: ShieldCheck, label: 'HIPAA Compliant' },
                { icon: Stethoscope, label: '500+ Verified Doctors' },
                { icon: UserPlus, label: 'Free Registration' },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-white/80 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full border border-white/15"
                >
                  <badge.icon className="w-3.5 h-3.5 text-[#6EE7B7]" />
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row lg:flex-col gap-4 items-center flex-shrink-0"
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#0E7490] font-bold hover:bg-[#6EE7B7] hover:text-[#064E63] shadow-xl shadow-black/20 transition-all duration-300 text-sm w-full sm:w-auto justify-center"
            >
              <UserPlus className="w-5 h-5" />
              Create Free Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/doctors"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-white/40 text-white font-bold hover:bg-white/15 hover:border-white/60 transition-all duration-300 text-sm w-full sm:w-auto justify-center backdrop-blur-sm"
            >
              <Stethoscope className="w-5 h-5" />
              Browse Doctors
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
