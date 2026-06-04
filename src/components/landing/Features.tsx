import { motion } from "motion/react";
import {
  ScanLine, Split, PieChart, Wallet, Globe2, Sparkles,
  ShieldCheck, Bell, FileText,
} from "lucide-react";

const features = [
  { icon: ScanLine, title: "OCR bill scanning", desc: "Snap a receipt — we extract every line item, tax, and tip automatically.", accent: "from-accent/40 to-accent/0" },
  { icon: Split, title: "Smart splitting", desc: "Split equally, by share, by percentage, or by exact amounts. We do the math.", accent: "from-primary/40 to-primary/0" },
  { icon: PieChart, title: "Live analytics", desc: "Animated charts for category, daily, and per-member spending in real time.", accent: "from-accent/40 to-accent/0" },
  { icon: Wallet, title: "Settlement engine", desc: "Optimized debt graph reduces 20 payments down to 3. Settle in one tap.", accent: "from-primary/40 to-primary/0" },
  { icon: Globe2, title: "Multi-currency", desc: "Track expenses in any currency with live FX rates. Settle in your own.", accent: "from-accent/40 to-accent/0" },
  { icon: ShieldCheck, title: "Bank-grade security", desc: "256-bit encryption, SOC2-ready, and zero-knowledge ledger by design.", accent: "from-primary/40 to-primary/0" },
  { icon: Bell, title: "Live notifications", desc: "Stay synced as your trip mates add expenses, mark payments, and settle.", accent: "from-accent/40 to-accent/0" },
  { icon: FileText, title: "Premium reports", desc: "Generate beautiful PDF summaries and tax-ready expense reports.", accent: "from-primary/40 to-primary/0" },
  { icon: Sparkles, title: "AI insights", desc: "Spot anomalies, suggest budgets, and surface hidden patterns automatically.", accent: "from-accent/40 to-accent/0" },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 mb-5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Built for modern travelers
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Everything you need to <span className="text-gradient">split smart</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Powerful primitives wrapped in an interface that feels like magic.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-3xl p-6 overflow-hidden hover:border-white/20 transition"
            >
              <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-radial ${f.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative">
                <div className="w-12 h-12 rounded-2xl glass-strong grid place-items-center mb-5 group-hover:shadow-glow transition-shadow">
                  <f.icon className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
