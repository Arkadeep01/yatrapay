import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Plane } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1180px,calc(100%-2rem))]"
    >
      <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between shadow-elevated">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Plane className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            <div className="absolute inset-0 rounded-xl bg-gradient-primary blur-md opacity-50 -z-10 group-hover:opacity-80 transition" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">YatraPay</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {["Features", "How it works", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="hover:text-foreground transition-colors relative"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="hidden sm:block text-sm text-muted-foreground hover:text-foreground transition px-3 py-2">
            Sign in
          </button>
          <button className="relative bg-gradient-primary text-white text-sm font-medium px-4 py-2 rounded-xl shadow-glow hover:shadow-glow-accent transition-all hover:scale-[1.03] active:scale-95">
            Start free
          </button>
        </div>
      </div>
    </motion.header>
  );
}
