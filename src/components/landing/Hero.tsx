import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Play, Sparkles, Receipt, Wallet, MapPin, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";

export function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const tx = useTransform(sx, [-0.5, 0.5], [-20, 20]);
  const ty = useTransform(sy, [-0.5, 0.5], [-20, 20]);

  return (
    <section
      ref={containerRef}
      className="relative pt-36 pb-32 overflow-hidden bg-gradient-hero"
    >
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

      {/* Orbiting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-glow-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 mb-6 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>New: AI-powered receipt scanning</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
            Travel together.
            <br />
            <span className="text-gradient">Settle smarter.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Track shared expenses, split bills, manage budgets, and settle balances
            effortlessly — the financial command center your trips deserve.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button className="group relative bg-gradient-primary text-white px-6 py-3.5 rounded-2xl font-medium shadow-glow hover:shadow-float transition-all hover:scale-[1.03] active:scale-95 flex items-center gap-2">
              Start free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass-strong px-6 py-3.5 rounded-2xl font-medium flex items-center gap-2 hover:bg-white/10 transition">
              <Play className="w-4 h-4 fill-current" />
              Watch demo
            </button>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
            <div>
              <div className="font-display text-2xl font-bold text-foreground">12k+</div>
              <div>Trips tracked</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-2xl font-bold text-foreground">$48M</div>
              <div>Settled</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="font-display text-2xl font-bold text-foreground">4.9★</div>
              <div>User rating</div>
            </div>
          </div>
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[540px] [perspective:1400px]"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative w-full h-full"
          >
            {/* Central glass dashboard */}
            <motion.div
              style={{ x: tx, y: ty, translateZ: 60 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] glass-strong rounded-3xl p-6 shadow-float"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">Bali Trip · 6 members</div>
                  <div className="font-display text-2xl font-bold mt-1">$3,248.50</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Mini chart */}
              <div className="h-20 flex items-end gap-1.5 mb-4">
                {[40, 65, 35, 80, 55, 95, 70, 88, 60, 75, 92, 68].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.6 + i * 0.04, duration: 0.6, ease: "easeOut" }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-accent/80"
                  />
                ))}
              </div>

              <div className="space-y-2.5">
                {[
                  { name: "Dinner @ Locavore", amt: "$184.20", c: "bg-accent" },
                  { name: "Villa Stay (3n)", amt: "$1,420.00", c: "bg-primary" },
                  { name: "Scooter rental", amt: "$96.00", c: "bg-warning" },
                ].map((r, i) => (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-7 rounded-full ${r.c}`} />
                      <span>{r.name}</span>
                    </div>
                    <span className="font-medium tabular-nums">{r.amt}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating receipt card */}
            <motion.div
              style={{ x: tx, y: ty, translateZ: 120 }}
              className="absolute top-4 -left-2 w-56 glass-strong rounded-2xl p-4 shadow-float animate-float"
            >
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="w-4 h-4 text-accent" />
                <div className="text-xs text-muted-foreground">Receipt scanned</div>
              </div>
              <div className="font-display font-bold text-lg">$48.20</div>
              <div className="text-xs text-muted-foreground mt-0.5">Cafe Lune · Split 4 ways</div>
              <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ delay: 1.4, duration: 1.2 }}
                  className="h-full bg-gradient-primary"
                />
              </div>
            </motion.div>

            {/* Floating map pin card */}
            <motion.div
              style={{ x: tx, y: ty, translateZ: 100 }}
              className="absolute bottom-6 -right-4 w-60 glass-strong rounded-2xl p-4 shadow-float animate-float-slow"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div className="text-xs text-muted-foreground">Currently in</div>
              </div>
              <div className="font-display font-bold">Ubud, Bali</div>
              <div className="mt-3 flex -space-x-2">
                {["#2563EB", "#14B8A6", "#F59E0B", "#22C55E", "#EF4444"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-background"
                    style={{ background: c }}
                  />
                ))}
                <div className="w-7 h-7 rounded-full border-2 border-background bg-surface grid place-items-center text-[10px] font-medium">
                  +1
                </div>
              </div>
            </motion.div>

            {/* Floating settlement card */}
            <motion.div
              style={{ x: tx, y: ty, translateZ: 80 }}
              className="absolute top-1/3 -right-8 w-44 glass-strong rounded-2xl p-3.5 shadow-float animate-float"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success/20 grid place-items-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">You'll receive</div>
                  <div className="font-display font-bold text-success">+$214</div>
                </div>
              </div>
            </motion.div>

            {/* Background orbit ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/5 animate-orbit">
              <div className="absolute -top-2 left-1/2 w-4 h-4 rounded-full bg-accent shadow-glow-accent" />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-white/5 animate-orbit"
              style={{ animationDirection: "reverse", animationDuration: "36s" }}
            >
              <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-primary shadow-glow" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
