import { motion } from "motion/react";

const steps = [
  { n: "01", title: "Create a trip", desc: "Spin up a trip in seconds — name it, set a budget, invite your crew via link." },
  { n: "02", title: "Log expenses", desc: "Add expenses manually or scan receipts. Pick who paid and how to split." },
  { n: "03", title: "Track in real time", desc: "Watch the balance graph update live as everyone contributes throughout the trip." },
  { n: "04", title: "Settle in one tap", desc: "Our engine minimizes transactions. Pay through your favorite app — done." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            From chaos to <span className="text-gradient">clarity</span> in 4 steps
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            A friction-free flow that gets out of the way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative glass rounded-3xl p-6 hover:border-primary/30 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary grid place-items-center font-display font-bold text-white shadow-glow mb-5 group-hover:scale-110 transition-transform">
                {s.n}
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
