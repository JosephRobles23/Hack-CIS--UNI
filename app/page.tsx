"use client"

import FloatingParticles from "@/components/floating-particles"
import Navigation from "@/components/sections/navigation"
import HeroSection from "@/components/sections/hero-section"
import SponsorsSection from "@/components/sections/sponsors-section"
import DetailsSection from "@/components/sections/details-section"
import AgendaSection from "@/components/sections/agenda-section"
import EvaluationSection from "@/components/sections/evaluation-section"
import ProjectSubmissionsSection from "@/components/sections/project-submissions-section"
import FAQSection from "@/components/sections/faq-section"
import SponsorshipSection from "@/components/sections/sponsorship-section"
import EventDetailsSection from "@/components/sections/event-details-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/sections/footer"

export default function HackCISMinimal() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <FloatingParticles />
      <Navigation />
      <HeroSection />
      <SponsorsSection />
      <DetailsSection />
      <SponsorshipSection />
      {/* <AgendaSection /> */}
      {/* <EvaluationSection /> */}
      {/* <ProjectSubmissionsSection /> */}
      <FAQSection />
      <CTASection />
      {/* <EventDetailsSection /> */}
      <Footer />
    </div>
  )
}
