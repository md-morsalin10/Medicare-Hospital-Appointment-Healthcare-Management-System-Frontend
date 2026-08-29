import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import Image from 'next/image';
import { Mail, Shield, Calendar, CheckCircle2, XCircle, User } from 'lucide-react';

const PatientProfile = async () => {
    const user = await getUserSeason();

    // Fallback data if user properties are missing
    const name = user?.name || 'Rayhan';
    const email = user?.email || 'rayhan@gmail.com';
    const image = user?.image || 'https://i.ibb.co/LDFjvZJD/m-9.jpg';
    const role = user?.role || 'patient';
    const emailVerified = user?.emailVerified ?? false;
    const createdAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'August 25, 2026';

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-cyan-700 to-slate-900 h-44 rounded-3xl shadow-sm overflow-hidden">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
            </div>

            {/* Main Content Card */}
            <div className="relative bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-200/50 -mt-20 mx-3 sm:mx-6">

                {/* Profile Top Section: Avatar & Action */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
                    <div className="relative">
                        <img
                            src={image}
                            alt={name}
                            referrerPolicy="no-referrer"
                            className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white shadow-md bg-white"
                        />
                        <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="capitalize px-4 py-1.5 rounded-full bg-cyan-50 text-[#0E7490] text-xs font-bold tracking-wide border border-cyan-100/60">
                            {role} Account
                        </span>
                    </div>
                </div>

                {/* Identity Header */}
                <div className="space-y-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                            {name}
                        </h1>
                        {emailVerified ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                                <CheckCircle2 size={14} /> Verified
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                                <XCircle size={14} /> Unverified
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{email}</p>
                </div>

                <hr className="my-6 border-slate-100" />

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="p-2.5 rounded-xl bg-white text-[#0E7490] shadow-sm">
                            <Mail size={18} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                            <p className="text-sm font-semibold text-slate-700">{email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="p-2.5 rounded-xl bg-white text-[#0E7490] shadow-sm">
                            <Shield size={18} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">User Role</p>
                            <p className="text-sm font-semibold text-slate-700 capitalize">{role}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="p-2.5 rounded-xl bg-white text-[#0E7490] shadow-sm">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Joined On</p>
                            <p className="text-sm font-semibold text-slate-700">{createdAt}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="p-2.5 rounded-xl bg-white text-[#0E7490] shadow-sm">
                            <User size={18} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account ID</p>
                            <p className="text-xs font-mono font-medium text-slate-500 truncate max-w-[200px]">
                                {user?._id?.toString() || '6a8d6d6c738c46167967878a'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PatientProfile;