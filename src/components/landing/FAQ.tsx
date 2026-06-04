import { motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "How does the settlement engine work?", a: "We model the trip as a directed debt graph and solve for the minimum-transaction settlement plan. The result is always mathematically optimal." },
  { q: "Can I use YatraPay offline?", a: "Yes. Add expenses offline and they sync the moment you reconnect. Your trip mates see updates in real time." },
  { q: "Which currencies are supported?", a: "All 170+ ISO currencies with live FX rates updated every 60 seconds. Settle in whichever currency works for you." },
  { q: "Is my financial data secure?", a: "End-to-end encrypted. We're SOC 2-ready and use zero-knowledge ledger design — even we can't see your transactions." },
  { q: "Can I export expense reports?", a: "Absolutely. Generate beautiful PDF reports or export to CSV — perfect for reimbursements and tax filing." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Frequently asked
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition"
              >
                <span className="font-medium">{f.q}</span>
                <Plus
                  className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
                    open === i ? "rotate-45" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
