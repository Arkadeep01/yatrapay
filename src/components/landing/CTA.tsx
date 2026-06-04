import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto rounded-[2.5rem] glass-strong p-12 sm:p-16 text-center overflow-hidden shadow-float"
      >
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full animate-glow-pulse" />

        <div className="relative">
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            Your next trip
            <br />
            <span className="text-gradient">deserves better.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-md mx-auto">
            Join thousands of travelers who never argue about who owes what.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button className="group bg-gradient-primary text-white px-7 py-3.5 rounded-2xl font-medium shadow-glow hover:shadow-float transition-all hover:scale-[1.03] flex items-center gap-2">
              Start free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass-strong px-7 py-3.5 rounded-2xl font-medium hover:bg-white/10 transition">
              Book a demo
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
