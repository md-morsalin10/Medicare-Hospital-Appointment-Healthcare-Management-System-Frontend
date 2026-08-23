"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { createDoctorProfile } from "@/lib/action/doctorProfile";
import NoProfileCard from "./NoProfileCard";
import ProfileForm from "./ProfileForm";
import ProfileCard from "./ProfileCard";
import { authClient } from "@/lib/auth-client";

export default function DoctorProfileManager({ initialProfile = null }) {
  // যদি initialProfile খালি Array হয় ([]) বা falsy হয়, তবে null বানিয়ে নেওয়া হচ্ছে
  const rawProfile = Array.isArray(initialProfile)
    ? initialProfile.length > 0 ? initialProfile[0] : null
    : initialProfile;

  const [profile, setProfile] = useState(rawProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Auth User Data
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    doctorId: "",
    doctorEmail: "",
    doctorName: rawProfile?.doctorName || "",
    specialization: rawProfile?.specialization || "Cardiology",
    qualifications: rawProfile?.qualifications || "",
    experience: rawProfile?.experience || "",
    consultationFee: rawProfile?.consultationFee || "",
    hospitalName: rawProfile?.hospitalName || "",
    profileImage: rawProfile?.profileImage || "",
    verificationStatus: rawProfile?.verificationStatus || "Pending",
  });

  const cardRef = useRef(null);

  useEffect(() => {
    const activeData = Array.isArray(initialProfile)
      ? initialProfile.length > 0 ? initialProfile[0] : null
      : initialProfile;

    setProfile(activeData);
    

    if (activeData) {
      setFormData({
        doctorId: activeData.doctorId || "",
        doctorEmail: activeData.doctorEmail || "",
        doctorName: activeData.doctorName || "",
        specialization: activeData.specialization || "Cardiology",
        qualifications: activeData.qualifications || "",
        experience: activeData.experience || "",
        consultationFee: activeData.consultationFee || "",
        hospitalName: activeData.hospitalName || "",
        profileImage: activeData.profileImage || "",
        verificationStatus: activeData.verificationStatus || "Pending",
      });
    }
  }, [initialProfile]);

  // Animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [isCreating, isEditing]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      doctorId: user?.id || formData.doctorId,
      doctorEmail: user?.email || formData.doctorEmail,
    };

    try {
      await createDoctorProfile(payload);
      setProfile(payload);
      setIsCreating(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  // View 1: No Profile
  if (!profile && !isCreating) {
    return <NoProfileCard cardRef={cardRef} onCreateClick={() => setIsCreating(true)} />;
  }

  return (
    <div className="relative w-full h-full">
      {/* Profile Display or No Profile Display behind the modal */}
      {!profile ? (
        <NoProfileCard cardRef={cardRef} onCreateClick={() => setIsCreating(true)} />
      ) : (
        <ProfileCard
          cardRef={cardRef}
          profile={profile}
          onEdit={() => {
            setFormData(profile);
            setIsEditing(true);
          }}
        />
      )}

      {/* Modal Overlay for Form (Create/Edit) */}
      {(isCreating || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto" ref={cardRef}>
            <ProfileForm
              formData={formData}
              saving={saving}
              isEditing={isEditing}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsCreating(false);
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}