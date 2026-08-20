"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { createDoctorProfile } from "@/lib/action/doctorProfile";
import NoProfileCard from "./NoProfileCard";
import ProfileForm from "./ProfileForm";
import ProfileCard from "./ProfileCard";
import { authClient } from "@/lib/auth-client";

export default function DoctorProfileManager({ initialProfile = null }) {
  // যদি initialProfile খালি Array হয় ([]) বা falsy হয়, তবে null বানিয়ে নিন
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

  // Initial Form Data State
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
    availableDays: rawProfile?.availableDays || ["Mon", "Wed", "Fri"],
    availableSlots: rawProfile?.availableSlots || "09:00 AM - 01:00 PM",
    verificationStatus: rawProfile?.verificationStatus || "Pending",
  });

  const cardRef = useRef(null);

  // initialProfile পরিবর্তন হলে state আপডেট করার জন্য
  useEffect(() => {
    const activeData = Array.isArray(initialProfile)
      ? initialProfile.length > 0 ? initialProfile[0] : null
      : initialProfile;

    setProfile(activeData);
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

  // Handle Days Toggle
  const handleDayToggle = (day) => {
    const days = formData.availableDays.includes(day)
      ? formData.availableDays.filter((d) => d !== day)
      : [...formData.availableDays, day];
    
    setFormData({ ...formData, availableDays: days });
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

  // View 1: No Profile (খালি অ্যারে বা null হলে এটি রেন্ডার হবে)
  if (!profile && !isCreating) {
    return <NoProfileCard cardRef={cardRef} onCreateClick={() => setIsCreating(true)} />;
  }

  // View 2: Form (Create/Edit)
  if (isCreating || isEditing) {
    return (
      <ProfileForm
        cardRef={cardRef}
        formData={formData}
        saving={saving}
        isEditing={isEditing}
        onChange={handleChange}
        onDayToggle={handleDayToggle}
        onSubmit={handleSubmit}
        onCancel={() => {
          setIsCreating(false);
          setIsEditing(false);
        }}
      />
    );
  }

  // View 3: Profile Display
  return (
    <ProfileCard
      cardRef={cardRef}
      profile={profile}
      onEdit={() => {
        setFormData(profile);
        setIsEditing(true);
      }}
    />
  );
}