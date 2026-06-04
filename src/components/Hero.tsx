import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plane as PlaneIcon, MapPin, CreditCard, LineChart, Sparkles, ArrowRight, Play } from "lucide-react";
import Globe from "./Globe";

function Counter({ to, suffix = "", duration = 2, prefix = "" }: { to: number; suffix?: string; duration?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null!);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const startT = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - startT) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(to * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-28 pb-12">
      {/* Animated backdrop */}
      <div className="absolute inset-0 bg-radial-glow"></div>
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"></div>
      {/* 3D canvas */}
      <div className="absolute inset-0">
        <Globe />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#05060f]/30 via-transparent to-[#05060f]"></div>

      <div className="relative max-w-7xl mx-auto container-px z-10">
        {/* top pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-white/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            New · AI receipt scanning now in public beta
          </div>
        </motion.div>

        {/* Headline */}
        <div className="mt-10 md:mt-16 text-center max-w-5xl mx-auto relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-bold text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
          >
            Travel Together.
            <br />
            <span className="text-gradient">Split Expenses Smarter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            Track, split, and settle group trip expenses in real time with AI-powered receipt scanning and intelligent settlement optimization.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="#" className="btn-glow inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#05060f] text-white font-semibold shadow-xl">
              <Sparkles className="w-4 h-4 text-violet-300" /> Start Free <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl glass hover:bg-white/10 text-white font-medium transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Play className="w-3 h-3 fill-white" />
              </div>
              Watch Demo
            </a>
          </motion.div>
        </div>

        {/* Floating UI cards */}
        <div className="relative mt-16 max-w-5xl mx-auto">
          {/* left card - expense */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: -40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="hidden md:block absolute -left-36 -top-12 z-20 w-72 glass rounded-2xl p-4 animate-float"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/50">New expense</p>
                <p className="text-xs font-semibold">Dinner · Fisherman's</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {["A", "R", "K", "S"].map((c, idx) => (
                  <div key={c + idx} className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-2 border-[#0b0f2a] flex items-center justify-center text-[10px] font-bold">
                    {c}
                  </div>
                ))}
              </div>
              <p className="font-display font-bold text-lg">₹6,820</p>
            </div>
            <div className="mt-3 text-[10px] text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Scanned & split automatically
            </div>
          </motion.div>

          {/* right card - settle */}
          <motion.div
            initial={{ opacity: 0, y: 40, x: 40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            className="hidden md:block absolute -right-40 top-20 z-20 w-80 glass rounded-2xl p-4 animate-float-delayed "
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <LineChart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/50">Smart Settlement</p>
                <p className="text-xs font-semibold">Minimized to 2 payments</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20">
                <span className="text-xs">Riya → Arjun</span>
                <span className="text-xs font-bold text-emerald-300">₹4,200</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                <span className="text-xs">Kabir → Arjun</span>
                <span className="text-xs font-bold text-cyan-300">₹2,400</span>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-white/50 text-center">💸 72% fewer transactions</p>
          </motion.div>

          {/* Big center stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="relative z-10 mx-auto max-w-3xl"
          >
            <div className="glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10"></div>
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { label: "Travelers", value: 50000, suffix: "+", sub: "and counting", color: "from-violet-400 to-fuchsia-400" },
                  { label: "Expenses", value: 10000000, prefix: "₹", suffix: "+", sub: "managed", color: "from-cyan-400 to-sky-400" },
                  { label: "Bills", value: 100000, suffix: "+", sub: "processed", color: "from-emerald-400 to-teal-400" },
                  { label: "Accuracy", value: 99.9, suffix: "%", sub: "OCR precision", color: "from-amber-400 to-pink-400" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className={`font-display font-bold text-2xl md:text-4xl bg-gradient-to-br ${s.color} bg-clip-text text-transparent`}>
                      <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </p>
                    <p className="text-xs font-semibold mt-1 text-white/90">{s.label}</p>
                    <p className="text-[10px] text-white/40">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Destination chips line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/50"
          >
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-violet-400" /> Happening now in Goa</span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5"><PlaneIcon className="w-3.5 h-3.5 text-fuchsia-400" /> 327 trips starting today</span>
            <span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI scans 2.3M receipts/month</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs flex flex-col items-center gap-2"
      >
        <span className="uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
}
