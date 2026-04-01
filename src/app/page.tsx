import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyDifferent from "@/components/sections/WhyDifferent";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import SocialProof from "@/components/sections/SocialProof";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden relative">
      <Navbar />
      <Hero />
      <Services />
      <WhyDifferent />
      <HowItWorks />
      <Stats />
      <Portfolio projects={projects} />
      <About />
      <Testimonials />
      <SocialProof />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
