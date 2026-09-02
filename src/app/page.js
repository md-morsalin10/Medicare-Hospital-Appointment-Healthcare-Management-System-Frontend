import Banner from "@/components/Banner";
import FeaturesSection from "@/components/FeaturesSection";
import PlatformStats from "@/components/PlatformStats";
import HowItWorksSection from "@/components/HowItWorksSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import FeaturesDoctors from "@/components/FeaturesDoctors";

export const metadata = {
  title: "MediCare Connect — Modern Healthcare at Your Fingertips",
  description:
    "Connect with top-rated medical professionals, schedule appointments, and manage your health journey — all in one secure platform.",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <PlatformStats />
      <FeaturesDoctors />
      <HowItWorksSection />
      <SpecialtiesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
