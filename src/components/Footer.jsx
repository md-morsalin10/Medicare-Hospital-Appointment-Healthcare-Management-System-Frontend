'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPaperPlane 
} from 'react-icons/fa';
import { HiShieldCheck } from 'react-icons/hi';
import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    /* Figma design matching background: Soft Light Blue Accent */
    <footer className="bg-[#EEF6FB] text-slate-600 relative overflow-hidden pt-12 pb-6 border-t border-sky-100">
      
      {/* Subtle Glows matching the light theme */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-sky-200/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-white text-[#0E7490] border border-sky-200 shadow-sm group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5 text-[#0E7490]" />
              </div>
              <span className="text-xl font-black text-slate-800 tracking-tight">
                MediCare<span className="text-[#0E7490]">Connect</span>
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm font-medium">
              Connect with top-rated medical professionals, schedule appointments, and manage your health journey—all in one secure platform.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: FaFacebookF, href: '#', label: 'Facebook' },
                { icon: FaTwitter, href: '#', label: 'Twitter' },
                { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-[#0E7490] text-slate-500 hover:text-white flex items-center justify-center transition-all duration-200 border border-sky-200/80 hover:border-[#0E7490] hover:-translate-y-0.5 shadow-sm"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                { name: 'Home', href: '/' },
                { name: 'Find Doctors', href: '/doctors' },
                { name: 'Appointments', href: '/appointments' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="text-slate-600 hover:text-[#0E7490] transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              {[
                'Online Consultation',
                'Specialist Care',
                'Emergency Help',
                'Medicine Care',
                'Health Records',
              ].map((service, idx) => (
                <li key={idx} className="text-slate-600 hover:text-[#0E7490] transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Get in Touch</h3>
            
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#0E7490] shrink-0 mt-0.5" />
                <span>Dinajpur, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaPhoneAlt className="w-3.5 h-3.5 text-[#0E7490] shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="w-3.5 h-3.5 text-[#0E7490] shrink-0" />
                <span>support@medicare.com</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <div className="pt-1">
              <p className="text-[11px] text-slate-500 mb-1.5 font-semibold">Subscribe to Newsletter</p>
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-white border border-sky-200 rounded-xl py-2 pl-3 pr-9 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0E7490] focus:ring-2 focus:ring-[#0E7490]/10 transition-all font-medium"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#0E7490] hover:bg-[#085369] text-white transition-colors"
                >
                  <FaPaperPlane className="w-2.5 h-2.5" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar Section (Matching Figma minimal footer) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} MediCare Precision Health. All rights reserved.</span>
          </div>

          {/* Privacy & Terms links */}
          <div className="flex items-center gap-5">
            <Link href="/sitemap" className="hover:text-slate-800 transition-colors">
              Sitemap
            </Link>
            <Link href="/privacy" className="hover:text-slate-800 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-800 transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-1 text-emerald-600 font-semibold">
              <HiShieldCheck className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;