import Hero from "./components/Hero";
import {
  Navbar,
  TrustSection,
  ProblemSolution,
  FeaturesGrid,
  HowItWorks,
  ProductShowcase,
  AISection,
  Analytics,
  Testimonials,
  Pricing,
  FAQ,
  FinalCTA,
  Footer,
} from "./components/sections";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#05060f] text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustSection />
        <ProblemSolution />
        <FeaturesGrid />
        <HowItWorks />
        <ProductShowcase />
        <AISection />
        <Analytics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
