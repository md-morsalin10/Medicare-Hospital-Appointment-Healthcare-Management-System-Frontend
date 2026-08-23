// components/doctors/DoctorTableRow.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const DoctorTableRow = ({ doc }) => {
    return (
        <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hover:bg-slate-50/80 transition-colors group"
        >
            <td className="p-4 pl-6 flex items-center gap-3">
                <img
                    src={doc.profileImage || 'https://i.ibb.co/0yN3Pn9K/g-9.jpg'}
                    alt={doc.doctorName}
                    className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                    <p className="font-bold text-slate-800 group-hover:text-[#0E7490] transition-colors">{doc.doctorName}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                    </div>
                </div>
            </td>
            <td className="p-4 text-xs font-medium text-slate-600">{doc.specialization}</td>
            <td className="p-4 text-xs font-medium text-slate-600">{doc.experience} Years</td>
            <td className="p-4 text-xs font-bold text-slate-800">${doc.consultationFee}</td>
            <td className="p-4 text-right pr-6">
                <Link
                    href={`/doctors/${doc._id}`}
                    className="px-3 py-1.5 text-xs font-bold text-[#0E7490] bg-[#0E7490]/10 hover:bg-[#0E7490] hover:text-white rounded-lg transition-all"
                >
                    Book
                </Link>
            </td>
        </motion.tr>
    );
};