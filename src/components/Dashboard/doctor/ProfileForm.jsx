"use client";

import React, { useState } from "react";
import { User, GraduationCap, Briefcase, DollarSign, Building2, Upload, Loader2, Image as ImageIcon, CheckCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const SPECIALIZATIONS = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "General Medicine"];

export default function ProfileForm({ cardRef, formData, saving, isEditing, onChange, onSubmit, onCancel }) {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);
    const data = new FormData();
    data.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        onChange({
          target: { name: "profileImage", value: result.data.url },
        });
        
        setUploadSuccess(true);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Toast Component */}
      <Toaster position="top-right" reverseOrder={false} />

      <div ref={cardRef} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl shadow-slate-200/50">

        {/* Header */}
        <div className="mb-8 pb-5 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">
            {isEditing ? "Edit Provider Credentials" : "Setup Provider Credentials"}
          </h2>
          <p className="text-slate-500 text-xs mt-1">Fill in your professional medical details.</p>
        </div>

        {/* Form Fields */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Doctor Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Doctor Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="doctorName"
                  required
                  placeholder="e.g. Dr. Sarah Chen"
                  value={formData.doctorName}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Specialization</label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={onChange}
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20 cursor-pointer"
              >
                {SPECIALIZATIONS.map((item) => (
                  <option key={item} value={item} className="text-slate-900">{item}</option>
                ))}
              </select>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Qualifications</label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="qualifications"
                  required
                  placeholder="e.g. MBBS, FCPS"
                  value={formData.qualifications}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Experience (Years)</label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  name="experience"
                  required
                  placeholder="e.g. 10"
                  value={formData.experience}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Consultation Fee */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Consultation Fee ($)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  name="consultationFee"
                  required
                  placeholder="e.g. 150"
                  value={formData.consultationFee}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

            {/* Hospital Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Hospital Affiliation</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="hospitalName"
                  required
                  placeholder="e.g. Metro Health Hospital"
                  value={formData.hospitalName}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium outline-none focus:border-[#0E7490] focus:bg-white focus:ring-2 focus:ring-[#0E7490]/20"
                />
              </div>
            </div>

          </div>

          {/* Direct Image Upload Box */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              {formData.profileImage ? (
                <div className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                  uploadSuccess || formData.profileImage ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
                }`}>
                  <img src={formData.profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon size={28} />
                </div>
              )}

              {/* Dynamic styling for Upload Box */}
              <label className={`flex-1 cursor-pointer border p-4 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition ${
                uploadSuccess || formData.profileImage
                  ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                  : "bg-slate-50 border-dashed border-slate-300 hover:border-[#0E7490] hover:bg-slate-100 text-slate-600"
              }`}>
                {uploading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-[#0E7490]" />
                    <span className="text-[#0E7490]">Uploading...</span>
                  </>
                ) : uploadSuccess || formData.profileImage ? (
                  <>
                    <CheckCircle size={16} className="text-emerald-600" />
                    <span className="font-bold text-emerald-700">Image Uploaded Successfully!</span>
                  </>
                ) : (
                  <>
                    <Upload size={16} className="text-[#0E7490]" />
                    <span>Choose Photo to Upload</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving || uploading}
              className="px-6 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-2.5 rounded-xl bg-[#0E7490] text-white text-xs font-bold hover:bg-[#085369] disabled:opacity-50 flex items-center gap-2 shadow-md transition"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving..." : isEditing ? "Update Profile" : "Create Profile"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}