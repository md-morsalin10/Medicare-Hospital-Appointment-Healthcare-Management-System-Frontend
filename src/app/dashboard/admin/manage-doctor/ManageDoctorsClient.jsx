"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, XCircle, Clock, Search, ShieldAlert, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { getClientToken } from "@/lib/core/tokenClinet";

export default function ManageDoctorsClient({ initialDoctors = [] }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusUpdate = async (id, newStatus) => {
    setLoadingId(id);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL;
      const token = await getClientToken()
      const res = await fetch(`${baseUrl}/api/doctors/verify/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ verificationStatus: newStatus }),
      });

      const data = await res.json();

      if (data?.success || res.ok) {
        toast.success(`Doctor status updated to ${newStatus}`);

        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === id ? { ...doc, verificationStatus: newStatus } : doc
          )
        );
      } else {
        toast.error(data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Network error! Could not update status.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.doctorEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
            <CheckCircle2 size={12} /> Verified
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-full">
            <XCircle size={12} /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-full">
            <Clock size={12} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <Toaster position="top-right" />

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, email, or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0E7490]"
        />
      </div>

      {/* Doctors Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Doctor</th>
                <th className="p-4">Specialization & Qual.</th>
                <th className="p-4">Hospital</th>
                <th className="p-4">Experience & Fee</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">
                    No doctors found.
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc) => {
                  const isBusy = loadingId === doc._id;

                  return (
                    <tr key={doc._id} className="hover:bg-slate-50/60 transition">
                      {/* Name & Email */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={doc.profileImage || "https://i.ibb.co/0yN3Pn9K/g-9.jpg"}
                            alt={doc.doctorName}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{doc.doctorName}</p>
                            <p className="text-[11px] text-slate-500">{doc.doctorEmail}</p>
                          </div>
                        </div>
                      </td>

                      {/* Specialization & Qual */}
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">{doc.specialization}</p>
                        <p className="text-[11px] text-slate-500">{doc.qualifications}</p>
                      </td>

                      {/* Hospital */}
                      <td className="p-4 text-slate-600">{doc.hospitalName || "N/A"}</td>

                      {/* Experience & Fee */}
                      <td className="p-4">
                        <p className="text-slate-800">{doc.experience} Yrs Exp.</p>
                        <p className="text-[11px] text-emerald-600 font-bold">${doc.consultationFee}</p>
                      </td>

                      {/* Status Badge */}
                      <td className="p-4">{renderStatusBadge(doc.verificationStatus)}</td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        {isBusy ? (
                          <Loader2 size={16} className="animate-spin text-[#0E7490] ml-auto" />
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Verify Button */}
                            {doc.verificationStatus !== "Verified" && (
                              <button
                                onClick={() => handleStatusUpdate(doc._id, "Verified")}
                                className="px-2.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
                              >
                                Verify
                              </button>
                            )}

                            {/* Reject Button */}
                            {doc.verificationStatus !== "Rejected" && (
                              <button
                                onClick={() => handleStatusUpdate(doc._id, "Rejected")}
                                className="px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition"
                              >
                                Reject
                              </button>
                            )}

                            {/* Revoke/Cancel Verification Button */}
                            {doc.verificationStatus === "Verified" && (
                              <button
                                onClick={() => handleStatusUpdate(doc._id, "Pending")}
                                className="px-2.5 py-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition"
                                title="Cancel Verification"
                              >
                                Cancel Status
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}