"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    DollarSign,
    CreditCard,
    CheckCircle2,
    Clock,
    Copy,
    Check,
    ArrowUpRight,
    TrendingUp,
    Receipt,
    User,
    Stethoscope
} from "lucide-react";
import Image from "next/image";

const TransactionsTable = ({ initialTransactions = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [copiedId, setCopiedId] = useState(null);

    // Stats Calculation
    const totalRevenue = initialTransactions.reduce((acc, curr) => acc + (Number(curr.doctorFee) || 0), 0);
    const paidCount = initialTransactions.filter((t) => t.paymentStatus === "Paid").length;
    const avgTransaction = initialTransactions.length ? (totalRevenue / initialTransactions.length).toFixed(2) : 0;

    // Copy Stripe Session ID
    const handleCopy = (id) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Search & Filter Logic
    const filteredTransactions = initialTransactions.filter((item) => {
        const matchesFilter = statusFilter === "All" || (item.paymentStatus || "Paid") === statusFilter;
        const matchesSearch =
            item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.patientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.stripeSessionId?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* ── STATS OVERVIEW CARDS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
                            ${totalRevenue}
                        </h2>
                        <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> +100% completed payments
                        </p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Successful Payments</p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
                            {paidCount}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-1">Stripe Gateway processed</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <CreditCard className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Transaction</p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
                            ${avgTransaction}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium mt-1">Per appointment booking</p>
                    </div>
                    <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
                        <Receipt className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* ── FILTER & SEARCH CONTROLS ── */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm">
                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                    {["All", "Paid", "Pending", "Failed"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setStatusFilter(tab)}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${statusFilter === tab
                                    ? "bg-slate-900 text-white shadow-sm"
                                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by Patient, Doctor, Session ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 text-slate-700"
                    />
                </div>
            </div>

            {/* ── TRANSACTIONS TABLE ── */}
            {filteredTransactions.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto my-8">
                    <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Receipt className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Transactions Found</h3>
                    <p className="text-xs text-slate-500">There are no transaction records matching your query.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Patient</th>
                                    <th className="py-4 px-6">Doctor</th>
                                    <th className="py-4 px-6">Stripe Session ID</th>
                                    <th className="py-4 px-6">Date & Time</th>
                                    <th className="py-4 px-6">Amount</th>
                                    <th className="py-4 px-6 text-right">Payment Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredTransactions.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                        {/* Patient */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={item.patientImage || "https://cdn-icons-png.flaticon.com/512/9193/9193824.png"}
                                                    alt={item.patientName || "Patient"}
                                                    width={38}
                                                    height={38}
                                                    className="rounded-xl object-cover border border-slate-200 shrink-0"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm">{item.patientName}</p>
                                                    <p className="text-[11px] text-slate-400">{item.patientEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Doctor */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={item.doctorImage || "https://i.ibb.co/dH2LgKb/images-5.jpg"}
                                                    alt={item.doctorName || "Doctor"}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-lg object-cover border border-slate-200 shrink-0"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-700">{item.doctorName}</p>
                                                    <p className="text-[11px] text-slate-400">{item.doctorEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Stripe Session ID */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 max-w-[180px]">
                                                <span className="font-mono text-[11px] text-slate-500 truncate bg-slate-100 px-2 py-1 rounded-lg">
                                                    {item.stripeSessionId || "N/A"}
                                                </span>
                                                {item.stripeSessionId && (
                                                    <button
                                                        onClick={() => handleCopy(item.stripeSessionId)}
                                                        className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-all"
                                                        title="Copy Session ID"
                                                    >
                                                        {copiedId === item.stripeSessionId ? (
                                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                                        ) : (
                                                            <Copy className="w-3.5 h-3.5" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-semibold text-slate-700">{item.appointmentDate}</p>
                                                <p className="text-[11px] text-slate-400">{item.appointmentTime}</p>
                                            </div>
                                        </td>

                                        {/* Amount */}
                                        <td className="py-4 px-6">
                                            <span className="font-extrabold text-slate-900 text-sm">
                                                ${item.doctorFee}
                                            </span>
                                        </td>

                                        {/* Payment Status */}
                                        <td className="py-4 px-6 text-right">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                {item.paymentStatus || "Paid"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionsTable;