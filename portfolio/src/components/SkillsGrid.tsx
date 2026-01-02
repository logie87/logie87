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
import Reveal from "./reveal/Reveal";

function iconFor(key: Skill["key"]) {
  switch (key) {
    case "react":
      return Atom;
    case "typescript":
      return Braces;
    case "java":
      return Coffee;
    case "c":
      return Cpu;
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
  // maps to CSS accent classes
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
  return (
    <div className="skillsGrid">
      {skills.map((s) => {
        const Icon = iconFor(s.key);
        return (
          <Reveal key={s.label}>
            <div className="skillCard">
              <div className={`skillIcon ${classFor(s.key)}`}>
                <Icon size={18} />
              </div>
              <div className="skillText">
                <div className="skillLabel">{s.label}</div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
