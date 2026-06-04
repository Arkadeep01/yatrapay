import { motion } from "motion/react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "$0",
    sub: "Forever free",
    features: ["Up to 3 active trips", "Unlimited expenses", "Basic splitting", "Mobile + web"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Voyager",
    price: "$8",
    sub: "per user / month",
    features: ["Unlimited trips & members", "OCR receipt scanning", "Multi-currency + live FX", "Advanced analytics", "PDF reports", "Priority support"],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Expedition",
    price: "Custom",
    sub: "For teams & businesses",
    features: ["Everything in Voyager", "SSO + role management", "Audit logs & compliance", "Dedicated success manager", "Custom integrations", "SLA guarantees"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Pricing that <span className="text-gradient">scales with you</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Start free. Upgrade when your trips outgrow it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 ${
                p.highlight
                  ? "glass-strong shadow-float border-primary/40 lg:scale-105"
                  : "glass"
              }`}
            >
              {p.highlight && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-glow">
                    Most popular
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-5 pointer-events-none" />
                </>
              )}

              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold tracking-tight">{p.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{p.sub}</p>

              <button className={`w-full mt-6 py-3 rounded-xl font-medium transition ${
                p.highlight
                  ? "bg-gradient-primary text-white shadow-glow hover:shadow-float"
                  : "glass-strong hover:bg-white/10"
              }`}>
                {p.cta}
              </button>

              <div className="mt-7 space-y-3">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-accent/20 grid place-items-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-accent" strokeWidth={3} />
                    </div>
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
