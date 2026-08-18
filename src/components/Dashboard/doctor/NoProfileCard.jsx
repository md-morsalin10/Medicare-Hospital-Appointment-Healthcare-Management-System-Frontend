"use client";

import React from "react";
import { User, Plus } from "lucide-react";

export default function NoProfileCard({ cardRef, onCreateClick }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-4">
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xl"
      >
        <div className="w-20 h-20 bg-cyan-50 text-[#0E7490] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <User size={36} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Doctor Profile Found</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">
          Please set up your details to complete registration and start receiving appointments.
        </p>
        <button
          onClick={onCreateClick}
          className="inline-flex items-center gap-2 bg-[#0E7490] hover:bg-[#085369] text-white text-sm font-semibold px-6 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Create Profile Now
        </button>
      </div>
    </div>
  );
}