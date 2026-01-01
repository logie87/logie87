import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => sections.map((s) => s.id), []);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.12, 0.2] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="navWrap">
      <div className="nav">
        <button className="brand" onClick={() => go("top")} aria-label="Go to top">
          <span className="brandDot" />
          <span className="brandText">portfolio</span>
        </button>

        <div className="navLinks">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`navBtn ${active === s.id ? "active" : ""}`}
              onClick={() => go(s.id)}
            >
              {s.label}
            </button>
          ))}
          <span className="navPill" />
        </div>

        <button className="menuBtn" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          className="drawer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              className={`drawerBtn ${active === s.id ? "active" : ""}`}
              onClick={() => go(s.id)}
            >
              {s.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
