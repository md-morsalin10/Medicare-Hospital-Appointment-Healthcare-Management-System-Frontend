"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    Calendar,
    Clock,
    CheckCircle2,
    Download,
    Search,
    DollarSign,
    Receipt,
    FileText,
    X,
    Printer
} from "lucide-react";

const PaymentHistoryList = ({ payments = [] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Filter Payments based on Search
    const filteredPayments = payments.filter((item) =>
        item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.stripeSessionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.appointmentDate?.includes(searchTerm)
    );

    // Calculate Total Amount Spent
    const totalSpent = payments.reduce((acc, curr) => acc + (Number(curr.doctorFee) || 0), 0);

    return (
        <div className="space-y-6">
            {/* STATS OVERVIEW CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Spent */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-600 text-white rounded-3xl p-5 shadow-lg shadow-emerald-600/10 flex items-center justify-between"
                >
                    <div>
                        <p className="text-emerald-100 text-xs font-medium">Total Amount Spent</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">${totalSpent}</h3>
                    </div>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                    </div>
                </motion.div>

                {/* Successful Payments */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex items-center justify-between"
                >
                    <div>
                        <p className="text-slate-500 text-xs font-medium">Paid Appointments</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                            {payments.length}
                        </h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                </motion.div>

                {/* Transactions Recorded */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm flex items-center justify-between"
                >
                    <div>
                        <p className="text-slate-500 text-xs font-medium">Transaction Records</p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                            {payments.length}
                        </h3>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Receipt className="w-6 h-6" />
                    </div>
                </motion.div>
            </div>

            {/* SEARCH AND FILTER BAR */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by Doctor, Date or Session ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 transition-all"
                    />
                </div>
                <p className="text-xs text-slate-400 font-medium">
                    Showing {filteredPayments.length} of {payments.length} Records
                </p>
            </div>

            {/* TRANSACTIONS TABLE / LIST */}
            {filteredPayments.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1">No Payment Records Found</h3>
                    <p className="text-xs text-slate-500">No matching transaction history available right now.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Doctor</th>
                                    <th className="py-4 px-6">Appointment Info</th>
                                    <th className="py-4 px-6">Transaction ID</th>
                                    <th className="py-4 px-6">Amount</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Receipt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                                {filteredPayments.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                        {/* Doctor Info */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.doctorImage || "https://i.ibb.co/dH2LgKb/images-5.jpg"}
                                                    alt=""
                                                    className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-800 line-clamp-1">{item.doctorName}</p>
                                                    <p className="text-[11px] text-slate-400">{item.doctorEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Appointment Date & Time */}
                                        <td className="py-4 px-6">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                                                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                    <span>{item.appointmentDate}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    <span>{item.appointmentTime}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Transaction ID */}
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60 max-w-[140px] truncate block">
                                                {item.stripeSessionId || "N/A"}
                                            </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="py-4 px-6 font-bold text-slate-800">
                                            ${item.doctorFee}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                <CheckCircle2 className="w-3 h-3" />
                                                {item.paymentStatus || "Paid"}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => setSelectedReceipt(item)}
                                                className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                                            >
                                                <Receipt className="w-4 h-4" />
                                                <span>View</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* RECEIPT MODAL */}
            <AnimatePresence>
                {selectedReceipt && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative"
                        >
                            <button
                                onClick={() => setSelectedReceipt(null)}
                                className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Receipt Header */}
                            <div className="text-center pb-6 border-b border-dashed border-slate-200">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800">Payment Receipt</h2>
                                <p className="text-xs text-slate-400 mt-0.5">Medicare Consultation Services</p>
                            </div>

                            {/* Receipt Content */}
                            <div className="py-6 space-y-4 text-xs sm:text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Transaction ID</span>
                                    <span className="font-mono text-[11px] font-semibold text-slate-700 truncate max-w-[180px]">
                                        {selectedReceipt.stripeSessionId}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Doctor</span>
                                    <span className="font-bold text-slate-800">{selectedReceipt.doctorName}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Appointment Date</span>
                                    <span className="font-semibold text-slate-800">{selectedReceipt.appointmentDate}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Time Slot</span>
                                    <span className="font-semibold text-slate-800">{selectedReceipt.appointmentTime}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500">Patient Name</span>
                                    <span className="font-semibold text-slate-800">{selectedReceipt.patientName}</span>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-base font-bold text-slate-800">Total Paid</span>
                                    <span className="text-xl font-extrabold text-emerald-600">${selectedReceipt.doctorFee}</span>
                                </div>
                            </div>

                            {/* Print Action */}
                            <button
                                onClick={() => window.print()}
                                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                <Printer className="w-4 h-4" />
                                Print Receipt
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PaymentHistoryList;