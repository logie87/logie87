import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { Project } from "../content";
import Reveal from "./reveal/Reveal";
import { ArrowUpRight, Sparkles, Cpu, Radio, Blocks, GraduationCap, Wrench } from "lucide-react";
import {
  SiFramer,
  SiPython,
  SiReact,
  SiTypescript,
  SiVite,
  SiNodedotjs,
} from "react-icons/si";

type TagMeta = {
  icon: React.ComponentType<{ className?: string }>;
  accent: string; // css class for color
};

function norm(tag: string) {
  return tag.trim().toLowerCase();
}

function tagMeta(tag: string): TagMeta {
  const t = norm(tag);

  // Brand / common tech
  if (t === "react") return { icon: SiReact, accent: "tagIcon--react" };
  if (t === "typescript" || t === "ts") return { icon: SiTypescript, accent: "tagIcon--typescript" };
  if (t === "vite") return { icon: SiVite, accent: "tagIcon--vite" };
  if (t === "framer motion" || t === "framer") return { icon: SiFramer, accent: "tagIcon--framer" };
  if (t.includes("python")) return { icon: SiPython, accent: "tagIcon--python" };
  if (t === "node" || t === "node.js" || t === "nodejs") return { icon: SiNodedotjs, accent: "tagIcon--node" };

  // Your custom vibe tags
  if (t === "c" || t === "c/c++" || t.includes("c++")) return { icon: Wrench, accent: "tagIcon--c" };
  if (t === "pcbs" || t === "pcb" || t.includes("pcb")) return { icon: Cpu, accent: "tagIcon--pcb" };
  if (t.includes("telemetry") || t.includes("protocol")) return { icon: Radio, accent: "tagIcon--telemetry" };
  if (t.includes("modular")) return { icon: Blocks, accent: "tagIcon--modular" };
  if (t.includes("education")) return { icon: GraduationCap, accent: "tagIcon--edu" };

  // Default for anything else (still gets an icon!)
  return { icon: Sparkles, accent: "tagIcon--default" };
}

export default function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();

  const hoverAnim = reduce ? undefined : ({ y: -4, scale: 1.01 } as const);
  const hoverTransition: Transition | undefined = reduce
    ? undefined
    : { type: "spring", stiffness: 280, damping: 22 };

  return (
    <Reveal>
      <motion.div className="projectCard" whileHover={hoverAnim} transition={hoverTransition}>
        <div className="projectTop">
          <h4 className="h4">{project.title}</h4>
          <p className="p muted">{project.blurb}</p>
        </div>

        <div className="chips">
          {project.tags.map((t) => {
            const meta = tagMeta(t);
            const Icon = meta.icon;

            return (
              <span key={t} className="chip">
                <span className={`tagIcon ${meta.accent}`}>
                  <Icon className="tagSvg" />
                </span>
                {t}
              </span>
            );
          })}
        </div>

        <div className="projectLinks">
          {project.links.map((l) => (
            <a
              key={l.href}
              className="link"
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {l.label} <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}
