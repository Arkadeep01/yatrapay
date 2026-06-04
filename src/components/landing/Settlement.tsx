import { motion } from "motion/react";

const members = [
  { name: "Aanya", color: "#2563EB", x: 50, y: 10 },
  { name: "Ravi", color: "#14B8A6", x: 92, y: 38 },
  { name: "Mira", color: "#F59E0B", x: 78, y: 88 },
  { name: "Kai", color: "#22C55E", x: 22, y: 88 },
  { name: "Leo", color: "#EF4444", x: 8, y: 38 },
];

const flows: [number, number, string][] = [
  [0, 2, "$120"],
  [1, 4, "$84"],
  [3, 0, "$56"],
];

export function Settlement() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 mb-5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Settlement engine
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            21 debts.
            <br />
            <span className="text-gradient">3 payments.</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed max-w-md">
            Our graph optimizer collapses dozens of IOUs into the minimum possible
            transactions — so nobody has to play accountant at the end of the trip.
          </p>

          <div className="mt-8 space-y-3">
            {[
              ["Naive splits", "21 payments", "text-danger"],
              ["Pairwise netting", "8 payments", "text-warning"],
              ["YatraPay engine", "3 payments", "text-success"],
            ].map(([label, val, c]) => (
              <div key={label} className="flex items-center justify-between glass rounded-2xl px-4 py-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className={`font-display font-semibold ${c}`}>{val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Network visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative aspect-square glass-strong rounded-3xl p-6 shadow-elevated"
        >
          <div className="absolute inset-6 grid-pattern opacity-30 rounded-2xl" />
          <svg viewBox="0 0 100 100" className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)]">
            <defs>
              <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
            {flows.map(([a, b], i) => {
              const A = members[a], B = members[b];
              return (
                <g key={i}>
                  <motion.line
                    x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="url(#flow)"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.7 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.4 + i * 0.2 }}
                  />
                  <motion.circle
                    r="0.9"
                    fill="#14B8A6"
                    initial={{ cx: A.x, cy: A.y }}
                    animate={{ cx: [A.x, B.x], cy: [A.y, B.y] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </svg>

          {members.map((m) => (
            <div
              key={m.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
              style={{ left: `calc(${m.x}% * (100% - 3rem) / 100% + 1.5rem)`, top: `calc(${m.y}% * (100% - 3rem) / 100% + 1.5rem)` }}
            >
              <div
                className="w-12 h-12 rounded-2xl grid place-items-center font-display font-bold text-white shadow-float animate-float"
                style={{ background: m.color, boxShadow: `0 0 30px ${m.color}80` }}
              >
                {m.name[0]}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{m.name}</span>
            </div>
          ))}

          {flows.map(([, , amt], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.2 }}
              className="absolute glass-strong rounded-full px-2.5 py-1 text-[10px] font-medium tabular-nums"
              style={{
                left: `${(members[flows[i][0]].x + members[flows[i][1]].x) / 2}%`,
                top: `${(members[flows[i][0]].y + members[flows[i][1]].y) / 2}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {amt}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
