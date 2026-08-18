"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { createDoctorProfile } from "@/lib/action/doctorProfile";
import NoProfileCard from "./NoProfileCard";
import ProfileForm from "./ProfileForm";
import ProfileCard from "./ProfileCard";
import { authClient } from "@/lib/auth-client";

export default function DoctorProfileManager({ initialProfile = null }) {
  const [profile, setProfile] = useState(initialProfile);
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
    doctorName: initialProfile?.doctorName || "",
    specialization: initialProfile?.specialization || "Cardiology",
    qualifications: initialProfile?.qualifications || "",
    experience: initialProfile?.experience || "",
    consultationFee: initialProfile?.consultationFee || "",
    hospitalName: initialProfile?.hospitalName || "",
    profileImage: initialProfile?.profileImage || "",
    availableDays: initialProfile?.availableDays || ["Mon", "Wed", "Fri"],
    availableSlots: initialProfile?.availableSlots || "09:00 AM - 01:00 PM",
    verificationStatus: initialProfile?.verificationStatus || "Pending",
  });

  const cardRef = useRef(null);

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

    // Make sure doctorId & doctorEmail exist from session
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