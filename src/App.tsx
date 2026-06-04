import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
  Plane, Users, Receipt, TrendingUp, DollarSign, PieChart,
  Calendar, Award, ArrowRight, Check, Play, Menu
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Globe({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = React.useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12 + mousePosition.x * 0.4;
      groupRef.current.rotation.x = mousePosition.y * 0.3;
    }
  });
  const routes = React.useMemo(() => {
    const points: [number, number, number][] = [];
    for (let i = 0; i < 5; i++) {
      const lat = (Math.random() - 0.5) * 1.6;
      const lon = (Math.random() - 0.5) * 3.2;
      points.push([lon, lat, 0]);
    }
    return points;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.3]} />
        <meshPhongMaterial color="#0a0a1a" emissive="#1a1a3a" shininess={40} specular="#334455" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.48]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[0.6, 0, 0]}>
        <sphereGeometry args={[2.32]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.22} />
      </mesh>
      {routes.map((pos, i) => (
        <group key={i}>
          <mesh position={pos as [number, number, number]}>
            <sphereGeometry args={[0.08]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#22d3ee" : "#f472b6"} />
          </mesh>
        </group>
      ))}
      <Stars radius={4} depth={30} count={120} factor={1.5} saturation={0} fade speed={0.8} />
    </group>
  );
}

const testimonials = [
  { name: "Aarav Sharma", role: "Backpacker & Travel Blogger", quote: "YatraPay made our 3-week Himalayan trek effortless. No more arguing over who paid for what.", group: "Trekking Group" },
  { name: "Priya Patel", role: "College Trip Organizer", quote: "Organized a trip for 28 students. The settlement optimization saved us hours of math.", group: "University" },
  { name: "Rohan & Meera", role: "Newlyweds", quote: "Our first family vacation with parents — everyone loved how transparent the balances were.", group: "Family Trip" },
  { name: "Vikram Malhotra", role: "Event Organizer", quote: "We used it for a 200-person corporate offsite. Best expense tool we've ever used.", group: "Corporate" },
];

const plans = [
  { name: "Free", price: "0", desc: "For solo travelers & small groups", features: ["Up to 5 members", "Basic expense tracking", "AI receipt scan", "Mobile app"], color: "border-white/20" },
  { name: "Pro", price: "199", desc: "For frequent travelers", features: ["Unlimited members", "Advanced analytics", "PDF reports", "Priority support", "Multi-currency"], color: "border-[#6366f1]", popular: true },
  { name: "Group", price: "499", desc: "Perfect for families & clubs", features: ["Everything in Pro", "Team dashboards", "Budget forecasting", "Expense approvals", "API access"], color: "border-white/20" },
  { name: "Enterprise", price: "Custom", desc: "For travel communities & orgs", features: ["All Group features", "SSO & SCIM", "Dedicated success manager", "Custom integrations", "White-label"], color: "border-white/20" },
];

const analyticsData = [
  { day: 'Mon', spend: 12400 }, { day: 'Tue', spend: 9800 }, { day: 'Wed', spend: 16200 },
  { day: 'Thu', spend: 13400 }, { day: 'Fri', spend: 21500 }, { day: 'Sat', spend: 18900 },
];

const categoryData = [
  { name: 'Food', value: 35 }, { name: 'Transport', value: 28 },
  { name: 'Stay', value: 22 }, { name: 'Activities', value: 15 },
];

const faqs = [
  { q: "How does the AI receipt scanning work?", a: "Simply snap a photo of any bill. Our AI OCR instantly reads the amount, merchant, date and items with 99.9% accuracy." },
  { q: "Can I split expenses unequally?", a: "Yes. Customize splits however you want — equal, percentage-based, or custom amounts per person." },
  { q: "Is YatraPay free to use?", a: "The Free plan supports unlimited trips for up to 5 members. Paid plans unlock advanced analytics." },
  { q: "What currencies are supported?", a: "We support 150+ currencies with real-time conversion powered by live forex rates." },
  { q: "How secure is my data?", a: "Bank-level encryption, SOC 2 compliant infrastructure keep your trip data completely private." },
];

const featureList: { title: string; icon: React.ElementType }[] = [
  { title: "Smart Trip Creation", icon: Calendar },
  { title: "Member Invitations", icon: Users },
  { title: "AI Receipt Scanner", icon: Receipt },
  { title: "Real-Time Tracking", icon: TrendingUp },
  { title: "Flexible Bill Splitting", icon: DollarSign },
  { title: "Settlement Optimizer", icon: Award },
  { title: "Budget Monitoring", icon: PieChart },
  { title: "Analytics Dashboard", icon: TrendingUp },
  { title: "Multi-Currency", icon: DollarSign },
  { title: "PDF Reports", icon: Award },
];

const travelCityStyle = "absolute px-3.5 py-2 rounded-lg border border-white/15 backdrop-blur-xl bg-white/[0.04] text-[11px] tracking-wider uppercase text-white/85 flex items-center gap-2";

export default function YatraPayLanding() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [, setSelectedPlan] = useState(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050a] text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#22d3ee] flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <div className="text-[17px] font-semibold tracking-tight text-white">YatraPay</div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-white/80">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:block px-5 py-2.5 text-sm text-white/85 hover:text-white hover:bg-white/[0.06] rounded-full transition">Log in</button>
            <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hidden md:flex items-center gap-2 hover:bg-white/90 transition">
              Start Free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="md:hidden text-white/85"><Menu /></button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#6366f1] opacity-10 blur-[120px]" />
          <div className="absolute top-[15%] left-[6%] w-[300px] h-[300px] rounded-full bg-[#22d3ee] opacity-10 blur-[120px]" />
          <div className="absolute bottom-[15%] right-[5%] w-[280px] h-[280px] rounded-full bg-[#f472b6] opacity-10 blur-[120px]" />
        </div>

        <div onMouseMove={handleMouseMove} className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-16 grid md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs tracking-[2px] uppercase text-white/80 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
                Travel Intelligence Platform
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-[86px] font-semibold tracking-[-4.5px] leading-[0.92]">
              Travel Together.
              <br />
              Split Expenses
              <br />
              <span className="bg-gradient-to-r from-[#c4b5fd] via-[#818cf8] to-[#22d3ee] bg-clip-text text-transparent">Smarter.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-8 text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
              Track, split, and settle group trip expenses in real time with AI-powered receipt scanning and intelligent settlement optimization.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row gap-3.5 items-center sm:items-start">
              <button className="group relative inline-flex items-center gap-3 px-9 py-4.5 rounded-2xl bg-white text-black font-medium text-[16px] tracking-tight hover:bg-white/95 active:scale-[0.99] transition">
                Start Free
                <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 transition" />
              </button>
              <button className="inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl border border-white/15 bg-white/[0.03] text-white/90 text-[16px] font-medium tracking-tight hover:bg-white/[0.08] transition">
                <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white" fill="currentColor" />
                </span>
                Watch Demo
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {[
                ["50K+", "Travelers"],
                ["₹10M+", "Managed"],
                ["100K+", "Bills"],
                ["99.9%", "Accuracy"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <div className="text-2xl md:text-[28px] font-semibold tracking-tight">{value}</div>
                  <div className="text-xs text-white/55 mt-1 tracking-wide uppercase">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden md:block md:col-span-5 relative">
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
              <div className="relative w-[560px] h-[560px]" style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}>
                <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }} style={{ background: "transparent" }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[-8, 12, -14]} color="#6366f1" intensity={1.4} />
                  <pointLight position={[12, -10, 4]} color="#22d3ee" intensity={0.9} />
                  <Globe mousePosition={mousePos} />
                  <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Canvas>
                <div className={travelCityStyle + " top-[12%] left-[-6%]"}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" /> New York
                </div>
                <div className={travelCityStyle + " top-[6%] right-[8%]"}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6]" /> Tokyo
                </div>
                <div className={travelCityStyle + " bottom-[8%] right-[-10%]"}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" /> Dubai
                </div>
                <div className={travelCityStyle + " bottom-[18%] left-[-6%]"}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" /> Sydney
                </div>
              </div>
              <div className="absolute bottom-[12%] left-[2%]">
                <div className="rounded-2xl border border-white/10 bg-[#0c0c1a]/80 backdrop-blur-xl p-4 w-[230px]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-white/55 uppercase tracking-wider">Goa Trip</div>
                      <div className="text-xl font-semibold tracking-tight">₹ 1,84,240</div>
                    </div>
                    <div className="rounded-xl bg-[#22d3ee]/10 p-2.5">
                      <DollarSign className="w-[18px] h-[18px] text-[#22d3ee]" />
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#6366f1] to-[#22d3ee]" />
                  </div>
                  <div className="mt-2 text-xs text-white/50">12 expenses • 8 members</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#05050a]" />
      </section>

      <section className="border-y border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-10">
          <div className="text-center text-[11px] tracking-[4px] text-white/50 uppercase mb-5">Trusted by leading travel communities worldwide</div>
          <div className="overflow-hidden">
            <div className="flex gap-x-16 text-[15px] font-semibold text-white/60 whitespace-nowrap marquee">
              {Array(2).fill(0).flatMap((_, i) => (
                <React.Fragment key={i}>
                  <span>INDIA HIKING CLUB</span>
                  <span className="opacity-40">/</span>
                  <span>DU TRAVEL SOCIETY</span>
                  <span className="opacity-40">/</span>
                  <span>BACKPACKERS INDIA</span>
                  <span className="opacity-40">/</span>
                  <span>GOA ADVENTURE CREW</span>
                  <span className="opacity-40">/</span>
                  <span>IIT DELHI EXPLORE</span>
                  <span className="opacity-40">/</span>
                  <span>THE WANDERERS</span>
                  <span className="opacity-40">/</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center mb-14">
          <div className="inline-block text-xs tracking-[4px] text-[#22d3ee] uppercase mb-3">The problem</div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-tight">Group travel is financial chaos.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { n: "01", t: "Confusing bill splitting", d: "Who paid for what? Everyone forgets." },
            { n: "02", t: "Lost receipts", d: "Paper bills disappear in pockets and emails." },
            { n: "03", t: "Unclear balances", d: "Endless WhatsApp spreadsheets and guilt." },
            { n: "04", t: "Manual math", d: "Hours spent settling up after the trip." },
          ].map((p) => (
            <div key={p.n} className="rounded-3xl border border-white/10 p-8 hover:border-white/20 transition hover:bg-white/[0.03]">
              <div className="flex items-start gap-5">
                <div className="text-[28px] font-mono text-white/20">{p.n}</div>
                <div>
                  <div className="font-medium text-xl">{p.t}</div>
                  <div className="text-white/60 mt-1.5">{p.d}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-[32px] border border-white/10 p-12 md:p-16 text-center bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="text-xs tracking-[4px] text-[#a855f7] uppercase mb-3">The Solution</div>
          <div className="text-3xl md:text-5xl font-semibold tracking-tighter">YatraPay turns chaos into clarity.</div>
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="text-xs tracking-[4px] text-[#a855f7] uppercase mb-3">Core Features</div>
            <h3 className="text-4xl md:text-6xl font-semibold tracking-tighter">Everything you need for seamless group trips.</h3>
          </div>
          <div className="text-white/60 max-w-sm">From planning to settlement, every part of the travel finance stack, beautifully designed.</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {featureList.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="group rounded-2xl border border-white/10 p-7 hover:bg-white/[0.04] hover:border-white/20 transition-all hover:-translate-y-0.5 duration-300">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] w-11 h-11 flex items-center justify-center mb-6 group-hover:bg-[#22d3ee]/10 transition">
                  <Icon className="w-5 h-5 text-[#22d3ee]" />
                </div>
                <div className="font-medium tracking-tight text-lg">{f.title}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="how" className="bg-[#080812] border-y border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[4px] text-[#22d3ee] uppercase mb-3">How it works</div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">5 steps to a stress-free trip.</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-3">
            {["Create Trip", "Invite Members", "Add Expenses", "Track Balances", "Settle Instantly"].map((step, index) => (
              <div key={index} onClick={() => setActiveStep(index)} className={`cursor-pointer rounded-3xl p-7 text-left transition-all border ${activeStep === index ? "border-[#6366f1] bg-[#6366f1]/[0.06]" : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]"}`}>
                <div className="text-xs font-mono text-white/40 mb-10">STEP 0{index + 1}</div>
                <div className="font-semibold tracking-tight text-2xl">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[4px] text-[#f472b6] uppercase mb-3">Beautiful Experience</div>
          <h3 className="text-4xl md:text-6xl font-semibold tracking-tighter">Designed for real trips.</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {["Trip Dashboard", "Expense Screen", "Settlement View", "Analytics", "Mobile App", "Receipt Scanner"].map((name, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-white/[0.02] h-72 hover:bg-white/[0.05] hover:border-white/20 transition flex flex-col justify-end p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50" />
              <div className="absolute top-8 left-8 rounded-full border border-white/15 px-4 py-1.5 text-[11px] tracking-wider text-white/70 uppercase">0{idx + 1}</div>
              <div className="relative">
                <div className="text-2xl font-semibold tracking-tight">{name}</div>
                <div className="text-white/60 mt-1.5">Fully interactive preview</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="rounded-[36px] border border-white/10 p-10 md:p-16 bg-gradient-to-br from-white/[0.04] to-transparent">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-[4px] text-[#22d3ee] uppercase mb-3">Powered by AI</div>
              <div className="text-4xl md:text-5xl font-semibold tracking-tighter">Intelligent travel finance.</div>
              <p className="text-white/60 mt-6 text-lg leading-relaxed">From OCR-powered receipt scanning to intelligent settlement, YatraPay AI turns complex travel finance into effortless beauty.</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {["OCR Bill Scanning", "Smart Categorization", "Budget Prediction", "Spending Insights", "Smart Recommendations"].map((feature, i) => (
                <div key={i} className="rounded-2xl border border-white/10 p-5 flex items-center gap-4 hover:bg-white/[0.04] transition">
                  <div className="text-2xl font-mono text-white/30">0{i + 1}</div>
                  <div className="text-xl font-medium tracking-tight">{feature}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs tracking-[4px] text-[#6366f1] uppercase mb-3">Live Analytics</div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">Live trip analytics.<br />Instant insights.</h2>
            <p className="text-white/60 mt-6 text-lg max-w-md leading-relaxed">See exactly where money is going in real time with beautiful, interactive visualizations.</p>
          </div>
          <div className="rounded-3xl border border-white/10 p-8 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-white/60 text-sm">Spending this week</div>
                <div className="text-3xl font-semibold tracking-tight mt-1">₹ 92,200</div>
              </div>
              <div className="text-[#22d3ee] text-sm">+24% ↑</div>
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="2 2" stroke="#1a1a2a" />
                  <XAxis dataKey="day" stroke="#555" />
                  <YAxis stroke="#555" />
                  <Tooltip contentStyle={{ background: "#0a0a1a", border: "1px solid #222", borderRadius: "12px", color: "#fff" }} />
                  <Line type="natural" dataKey="spend" stroke="#6366f1" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-4 gap-2">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xl font-semibold tracking-tight" style={{ color: ["#6366f1", "#22d3ee", "#a855f7", "#f472b6"][idx] }}>{cat.value}%</div>
                  <div className="text-[11px] text-white/50 mt-1 tracking-wide uppercase">{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black/40 border-y border-white/10 py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="text-xs tracking-[4px] text-[#a855f7] uppercase mb-10">Loved by travelers</div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <div className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.2]">
                "{testimonials[activeTestimonial].quote}"
              </div>
              <div className="mt-14">
                <div className="text-[#22d3ee] text-xs tracking-[4px] uppercase">{testimonials[activeTestimonial].group}</div>
                <div className="text-lg mt-2 font-medium">{testimonials[activeTestimonial].name}</div>
                <div className="text-white/50 text-sm">{testimonials[activeTestimonial].role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-12 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <div key={i} onClick={() => setActiveTestimonial(i)} className={`w-1.5 h-1.5 rounded-full transition ${activeTestimonial === i ? "bg-white w-6" : "bg-white/25"} cursor-pointer`} />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[4px] text-[#a855f7] uppercase mb-3">Pricing</div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">Simple, transparent pricing.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <div key={i} onClick={() => setSelectedPlan(i)} className={`relative rounded-3xl border p-8 cursor-pointer transition-all hover:-translate-y-0.5 ${plan.popular ? "border-[#6366f1] bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-8">
                  <span className="px-3 py-1 text-[10px] tracking-[3px] uppercase bg-white text-black font-semibold rounded-full">Most Popular</span>
                </div>
              )}
              <div className="font-semibold tracking-tight text-2xl">{plan.name}</div>
              <div className="mt-8 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tighter">₹{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-white/50 text-lg">/mo</span>}
              </div>
              <div className="text-sm text-white/60 mt-2">{plan.desc}</div>
              <ul className="mt-8 space-y-3 text-[15px]">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 text-[#22d3ee]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-10 w-full py-3.5 rounded-2xl text-[15px] font-medium tracking-tight transition ${plan.popular ? "bg-white text-black hover:bg-white/90" : "border border-white/15 hover:bg-white/[0.06]"}`}>Choose {plan.name}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="max-w-4xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[4px] text-[#22d3ee] uppercase mb-3">FAQ</div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">Frequently asked questions.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
              <div className="flex justify-between items-center px-8 py-7 cursor-pointer">
                <span className="text-lg font-medium">{faq.q}</span>
                <div className="text-white/40 text-2xl font-light">{openFaq === index ? "−" : "+"}</div>
              </div>
              <div className={`accordion-content ${openFaq === index ? "open" : ""}`}>
                <div className="px-8 pb-8 text-white/60">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-24 text-center border-t border-white/10">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95]">
          Make Every Trip
          <br />
          <span className="bg-gradient-to-r from-[#c4b5fd] via-[#818cf8] to-[#22d3ee] bg-clip-text text-transparent">Financially Stress-Free</span>
        </h2>
        <button className="mt-12 px-14 py-5 rounded-2xl bg-white text-black font-medium text-lg tracking-tight hover:bg-white/90 active:scale-[0.99] transition inline-flex items-center gap-3">
          Start Your First Trip Today
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="mt-5 text-white/40 text-sm">No credit card required · Cancel anytime</div>
      </section>

      <footer className="border-t border-white/10 pt-16 pb-10 text-sm text-white/50 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-5 text-white">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#6366f1] via-[#a855f7] to-[#22d3ee] flex items-center justify-center">
                <Plane className="w-5 h-5" />
              </div>
              <span className="font-semibold text-lg tracking-tight">YatraPay</span>
            </div>
            <p className="leading-relaxed text-white/50 max-w-sm">Travel smart. Split smarter. The modern way for friends, families, and communities to travel together without the financial hassle.</p>
          </div>
          <div>
            <div className="text-white font-medium mb-4">Product</div>
            <div className="space-y-2"><div>Features</div><div>Integrations</div><div>API</div><div>Changelog</div></div>
          </div>
          <div>
            <div className="text-white font-medium mb-4">Resources</div>
            <div className="space-y-2"><div>Blog</div><div>Help Center</div><div>Community</div><div>Support</div></div>
          </div>
          <div>
            <div className="text-white font-medium mb-4">Company</div>
            <div className="space-y-2"><div>About</div><div>Careers</div><div>Press</div><div>Partners</div></div>
          </div>
          <div className="md:col-span-3">
            <div className="text-white font-medium mb-4">Stay updated</div>
            <div className="flex border border-white/15 rounded-full overflow-hidden">
              <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-white/40 focus:outline-none" />
              <button className="px-5 bg-white text-black font-medium text-sm hover:bg-white/90 transition">→</button>
            </div>
          </div>
        </div>
        <div className="text-center text-white/40 text-xs tracking-[3px] uppercase mt-16">© {new Date().getFullYear()} Yatra Technologies · Made with care for travelers</div>
      </footer>
    </div>
  );
}
