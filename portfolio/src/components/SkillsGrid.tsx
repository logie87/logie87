import type { Skill } from "../content";
import {
  Braces,
  Atom,
  Coffee,
  Cpu,
  GitBranch,
  Workflow,
  Cloud,
  Package,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SkillStack from "./SkillStack";

function iconFor(key: Skill["key"]) {
  switch (key) {
    case "react":
      return Atom;
    case "typescript":
      return Braces;
    case "java":
      return Coffee;
    case "c":
    case "cpp":
      return Cpu;
    case "git":
      return GitBranch;
    case "cicd":
      return Workflow;
    case "azure":
      return Cloud;
    case "jfrog":
      return Package;
    default:
      return Braces;
  }
}

function classFor(key: Skill["key"]) {
  switch (key) {
    case "typescript":
    case "react":
      return "skillIcon--blue";
    case "java":
      return "skillIcon--amber";
    case "c":
    case "cpp":
      return "skillIcon--cyan";
    case "git":
    case "cicd":
      return "skillIcon--green";
    case "azure":
      return "skillIcon--sky";
    case "jfrog":
      return "skillIcon--purple";
    default:
      return "skillIcon--blue";
  }
}

export default function SkillsGrid({ skills }: { skills: Skill[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      // Always ends visible; no chance of "stuck hidden on refresh"
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
      style={{ willChange: "opacity, transform" }}
    >
      <div className="skillsGrid">
        {skills.map((s) => {
          const Icon = iconFor(s.key);
          return (
            <div key={`${s.key}-${s.label}`} className="skillCard skillCard--stack">
              <SkillStack
                label={s.label}
                icon={<Icon size={18} />}
                accentClass={classFor(s.key)}
                items={(s as any).highlights ?? []}
              />
              <div className="skillText">
                <div className="skillLabel">{s.label}</div>

                {s.tagline ? (
                  <div className="skillHint muted">{s.tagline}</div>
                ) : (s as any).highlights?.length ? (
                  <div className="skillHint muted">Click the icon</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
