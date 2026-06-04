import { Plane } from "lucide-react";

export function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Resources", links: ["Docs", "Help center", "Community", "Status"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];
  return (
    <footer className="relative px-6 py-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-6 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Plane className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg">YatraPay</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            The financial command center for groups that travel together.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="font-display font-semibold text-sm mb-4">{c.title}</div>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-border/50 flex flex-wrap justify-between gap-4 text-xs text-muted-foreground">
        <div>© 2026 YatraPay, Inc. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          All systems operational
        </div>
      </div>
    </footer>
  );
}
