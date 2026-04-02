import Navbar from "@/components/Navbar";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing | Black Vertex",
  description:
    "Every project is different in scope, complexity, and ambition. Tell us what you're building — we'll tell you exactly what it takes.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="pt-24">
        <Pricing />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
