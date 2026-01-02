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
  return (
    <Reveal>
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
                {(s as any).highlights?.length ? (
                  <div className="skillHint muted">Click The Icon for More</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
