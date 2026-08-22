"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, LayoutGrid, List, ChevronLeft, ChevronRight, UserCheck, Heart, Star, Filter, SlidersHorizontal, Briefcase, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FindDoctorsClient({ doctors = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [layoutMode, setLayoutMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const specialties = useMemo(() => {
        const set = new Set(doctors.map(d => d.specialization).filter(Boolean));
        return ['All', ...Array.from(set)];
    }, [doctors]);

    const filteredAndSortedDoctors = useMemo(() => {
        let result = doctors.filter((doc) => {
            const matchesName = doc.doctorName?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpecialty = doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSelectedSpecialty = selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;

            return (matchesName || matchesSpecialty) && matchesSelectedSpecialty;
        });

        if (sortBy === 'fee-low') {
            result.sort((a, b) => Number(a.consultationFee || 0) - Number(b.consultationFee || 0));
        } else if (sortBy === 'fee-high') {
            result.sort((a, b) => Number(b.consultationFee || 0) - Number(a.consultationFee || 0));
        } else if (sortBy === 'experience') {
            result.sort((a, b) => Number(b.experience || 0) - Number(a.experience || 0));
        }

        return result;
    }, [doctors, searchTerm, selectedSpecialty, sortBy]);

    const totalPages = Math.ceil(filteredAndSortedDoctors.length / itemsPerPage) || 1;
    const paginatedDoctors = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedDoctors.slice(start, start + itemsPerPage);
    }, [filteredAndSortedDoctors, currentPage]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="space-y-8">
            {/* Search & Filter Bar - Redesigned like Figma */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 flex flex-col lg:flex-row items-center gap-4"
            >
                {/* Search Input */}
                <div className="relative flex-1 w-full lg:w-auto flex items-center">
                    <Search size={18} className="absolute left-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by doctor name, condition, or procedure..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-12 pr-4 py-3 text-sm font-medium bg-transparent focus:outline-none text-slate-700 placeholder-slate-400"
                    />
                </div>
                
                {/* Separator - Desktop Only */}
                <div className="hidden lg:block w-[1px] h-8 bg-slate-200 mx-2"></div>

                <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto px-2 lg:px-0 pb-2 lg:pb-0">
                    {/* Specialty Select */}
                    <select
                        value={selectedSpecialty}
                        onChange={(e) => { setSelectedSpecialty(e.target.value); setCurrentPage(1); }}
                        className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7490] focus:ring-1 focus:ring-[#0E7490] text-slate-700 cursor-pointer"
                    >
                        {specialties.map((spec) => (
                            <option key={spec} value={spec}>
                                {spec === 'All' ? 'All Specialties' : spec}
                            </option>
                        ))}
                    </select>

                    {/* Example Dropdowns (Rating, Price) for UI consistency with image */}
                    <select className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7490] text-slate-700 cursor-pointer hidden md:block">
                        <option>Any Rating</option>
                        <option>4.0 & up</option>
                        <option>4.5 & up</option>
                    </select>

                    <select className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0E7490] text-slate-700 cursor-pointer hidden sm:block">
                        <option>Price: Any</option>
                        <option>Under $50</option>
                        <option>$50 - $100</option>
                    </select>

                    <button className="px-6 py-2 bg-[#0E7490] hover:bg-[#085a70] text-white text-sm font-semibold rounded-xl transition shadow-md shadow-[#0E7490]/20 hidden sm:block">
                        Search
                    </button>
                    
                    <button className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition ml-auto sm:ml-0 flex-shrink-0">
                        <SlidersHorizontal size={20} />
                    </button>
                </div>
            </motion.div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <p className="text-sm text-slate-500">
                    Showing <strong className="text-slate-800">{filteredAndSortedDoctors.length}</strong> doctors
                </p>

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                        >
                            <option value="default">Recommended</option>
                            <option value="fee-low">Price: Low to High</option>
                            <option value="fee-high">Price: High to Low</option>
                            <option value="experience">Experience</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <button
                            onClick={() => setLayoutMode('grid')}
                            className={`p-1.5 rounded-md transition ${layoutMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setLayoutMode('table')}
                            className={`p-1.5 rounded-md transition ${layoutMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Doctors Output */}
            {paginatedDoctors.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="p-16 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-slate-500"
                >
                    <Search className="mx-auto text-slate-300 mb-4" size={40} />
                    <p className="text-base font-medium">No doctors found matching your search.</p>
                    <button 
                        onClick={() => {setSearchTerm(''); setSelectedSpecialty('All');}} 
                        className="mt-4 text-[#0E7490] hover:underline text-sm font-semibold"
                    >
                        Clear filters
                    </button>
                </motion.div>
            ) : layoutMode === 'grid' ? (
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {paginatedDoctors.map((doc) => (
                            <motion.div
                                key={doc._id}
                                variants={itemVariants}
                                layout
                                whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(14, 116, 144, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)' }}
                                className="bg-white rounded-[2rem] border border-slate-100/80 transition-all duration-500 flex flex-col group relative shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] overflow-hidden"
                            >
                                {/* Top Section with Gradient Background */}
                                <div className="bg-gradient-to-b from-slate-50 to-white relative px-6 pt-8 pb-4 flex flex-col items-center">
                                    {/* Favorite Button */}
                                    <button className="absolute top-5 right-5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-full transition-colors z-10">
                                        <Heart size={20} />
                                    </button>

                                    {/* Profile Image with Online Badge */}
                                    <div className="relative w-28 h-28 shrink-0 mb-4">
                                        <div className="absolute inset-0 bg-[#0E7490]/10 rounded-full blur-md transform group-hover:scale-110 transition-transform duration-500"></div>
                                        <img
                                            src={doc.profileImage || 'https://i.ibb.co/0yN3Pn9K/g-9.jpg'}
                                            alt={doc.doctorName}
                                            className="relative w-full h-full rounded-full object-cover shadow-sm bg-white border-4 border-white z-10"
                                        />
                                        {/* Online badge */}
                                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full z-20 flex items-center justify-center shadow-sm">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Doctor Info (Centered) */}
                                    <div className="text-center w-full">
                                        <div className="flex items-center justify-center gap-1.5 mb-1">
                                            <h3 className="text-xl font-black text-slate-800 break-words group-hover:text-[#0E7490] transition-colors">
                                                {doc.doctorName}
                                            </h3>
                                            {doc.verificationStatus === 'Verified' && (
                                                <UserCheck size={18} className="text-[#0E7490]" />
                                            )}
                                        </div>
                                        <p className="text-sm font-extrabold text-[#0E7490] tracking-wide mb-2">
                                            {doc.specialization}
                                        </p>
                                        <div className="flex items-center justify-center gap-1 bg-amber-50 inline-flex px-2.5 py-1 rounded-lg">
                                            <Star size={14} className="fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-bold text-amber-700">4.9 (124+ Reviews)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle Section: Stats */}
                                <div className="px-6 py-4 flex-1 flex flex-col">
                                    <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-2 gap-3 border border-slate-100">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</span>
                                            <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm">
                                                <Briefcase size={14} className="text-[#0E7490]" />
                                                <span>{doc.experience}+ Years</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hospital</span>
                                            <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm">
                                                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                                <span className="truncate">{doc.hospitalName || 'Metro Hospital'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 text-xs font-medium text-slate-500 text-center px-2 line-clamp-2">
                                        {doc.qualifications}
                                    </div>
                                </div>

                                {/* Footer Section: Fee and Full Width Button */}
                                <div className="p-6 pt-0 mt-auto space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consultation</span>
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-lg font-bold text-[#0E7490]">$</span>
                                            <span className="text-3xl font-black text-slate-800">{doc.consultationFee}</span>
                                        </div>
                                    </div>
                                    
                                    <Link
                                        href={`/doctors/${doc._id}`}
                                        className="w-full flex items-center justify-center py-3.5 text-sm font-bold text-white bg-[#0E7490] hover:bg-[#0b5c73] rounded-2xl transition-all shadow-lg shadow-[#0E7490]/25 hover:shadow-xl hover:shadow-[#0E7490]/40 hover:-translate-y-1"
                                    >
                                        Book Appointment
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="p-4 pl-6">Doctor</th>
                                    <th className="p-4">Specialization</th>
                                    <th className="p-4">Experience</th>
                                    <th className="p-4">Fee</th>
                                    <th className="p-4 text-right pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                <AnimatePresence>
                                    {paginatedDoctors.map((doc) => (
                                        <motion.tr 
                                            key={doc._id} 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="hover:bg-slate-50 transition-colors group"
                                        >
                                            <td className="p-4 pl-6 flex items-center gap-4">
                                                <div className="relative w-10 h-10 shrink-0">
                                                    <img
                                                        src={doc.profileImage || 'https://i.ibb.co/0yN3Pn9K/g-9.jpg'}
                                                        alt={doc.doctorName}
                                                        className="w-full h-full rounded-full object-cover border border-slate-200"
                                                    />
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 group-hover:text-[#0E7490] transition-colors">{doc.doctorName}</p>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <Star size={12} className="fill-amber-400 text-amber-400" />
                                                        <span className="text-[11px] text-slate-500">4.8 (124)</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-slate-600">{doc.specialization}</td>
                                            <td className="p-4 text-slate-600">{doc.experience} Years</td>
                                            <td className="p-4 font-bold text-slate-900">${doc.consultationFee}</td>
                                            <td className="p-4 text-right pr-6 flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/doctors/${doc._id}`}
                                                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#0E7490] hover:bg-[#085a70] rounded-lg transition"
                                                >
                                                    Book
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-8 pb-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition shadow-sm"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-10 h-10 border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition shadow-sm"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}