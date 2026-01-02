import { useEffect, useMemo, useRef, useState } from "react";
import type { SkillHighlight } from "../content";
import "./SkillStack.css";

type Props = {
  label: string;
  icon: React.ReactNode;
  accentClass?: string;
  items?: SkillHighlight[];
};

export default function SkillStack({
  label,
  icon,
  accentClass = "",
  items = [],
}: Props) {
  const maxItems = 3;
  const cards = useMemo(() => items.slice(0, maxItems), [items]);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // should lift card to top
  useEffect(() => {
    const root = rootRef.current;
    const card = root?.closest(".skillCard--stack");
    if (!card) return;

    if (open) card.classList.add("skillCard--open");
    else card.classList.remove("skillCard--open");

    return () => {
      card.classList.remove("skillCard--open");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onPointerDown = (e: PointerEvent) => {
      const root = rootRef.current;
      if (!root) return;

      const path = (typeof e.composedPath === "function" ? e.composedPath() : []) as EventTarget[];
      const clickedInside =
        path.length > 0 ? path.includes(root) : root.contains(e.target as Node);

      if (!clickedInside) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!open) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    el.style.setProperty("--magnet-x", `${(e.clientX - cx) * 0.1}px`);
    el.style.setProperty("--magnet-y", `${(e.clientY - cy) * 0.1}px`);
  };

  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--magnet-x", `0px`);
    el.style.setProperty("--magnet-y", `0px`);
  };

  const hasCards = cards.length > 0;

  return (
    <div ref={rootRef} className={`skillStack ${open ? "open" : ""}`}>
      <button
        type="button"
        className={`skillStackBtn skillIcon ${accentClass}`}
        aria-label={hasCards ? `${label} details` : `${label}`}
        aria-expanded={hasCards ? open : undefined}
        disabled={!hasCards}
        onClick={() => hasCards && setOpen((v) => !v)}
      >
        {icon}
      </button>

      <div className="skillStackCards" aria-hidden={!open}>
        {cards.map((item, i) => {
          const isExternal =
            /^https?:\/\//i.test(item.href) || item.href.startsWith("mailto:");

          return (
            <a
              key={`${item.href}-${i}`}
              className={`skillStackCard card-${i + 1}`}
              href={item.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer noopener" : undefined}
              onClick={() => setOpen(false)}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
            >
              <div className="skillStackCardTitle">{item.title}</div>
              <div className="skillStackCardBlurb">{item.blurb}</div>
              <div className="skillStackCardLink">{isExternal ? "Open ↗" : "View →"}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
