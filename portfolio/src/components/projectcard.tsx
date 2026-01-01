import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { Project } from "../content";
import Reveal from "./reveal/reveal";
import { ArrowUpRight } from "lucide-react";

type TechMeta = { key: string; label: string; iconText: string; iconClass: string };

const TECH: Record<string, TechMeta> = {
  c: { key: "c", label: "C", iconText: "C", iconClass: "chipIcon--c" },
  react: { key: "react", label: "React", iconText: "⚛", iconClass: "chipIcon--react" },
  typescript: { key: "typescript", label: "TypeScript", iconText: "TS", iconClass: "chipIcon--typescript" },
  node: { key: "node", label: "Node", iconText: "N", iconClass: "chipIcon--node" },
  "c#": { key: "csharp", label: "C#", iconText: "C#", iconClass: "chipIcon--csharp" },
  python: { key: "python", label: "Python", iconText: "Py", iconClass: "chipIcon--python" },
};

function techKey(tag: string) {
  const t = tag.trim().toLowerCase();
  if (t === "c") return "c";
  if (t === "react") return "react";
  if (t === "ts" || t === "typescript") return "typescript";
  if (t === "node" || t === "node.js" || t === "nodejs") return "node";
  if (t === "c#" || t === "csharp") return "c#";
  if (t === "python") return "python";
  return null;
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
            const key = techKey(t);
            const meta = key ? TECH[key] : null;

            return (
              <span key={t} className="chip">
                {meta && <span className={`chipIcon ${meta.iconClass}`}>{meta.iconText}</span>}
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
