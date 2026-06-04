import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Plane,
  Users,
  ScanLine,
  Receipt,
  LineChart,
  ArrowRightLeft,
  Wallet,
  BarChart3,
  Globe2,
  FileText,
  CheckCircle2,
  Sparkles,
  Zap,
  Plane as PlaneIcon,
  MapPin,
  PieChart,
  TrendingUp,
  Brain,
  ChevronDown,
  Star,
  Quote,
  Play,
  Menu,
  X,
  ArrowRight,
  Check,
  Send,
} from "lucide-react";

/* ============ NAVBAR ============ */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = ["Features", "How it Works", "AI", "Pricing", "FAQ"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto container-px">
        <div className={`flex items-center justify-between rounded-2xl px-5 py-3 ${scrolled ? "glass-strong" : ""}`}>
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/40">
              <PlaneIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">YatraPay</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {items.map((i) => (
              <a
                key={i}
                href={`#${i.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {i}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:inline-block text-sm text-white/70 hover:text-white transition-colors">
              Sign in
            </a>
            <a
              href="#"
              className="relative inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
            >
              Start Free <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-2"
            >
              {items.map((i) => (
                <a
                  key={i}
                  href={`#${i.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/80 py-2"
                >
                  {i}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* ============ Reveal wrapper ============ */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============ TRUST SECTION ============ */
const TRUST_LOGOS = [
  "Wanderlust Club",
  "IIT Travel Soc.",
  "Backpacker Co.",
  "TrekAddicts",
  "Startup Voyage",
  "Campus Trips",
  "Roamers",
  "Globetrotters",
  "Voyager Union",
  "TripMates",
  "Rover Collective",
  "Nomad Hub",
];

export function TrustSection() {
  return (
    <section className="py-16 relative border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto container-px">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-8">
          Trusted by 50,000+ travelers worldwide
        </p>
        <div className="overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-16 animate-marquee w-max">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors whitespace-nowrap">
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-violet-500/30 to-cyan-400/30 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-violet-300" />
                </div>
                <span className="font-display font-semibold text-base">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ PROBLEM / SOLUTION ============ */
const PROBLEMS = [
  { icon: Receipt, title: "Lost receipts", desc: "Paper bills fade, get crumpled, and disappear halfway through the trip." },
  { icon: ArrowRightLeft, title: "Confusing splits", desc: "Spreadsheets, WhatsApp math, and endless 'who paid for what?' arguments." },
  { icon: Wallet, title: "Unclear balances", desc: "Nobody knows exactly who owes whom until it's too late." },
  { icon: LineChart, title: "Manual calculations", desc: "Currency conversions, tips, tax — every split becomes a math quiz." },
];

export function ProblemSolution() {
  return (
    <section id="features" className="section">
      <div className="max-w-7xl mx-auto container-px">
        <Reveal className="max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-violet-300/80 mb-4">The Problem</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
            Group trips are magical. <span className="text-gradient">Splitting the bills?</span> Definitely not.
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-2xl">
            Every group traveler has felt the friction. Lost receipts, awkward IOUs, late-night spreadsheet battles, and friendships tested over lunch bills.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 h-full card-hover relative overflow-hidden group">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-fuchsia-500/10 blur-3xl group-hover:bg-fuchsia-500/20 transition-colors"></div>
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-fuchsia-300">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Solution highlight card */}
        <Reveal delay={0.2} className="mt-20">
          <div className="relative rounded-[32px] overflow-hidden glass-strong p-10 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-400/20"></div>
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/30 blur-[120px]"></div>
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[120px]"></div>
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-200 mb-6">
                  <Sparkles className="w-3.5 h-3.5" /> The Solution
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight">
                  One app. <span className="text-gradient">Zero friction.</span>
                </h3>
                <p className="mt-5 text-white/70 text-lg leading-relaxed">
                  YatraPay turns messy group finance into a beautiful real-time dashboard. AI scans your receipts, smart splits do the math, and settlement optimization suggests the minimum transactions to settle everyone up.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  {["AI OCR scanning", "Real-time sync", "10+ currencies", "PDF reports"].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-white/80">
                      <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300">
                        <Check className="w-3 h-3" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              {/* Mock UI */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-cyan-400/30 rounded-3xl blur-2xl"></div>
                <div className="relative glass rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs text-white/50">Goa Trip 2026</p>
                      <p className="font-display font-bold text-xl">₹84,520 total</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/50">You owe</p>
                      <p className="font-display font-bold text-lg text-fuchsia-300">₹3,240</p>
                    </div>
                  </div>
                  {[
                    { name: "Beach Resort Stay", amt: "₹24,000", by: "Arjun", cat: "Stay", color: "from-violet-500 to-fuchsia-500" },
                    { name: "Dinner at Fisherman's", amt: "₹6,820", by: "Riya", cat: "Food", color: "from-amber-400 to-pink-500" },
                    { name: "Water Sports", amt: "₹12,400", by: "Kabir", cat: "Activity", color: "from-cyan-400 to-blue-500" },
                    { name: "Taxi — Airport", amt: "₹3,200", by: "You", cat: "Transport", color: "from-emerald-400 to-teal-500" },
                  ].map((e) => (
                    <div key={e.name} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                        {e.cat[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{e.name}</p>
                        <p className="text-xs text-white/50">by {e.by} · 4 people</p>
                      </div>
                      <p className="font-display font-semibold text-sm">{e.amt}</p>
                    </div>
                  ))}
                  <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
                    <p className="text-xs text-white/50 mb-1">Smart Settlement</p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {["A", "R", "K", "S"].map((c, i) => (
                          <div key={i} className={`w-7 h-7 rounded-full border-2 border-[#0b0f2a] flex items-center justify-center text-[11px] font-bold ${"bg-gradient-to-br from-fuchsia-500 to-violet-500"}`}>
                            {c}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-emerald-300">3 transactions · saves ₹420 in fees</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FEATURES GRID ============ */
const FEATURES = [
  { icon: Plane, title: "Smart Trip Creation", desc: "Set up a trip in seconds — add destinations, dates, budget, and theme.", color: "from-violet-500 to-fuchsia-500" },
  { icon: Users, title: "Member Invitations", desc: "Invite friends via link, QR, email or SMS. No account required to join.", color: "from-pink-500 to-rose-500" },
  { icon: ScanLine, title: "OCR Receipt Scanner", desc: "Snap a photo — AI extracts amounts, items, currency and merchant.", color: "from-cyan-400 to-sky-500" },
  { icon: LineChart, title: "Real-Time Tracking", desc: "Every expense syncs instantly across every member's device.", color: "from-emerald-400 to-teal-500" },
  { icon: ArrowRightLeft, title: "Flexible Splitting", desc: "Equal, exact, percentage, or itemized splits — as complex as you need.", color: "from-amber-400 to-orange-500" },
  { icon: Zap, title: "Settlement Optimization", desc: "Minimize transactions using smart graph algorithms.", color: "from-indigo-400 to-violet-500" },
  { icon: Wallet, title: "Budget Monitoring", desc: "Set per-trip and per-category budgets with live progress bars.", color: "from-fuchsia-500 to-pink-500" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Beautiful charts, trends, and category breakdowns at a glance.", color: "from-blue-400 to-indigo-500" },
  { icon: Globe2, title: "Multi-Currency", desc: "Spend in any currency. Rates update automatically. Zero math needed.", color: "from-teal-400 to-cyan-500" },
  { icon: FileText, title: "PDF Reports", desc: "Export polished trip summaries with itemized bills and balances.", color: "from-rose-400 to-red-500" },
];

export function FeaturesGrid() {
  return (
    <section className="section relative">
      <div className="max-w-7xl mx-auto container-px">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">Core Features</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Everything you need to <span className="text-gradient">travel light</span>.
            </h2>
            <p className="mt-6 text-lg text-white/60">
              Ten powerful features working together — so you can stop tracking money and start making memories.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 5) * 0.08} className={`${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
              <div className={`glass rounded-2xl p-6 card-hover h-full relative overflow-hidden group ${i === 0 ? "p-10" : ""}`}>
                <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity`}></div>
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg ${i === 0 ? "w-16 h-16" : ""}`}>
                  <f.icon className={`w-5 h-5 text-white ${i === 0 ? "w-7 h-7" : ""}`} />
                </div>
                <h3 className={`font-display font-semibold mb-2 ${i === 0 ? "text-2xl mb-4" : "text-lg"}`}>{f.title}</h3>
                <p className={`text-white/60 ${i === 0 ? "text-base leading-relaxed" : "text-sm leading-relaxed"}`}>{f.desc}</p>
                {i === 0 && (
                  <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs text-white/50 mb-3">Live trip</p>
                    <p className="font-display font-bold text-2xl">Bali 2026</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-white/60">Budget</span>
                      <span className="font-medium">₹150,000</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500" initial={{ width: 0 }} whileInView={{ width: "62%" }} transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }}></motion.div>
                    </div>
                    <p className="text-xs text-white/50 mt-2">₹93,240 used · 4 members</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ HOW IT WORKS ============ */
const STEPS = [
  { n: "01", title: "Create Trip", desc: "Name your adventure, pick dates, and set a vibe.", icon: Plane, color: "from-violet-500 to-fuchsia-500" },
  { n: "02", title: "Invite Members", desc: "Share a link — anyone with the link joins instantly.", icon: Users, color: "from-pink-500 to-rose-500" },
  { n: "03", title: "Add Expenses", desc: "Type, paste, or scan a receipt. YatraPay does the rest.", icon: ScanLine, color: "from-cyan-400 to-sky-500" },
  { n: "04", title: "Track Balances", desc: "Live, always-correct balances for everyone in the group.", icon: LineChart, color: "from-emerald-400 to-teal-500" },
  { n: "05", title: "Settle Instantly", desc: "One-tap suggestions for who pays whom. Done.", icon: CheckCircle2, color: "from-amber-400 to-orange-500" },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="max-w-7xl mx-auto container-px">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal className="max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">How it works</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              From booking to <span className="text-gradient">settled</span> in five steps.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 md:text-right md:max-w-sm">
              Designed to be so intuitive that your most tech-agnostic friend can use it without explanation.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* connecting line */}
          <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block"></div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="relative flex flex-col items-start">
                  <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} p-[2px] mb-6 shadow-lg shadow-black/30`}>
                    <div className="w-full h-full rounded-2xl bg-[#05060f] flex items-center justify-center">
                      <s.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-white/40 mb-2">{s.n}</span>
                  <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ PRODUCT SHOWCASE ============ */
export function ProductShowcase() {
  return (
    <section className="section relative">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto container-px relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-emerald-300/80 mb-4">Product Showcase</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Beautiful on every <span className="text-gradient">device</span>.
            </h2>
          </Reveal>
        </div>

        {/* Floating device cluster */}
        <div className="relative h-[720px] md:h-[620px] max-w-6xl mx-auto">
          {/* Center desktop */}
          <Reveal>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-[70%]">
              <div className="glass rounded-3xl p-2 shadow-2xl shadow-violet-500/20 animate-float-slow">
                <div className="flex items-center gap-1.5 px-4 py-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60"></div>
                  <div className="ml-4 flex-1 text-center text-xs text-white/40">yatrapay.app / trip / goa-2026</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-[#0a0e25] to-[#0d0617] aspect-[16/9] p-6 md:p-10 relative overflow-hidden">
                  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-500/30 blur-3xl"></div>
                  <div className="relative h-full flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-xs text-white/50">Goa · 7 days · 4 friends</p>
                        <h4 className="font-display font-bold text-2xl md:text-4xl">₹84,520</h4>
                      </div>
                      <div className="hidden sm:flex gap-2">
                        {["Food", "Stay", "Activity", "Transport"].map((c) => (
                          <div key={c} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">{c}</div>
                        ))}
                      </div>
                    </div>
                    {/* Chart bars */}
                    <div className="flex-1 flex items-end gap-3 md:gap-5 mb-6">
                      {[60, 85, 40, 92, 55, 72, 48].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-500/80 to-fuchsia-400/80 shadow-lg shadow-violet-500/30"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                          viewport={{ once: true }}
                        ></motion.div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/10">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile 1 */}
          <Reveal delay={0.2}>
            <div className="absolute left-[5%] top-[10%] w-[38%] md:w-[18%] animate-float">
              <div className="relative rounded-[2rem] p-2 glass shadow-2xl">
                <div className="rounded-[1.6rem] bg-gradient-to-b from-[#0a0e25] to-[#0d0617] aspect-[9/19] p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-b-xl"></div>
                  <div className="pt-6">
                    <p className="text-[10px] text-white/50">Today</p>
                    <p className="font-display font-bold text-sm">Scan receipt</p>
                    <div className="mt-4 aspect-square rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-400/30 border border-white/10 flex flex-col items-center justify-center relative">
                      <ScanLine className="w-10 h-10 text-violet-300 mb-2" />
                      <p className="text-[10px] text-white/70">Align receipt</p>
                      <div className="absolute inset-x-4 top-1/2 h-0.5 bg-fuchsia-400 shadow shadow-fuchsia-400/60"></div>
                    </div>
                    <div className="mt-4 space-y-2 text-[10px]">
                      <div className="flex justify-between"><span className="text-white/50">Amount</span><span>₹2,450</span></div>
                      <div className="flex justify-between"><span className="text-white/50">Items</span><span>6 detected</span></div>
                      <div className="flex justify-between"><span className="text-white/50">Confidence</span><span className="text-emerald-300">99.2%</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile 2 */}
          <Reveal delay={0.4}>
            <div className="absolute right-[5%] bottom-[8%] w-[38%] md:w-[18%] animate-float-delayed">
              <div className="relative rounded-[2rem] p-2 glass shadow-2xl">
                <div className="rounded-[1.6rem] bg-gradient-to-b from-[#0a0e25] to-[#0d0617] aspect-[9/19] p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-b-xl"></div>
                  <div className="pt-6">
                    <p className="text-[10px] text-white/50">Balances</p>
                    <p className="font-display font-bold text-sm">Settle up</p>
                    <div className="mt-4 space-y-2">
                      {[
                        { name: "Arjun", amt: "+₹4,200", color: "from-violet-500 to-fuchsia-500" },
                        { name: "Riya", amt: "−₹1,800", color: "from-cyan-400 to-sky-500" },
                        { name: "Kabir", amt: "−₹2,400", color: "from-amber-400 to-pink-500" },
                      ].map((p) => (
                        <div key={p.name} className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.color}`}></div>
                          <div className="flex-1">
                            <p className="text-[10px] font-medium">{p.name}</p>
                            <p className="text-[9px] text-white/50">4 expenses</p>
                          </div>
                          <p className="text-[10px] font-bold">{p.amt}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/20">
                      <p className="text-[9px] text-emerald-200/80">Smart suggestion</p>
                      <p className="text-[11px] font-bold mt-1">2 transactions to settle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ AI SECTION ============ */
export function AISection() {
  const AI_FEATURES = [
    { icon: Brain, title: "Smart Categorization", desc: "Auto-tags meals, stays, transport and activities." },
    { icon: TrendingUp, title: "Budget Prediction", desc: "Forecasts your trip end-cost based on early spending." },
    { icon: PieChart, title: "Spending Insights", desc: "Natural-language summaries of where your money goes." },
    { icon: Sparkles, title: "Recommendations", desc: "Cheaper alternatives for restaurants, stays and routes." },
  ];

  return (
    <section id="ai" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60"></div>
      <div className="max-w-7xl mx-auto container-px relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-fuchsia-300/80 mb-4">AI Intelligence</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              An AI co-pilot for <span className="text-gradient-pink">every trip</span>.
            </h2>
            <p className="mt-6 text-white/60 text-lg leading-relaxed">
              YatraPay's neural models scan your receipts in milliseconds, predict end-of-trip budgets, and surface insights no spreadsheet ever could.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_FEATURES.map((f) => (
                <div key={f.title} className="glass rounded-2xl p-5 card-hover">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-500/20">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-display font-semibold text-base mb-1.5">{f.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* AI visual */}
          <Reveal delay={0.2}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/30 via-violet-500/20 to-cyan-400/30 blur-3xl"></div>
              {/* Orbiting rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[85%] h-[85%]">
                  <div className="absolute inset-0 rounded-full border border-violet-400/30 animate-spin-slow"></div>
                  <div className="absolute inset-6 rounded-full border border-fuchsia-400/30 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "22s" }}></div>
                  <div className="absolute inset-16 rounded-full border border-cyan-400/30 animate-spin-slow" style={{ animationDuration: "45s" }}></div>
                  {/* orbit dots */}
                  {["Food", "Stay", "Travel", "Fun", "Taxi"].map((label, i) => {
                    const angle = (i / 5) * Math.PI * 2;
                    const r = 48;
                    const x = 50 + r * Math.cos(angle) * 0.95;
                    const y = 50 + r * Math.sin(angle) * 0.95;
                    return (
                      <div
                        key={label}
                        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        <div className="w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50 animate-pulse-glow"></div>
                        <span className="text-[10px] text-white/60 mt-2">{label}</span>
                      </div>
                    );
                  })}
                  {/* center orb */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 shadow-2xl shadow-fuchsia-500/40 flex items-center justify-center">
                    <div className="absolute inset-2 rounded-full bg-[#05060f] flex flex-col items-center justify-center text-center px-4">
                      <Brain className="w-10 h-10 text-fuchsia-300 mb-2" />
                      <p className="font-display font-bold text-lg text-gradient-pink">Yatra AI</p>
                      <p className="text-[10px] text-white/50 mt-1">99.9% accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ LIVE ANALYTICS ============ */
const CATEGORIES = [
  { name: "Stay", val: 42, color: "#a855f7" },
  { name: "Food", val: 24, color: "#ec4899" },
  { name: "Activity", val: 18, color: "#22d3ee" },
  { name: "Transport", val: 11, color: "#f59e0b" },
  { name: "Other", val: 5, color: "#10b981" },
];

function Counter({ to, suffix = "", duration = 2, prefix = "" }: { to: number; suffix?: string; duration?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null!);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startT = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - startT) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(start + (to - start) * eased));
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

export function Analytics() {
  // Donut chart
  const total = CATEGORIES.reduce((a, b) => a + b.val, 0);
  let offset = 0;
  const segments = CATEGORIES.map((c) => {
    const frac = c.val / total;
    const dash = frac * 283;
    const seg = { ...c, dash, offset, frac };
    offset += dash;
    return seg;
  });

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto container-px">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">Live Analytics</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Know your numbers at <span className="text-gradient">a glance</span>.
            </h2>
          </Reveal>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total spent", val: 84520, prefix: "₹", color: "text-violet-300" },
            { label: "Expenses logged", val: 142, suffix: "+", color: "text-fuchsia-300" },
            { label: "Avg. per day", val: 12074, prefix: "₹", color: "text-cyan-300" },
            { label: "Saved in fees", val: 4200, prefix: "₹", color: "text-emerald-300" },
          ].map((k, i) => (
            <Reveal key={k.label} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6">
                <p className="text-xs text-white/50 uppercase tracking-wider">{k.label}</p>
                <p className={`font-display font-bold text-3xl md:text-4xl mt-3 ${k.color}`}>
                  <Counter to={k.val} prefix={k.prefix} suffix={k.suffix} />
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Donut */}
          <Reveal>
            <div className="glass rounded-3xl p-8 lg:col-span-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-white/50">Category breakdown</p>
                  <h4 className="font-display font-bold text-xl">Where it went</h4>
                </div>
                <Sparkles className="w-5 h-5 text-fuchsia-300" />
              </div>
              <div className="relative w-52 h-52 mx-auto my-6">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  {segments.map((s) => (
                    <motion.circle
                      key={s.name}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="8"
                      strokeDasharray={`${s.dash} ${283 - s.dash}`}
                      strokeDashoffset={-s.offset}
                      strokeLinecap="round"
                      initial={{ opacity: 0, strokeDasharray: "0 283" }}
                      whileInView={{ opacity: 1, strokeDasharray: `${s.dash} ${283 - s.dash}` }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-white/50">Total</p>
                  <p className="font-display font-bold text-2xl"><Counter to={84520} prefix="₹" /></p>
                </div>
              </div>
              <div className="space-y-2">
                {CATEGORIES.map((c) => (
                  <div key={c.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }}></div>
                      <span className="text-white/70">{c.name}</span>
                    </div>
                    <span className="font-mono text-white/90">{c.val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Trend */}
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 lg:col-span-2 relative overflow-hidden">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-white/50">Spending trend</p>
                  <h4 className="font-display font-bold text-xl">Last 7 days</h4>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">Week</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg text-white/50">Month</button>
                </div>
              </div>
              {/* Area chart */}
              <div className="relative h-60">
                <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="gradA" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradB" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[60, 120, 180].map((y) => (
                    <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  ))}
                  <motion.path
                    d="M0,180 C80,160 120,100 200,120 C280,140 320,60 400,80 C460,95 520,40 600,60 L600,240 L0,240 Z"
                    fill="url(#gradA)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  />
                  <motion.path
                    d="M0,180 C80,160 120,100 200,120 C280,140 320,60 400,80 C460,95 520,40 600,60"
                    fill="none"
                    stroke="#c4b5fd"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    viewport={{ once: true }}
                  />
                  <motion.path
                    d="M0,200 C80,190 150,150 220,170 C300,190 360,140 420,150 C500,160 560,120 600,130"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                  {[[200, 120], [400, 80], [600, 60]].map(([x, y], i) => (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#a855f7"
                      stroke="#fff"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.2 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </svg>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                {[
                  { l: "Peak day", v: "Saturday", c: "text-fuchsia-300" },
                  { l: "Avg spend", v: "₹12,074", c: "text-violet-300" },
                  { l: "Budget used", v: "62%", c: "text-cyan-300" },
                ].map((x) => (
                  <div key={x.l} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-white/50">{x.l}</p>
                    <p className={`font-display font-bold ${x.c}`}>{x.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
const TESTIMONIALS = [
  { name: "Ananya & 3 friends", role: "Goa · College Trip", text: "We stopped arguing about bills after day one. YatraPay just… worked. The receipt scanner is genuinely magical.", avatar: "A", rating: 5, color: "from-violet-500 to-fuchsia-500" },
  { name: "The Sharma Family", role: "Europe · 14 days", text: "Four currencies, eight cities, seven people — we came home knowing exactly who owed what. No spreadsheets, no drama.", avatar: "S", rating: 5, color: "from-cyan-400 to-sky-500" },
  { name: "Kabir, Event Organizer", role: "Himalayan Trek · 22 people", text: "Settlement optimization paid for itself ten times over. We settled 22 people with just 6 transactions instead of 40.", avatar: "K", rating: 5, color: "from-emerald-400 to-teal-500" },
  { name: "Riya & backpackers", role: "South-East Asia", text: "Multi-currency is seamless. I paid in baht, ringgit and rupiah — YatraPay handled everything in rupees automatically.", avatar: "R", rating: 5, color: "from-amber-400 to-pink-500" },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto container-px">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-4">Loved by travelers</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Stories from the <span className="text-gradient">road</span>.
            </h2>
          </Reveal>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-[32px] glass-strong p-10 md:p-14 overflow-hidden min-h-[320px]">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl"></div>
            <Quote className="absolute top-8 left-8 w-12 h-12 text-violet-400/30" />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
                className="relative pt-12"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-display text-2xl md:text-3xl leading-snug text-white/90">
                  "{TESTIMONIALS[idx].text}"
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${TESTIMONIALS[idx].color} flex items-center justify-center font-display font-bold text-lg`}>
                    {TESTIMONIALS[idx].avatar}
                  </div>
                  <div>
                    <p className="font-display font-semibold">{TESTIMONIALS[idx].name}</p>
                    <p className="text-sm text-white/50">{TESTIMONIALS[idx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-violet-400" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ PRICING ============ */
const PLANS = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "For casual trips with friends.",
    features: ["Up to 3 trips", "5 members per trip", "Basic OCR scanning", "Email support"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    tagline: "For frequent travelers and couples.",
    features: ["Unlimited trips", "20 members per trip", "Advanced OCR + AI insights", "PDF reports export", "Multi-currency live rates", "Priority support"],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Group",
    price: "₹499",
    period: "/month",
    tagline: "For clubs, communities and trekkers.",
    features: ["Everything in Pro", "100 members per trip", "Custom branding", "Admin + roles", "Analytics workspace", "Dedicated success rep"],
    cta: "Start Group plan",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    tagline: "For event organizers & travel companies.",
    features: ["Everything in Group", "Unlimited members", "SSO & SCIM", "Custom integrations", "On-prem deployment option", "24/7 dedicated support"],
    cta: "Talk to sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>
      <div className="max-w-7xl mx-auto container-px relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-violet-300/80 mb-4">Pricing</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
              Priced for every <span className="text-gradient">kind of trip</span>.
            </h2>
            <p className="mt-6 text-white/60 text-lg">Start free. Upgrade only when you need more. Cancel anytime.</p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`relative rounded-3xl p-8 h-full flex flex-col ${p.highlight ? "bg-gradient-to-b from-violet-600/20 to-fuchsia-600/10 border-2 border-violet-400/50 shadow-2xl shadow-violet-500/20" : "glass card-hover border border-white/5"}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/40">
                    <Sparkles className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}
                <div>
                  <h3 className="font-display font-bold text-2xl">{p.name}</h3>
                  <p className="text-sm text-white/60 mt-1">{p.tagline}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display font-bold text-5xl">{p.price}</span>
                    <span className="text-sm text-white/50">{p.period}</span>
                  </div>
                </div>
                <div className="my-6 h-px bg-white/10"></div>
                <ul className="space-y-3 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-white/80">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${p.highlight ? "bg-violet-500/30 text-violet-200" : "bg-white/5 text-emerald-300 border border-white/10"}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                    p.highlight
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/40 hover:shadow-violet-500/60"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  }`}
                >
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
const FAQS = [
  { q: "Do all members need a YatraPay account?", a: "No. You can invite anyone via a link — they can view and add expenses without creating an account. Full features unlock with free sign-up." },
  { q: "How accurate is the receipt scanner?", a: "Our OCR + AI pipeline achieves 99.9% accuracy on printed receipts and 98%+ on handwritten bills across 30+ currencies." },
  { q: "Can I use multiple currencies in one trip?", a: "Yes. YatraPay auto-converts every expense into your chosen base currency using live mid-market rates." },
  { q: "Is my data safe and private?", a: "Absolutely. All data is end-to-end encrypted in transit and at rest. We never sell your data and you can export/delete everything anytime." },
  { q: "What is 'smart settlement'?", a: "An algorithm that finds the minimum number of payments needed to settle everyone up. It turns 20 people's tangled IOUs into 3-4 clean transactions." },
  { q: "Can I export reports?", a: "Yes — beautifully designed PDF summaries, CSV exports, and shareable web links are available on all paid plans." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section">
      <div className="max-w-3xl mx-auto container-px">
        <div className="text-center mb-14">
          <Reveal>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">FAQ</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">
              Frequently <span className="text-gradient">asked</span>.
            </h2>
          </Reveal>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`glass rounded-2xl overflow-hidden transition-all ${open === i ? "border-violet-400/40" : ""}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left p-6"
                >
                  <span className="font-display font-semibold text-base md:text-lg">{f.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <div className="px-6 pb-6 -mt-2 text-white/70 leading-relaxed">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FINAL CTA ============ */
export function FinalCTA() {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto container-px">
        <Reveal>
          <div className="relative rounded-[40px] overflow-hidden p-12 md:p-20 text-center glass-strong">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-cyan-400/30"></div>
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-violet-500/30 blur-[140px]"></div>
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-violet-200 mb-6">
                <Sparkles className="w-3.5 h-3.5" /> 50,000+ travelers and counting
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] max-w-4xl mx-auto">
                Make every trip <span className="text-gradient">financially stress-free</span>.
              </h2>
              <p className="mt-6 text-white/60 text-lg max-w-2xl mx-auto">
                Create your first trip in under a minute. No credit card required. Cancel whenever.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#05060f] text-white font-semibold shadow-xl">
                  Start Your First Trip Today <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                  <Play className="w-4 h-4" /> Watch demo
                </a>
              </div>
              <div className="mt-12 flex items-center justify-center gap-2 text-xs text-white/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free forever plan · <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card · <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Mobile app", "Integrations", "Changelog"] },
    { title: "Resources", links: ["Blog", "Guides", "API docs", "Travel tips", "Community"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact", "Partners"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR", "DPA"] },
  ];
  return (
    <footer className="relative pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto container-px">
        <div className="grid md:grid-cols-6 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/40">
                <PlaneIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">YatraPay</span>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              The smart travel expense platform for modern travelers. Track, split, and settle trip expenses in real time.
            </p>
            <div className="mt-6">
              <form className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 max-w-sm">
                <input placeholder="you@travelmate.com" className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white/90 placeholder:text-white/40" />
                <button type="button" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white text-sm font-medium">
                  <Send className="w-3.5 h-3.5" /> Subscribe
                </button>
              </form>
              <p className="text-[11px] text-white/40 mt-2">Weekly travel tips. No spam. Unsubscribe anytime.</p>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">{col.title}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/70 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} YatraPay Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> All systems normal</p>
        </div>
      </div>
    </footer>
  );
}
