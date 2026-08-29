'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const contactInfo = [
    {
        title: 'Emergency Call',
        value: '+880 1700-000000',
        subtitle: 'Available 24/7 for urgent care',
        icon: (
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
    },
    {
        title: 'Email Support',
        value: 'support@medicare.com',
        subtitle: 'Get response within 2 hours',
        icon: (
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Clinic Location',
        value: 'Dhaka, Bangladesh',
        subtitle: 'Main Clinical Medical Hub',
        icon: (
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Insert form submission API call here
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Light Ambient Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl pointer-events-none -z-10" />

            {/* Header Section */}
            <section className="max-w-4xl mx-auto text-center pt-8 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Get In Touch
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4"
                >
                    We’re Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Help You</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
                >
                    Have questions about appointments, doctor schedules, or clinical services? Drop us a message and our support team will reach out promptly.
                </motion.p>
            </section>

            {/* Top Contact Info Cards */}
            <section className="max-w-6xl mx-auto mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactInfo.map((info, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                            whileHover={{ y: -4 }}
                            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-start justify-between"
                        >
                            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100/80 mb-4">
                                {info.icon}
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {info.title}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 mt-0.5 mb-1">
                                    {info.value}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {info.subtitle}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Form & Info Section */}
            <section className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="p-8 rounded-[2.5rem] bg-white border border-emerald-100 shadow-xl shadow-slate-200/60 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                                MediCare Support Hours
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Emergency services remain operational 24 hours a day, 7 days a week. For non-urgent general inquiries, our administration team is available during standard clinic working hours.
                            </p>

                            <div className="space-y-4 border-t border-slate-100 pt-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Monday – Friday</span>
                                    <span className="font-bold text-slate-800">8:00 AM – 8:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Saturday</span>
                                    <span className="font-bold text-slate-800">9:00 AM – 5:00 PM</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium">Sunday</span>
                                    <span className="font-bold text-emerald-600">Emergency Only</span>
                                </div>
                            </div>
                        </div>

                        {/* Medical Cross Decorative Card */}
                        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Instant Online Appointments</h4>
                                <p className="text-emerald-100 text-xs">Skip the queue by reserving your slot directly on our platform.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Interactive Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7"
                    >
                        <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">
                                Send Us a Message
                            </h2>
                            <p className="text-slate-500 text-sm mb-8">
                                Complete the form below and we’ll reply to your email address shortly.
                            </p>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2"
                                >
                                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-emerald-900">Message Sent Successfully!</h3>
                                    <p className="text-emerald-700 text-xs">Thank you for contacting MediCare. Our clinical desk will get back to you soon.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Your Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Appointment Inquiry, Medical Feedback..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Describe how we can assist you..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default ContactPage;