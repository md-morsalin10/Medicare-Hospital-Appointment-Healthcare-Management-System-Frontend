'use client';

import React, { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { Star, ShieldCheck, Award, Users, Stethoscope } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const statsData = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Total Doctors',
  },
  {
    id: 2,
    value: 10,
    suffix: 'k+',
    label: 'Patients Served',
  },
  {
    id: 3,
    value: 50,
    suffix: 'k+',
    label: 'Appointments',
  },
  {
    id: 4,
    value: 4.9,
    suffix: '/5',
    label: 'Average Rating',
    isRating: true,
  },
];

const partnerHospitals = [
  'Apollo Healthcare',
  'Square Hospitals',
  'Evercare Hospital',
  'Labaid Cancer Hospital',
  'United Hospital',
  'Ibn Sina Medical',
  'Popular Diagnostic',
];

const PlatformStats = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter Animation using GSAP
      const numbers = gsap.utils.toArray('.stat-number');

      numbers.forEach((num) => {
        const targetValue = parseFloat(num.getAttribute('data-value'));
        const isDecimal = targetValue % 1 !== 0;

        gsap.fromTo(
          num,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
            snap: { innerText: isDecimal ? 0.1 : 1 },
            onUpdate: function () {
              num.innerText = isDecimal
                ? parseFloat(num.innerText).toFixed(1)
                : Math.floor(num.innerText);
            },
          }
        );
      });

      // Card Fade Up Animation
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#F8FAFC] border-y border-gray-200/80 py-12 lg:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200/80 items-center justify-center">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="stat-item flex flex-col items-center justify-center text-center px-4 py-4 md:py-0"
            >
              {/* Animated Number */}
              <div className="flex items-baseline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E7490] tracking-tight">
                <span className="stat-number" data-value={stat.value}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>

              {/* Rating Stars (Specific for rating item) */}
              {stat.isRating ? (
                <div className="flex items-center gap-1 my-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              ) : null}

              {/* Label */}
              <p className="text-sm sm:text-base font-medium text-gray-600 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* React Marquee - Trusted Hospital Network */}
        <div className="mt-12 pt-8 border-t border-gray-200/60">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Trusted by Top Healthcare Networks & Hospitals
          </p>

          <Marquee gradient={true} gradientColor="#F8FAFC" speed={40} pauseOnHover={true}>
            {partnerHospitals.map((hospital, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mx-8 text-gray-500 font-semibold text-sm hover:text-[#0E7490] transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#0E7490]" />
                <span>{hospital}</span>
              </div>
            ))}
          </Marquee>
        </div>

      </div>
    </section>
  );
};

export default PlatformStats;