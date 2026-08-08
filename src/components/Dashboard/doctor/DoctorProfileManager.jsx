"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
import { createDoctorProfile } from "@/lib/action/doctorProfile";
import NoProfileCard from "./NoProfileCard";
import ProfileForm from "./ProfileForm";
import ProfileCard from "./ProfileCard";

export default function DoctorProfileManager({ initialProfile = null }) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    doctorName: profile?.doctorName || "",
    specialization: profile?.specialization || "Cardiology",
    qualifications: profile?.qualifications || "",
    experience: profile?.experience || "",
    consultationFee: profile?.consultationFee || "",
    hospitalName: profile?.hospitalName || "",
    profileImage: profile?.profileImage || "",
    availableDays: profile?.availableDays || ["Mon", "Wed", "Fri"],
    availableSlots: profile?.availableSlots || "09:00 AM - 01:00 PM",
    verificationStatus: profile?.verificationStatus || "Pending",
  });

  const cardRef = useRef(null);

  // Smooth entrance animation with GSAP
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isCreating, isEditing]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await createDoctorProfile(formData);
      setProfile(formData);
      setIsCreating(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please check server actions or API.");
    } finally {
      setSaving(false);
    }
  };

  // View 1: Empty Profile State
  if (!profile && !isCreating) {
    return (
      <NoProfileCard
        cardRef={cardRef}
        onCreateClick={() => setIsCreating(true)}
      />
    );
  }

  // View 2: Create / Edit Form
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