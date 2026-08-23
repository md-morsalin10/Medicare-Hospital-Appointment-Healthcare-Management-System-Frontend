"use client";

import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoctorCard } from '@/components/Dashboard/doctor/DoctorCard';
import { DoctorTableRow } from '@/components/Dashboard/doctor/DoctorTableRow';


export default function FindDoctorsClient({ doctors = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [layoutMode, setLayoutMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const specialties = useMemo(() => {
        const set = new Set(doctors.map((d) => d.specialization).filter(Boolean));
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

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
    };

    return (
        <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-3 flex flex-col md:flex-row items-center gap-3 shadow-sm">
                <div className="relative flex-1 w-full flex items-center">
                    <Search size={18} className="absolute left-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search doctor or specialty..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 focus:bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E7490]/20 text-slate-700 transition"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select
                        value={selectedSpecialty}
                        onChange={(e) => { setSelectedSpecialty(e.target.value); setCurrentPage(1); }}
                        className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700 cursor-pointer w-full md:w-auto"
                    >
                        {specialties.map((spec) => (
                            <option key={spec} value={spec}>
                                {spec === 'All' ? 'All Specialties' : spec}
                            </option>
                        ))}
                    </select>

                    <button className="p-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition shrink-0">
                        <SlidersHorizontal size={16} />
                    </button>
                </div>
            </div>

            {/* Control Strip */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <p>Showing <strong className="text-slate-800">{filteredAndSortedDoctors.length}</strong> doctors</p>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <span>Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
                        >
                            <option value="default">Recommended</option>
                            <option value="fee-low">Price: Low to High</option>
                            <option value="fee-high">Price: High to Low</option>
                            <option value="experience">Experience</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setLayoutMode('grid')}
                            className={`p-1 rounded ${layoutMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
                        >
                            <LayoutGrid size={14} />
                        </button>
                        <button
                            onClick={() => setLayoutMode('table')}
                            className={`p-1 rounded ${layoutMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}
                        >
                            <List size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid or Table Output */}
            {paginatedDoctors.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-sm">
                    No doctors found. Try adjusting filters.
                </div>
            ) : layoutMode === 'grid' ? (
                <motion.div initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    <AnimatePresence>
                        {paginatedDoctors.map((doc) => (
                            <DoctorCard key={doc._id} doc={doc} itemVariants={itemVariants} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                            <tr>
                                <th className="p-4 pl-6">Doctor</th>
                                <th className="p-4">Specialization</th>
                                <th className="p-4">Experience</th>
                                <th className="p-4">Fee</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {paginatedDoctors.map((doc) => (
                                    <DoctorTableRow key={doc._id} doc={doc} />
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-semibold text-slate-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 disabled:opacity-30"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}