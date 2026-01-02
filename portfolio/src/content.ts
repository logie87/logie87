export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export type Skill = {
  label: string;
  key:
    | "typescript"
    | "react"
    | "java"
    | "git"
    | "c"
    | "cpp"
    | "cicd"
    | "azure"
    | "jfrog";
};

export const content = {
  name: "Logan Hindley",
  title: "Software / Systems / Caffeine Engineer",
  location: "Edmonton, AB",
  tagline:
    "I build whatever comes to mind, usually slightly over-engineered fixes to problems as well as adding dark mode to everything.",
  links: {
    github: "https://github.com/logie87",
    linkedin: "https://www.linkedin.com/in/loganhindley/",
    email: "mailto:lhindley@ualberta.ca",
    resume: "#", // to add when you upload it
  },

  about: [
    "I like building products that feel good to use. Preferably things that solve real problems I didn't create.",
    "Currently a student + software dev + videographer. I (for some reason) enjoy mindless debugging over coffee as well as leading large projects.",
  ],

  skills: [
    { label: "TypeScript / React", key: "typescript" },
    { label: "Java", key: "java" },
    { label: "C / C++", key: "cpp" },
    { label: "Git & CI/CD", key: "cicd" },
    { label: "Microsoft Azure", key: "azure" },
    { label: "JFrog Artifactory & Pipelines", key: "jfrog" },
  ] as Skill[],

  projects: [
    {
      title: "Instructive - natHacks 2025 1st Place",
      blurb:
        "Hackathon-winning learning platform backed by research and designed to help teachers reach every student in large classrooms.",
      tags: ["React", "Python LLM w/ RAG", "Education Tech"],
      links: [
        { label: "Devpost", href: "https://devpost.com/software/instructive" },
        { label: "GitHub", href: "https://github.com/logie87/objectobject" },
      ],
    },
    {
      title: "Audio Synthesizer + Telemetry and Embedded UI Project",
      blurb:
        "A modular audio synthesizer, with live telemetry + command protocol layer with clean scheduling and debug tooling. Software in C + TypeScript. Hardware in modular PCBs.",
      tags: ["C", "PCBs", "TypeScript", "Modular Hardware", "Live Telemetry and Data Protocols"],
      links: [{ label: "See the progress!", href: "https://github.com/logie87/audiosynth" }],
    },
    {
      title: "This Portfolio",
      blurb:
        "This site. Built with Vite + TS + motion. Designed to be easy to iterate on and super animated and whatnot.",
      tags: ["Vite", "React", "Framer Motion"],
      links: [{ label: "Github", href: "https://logie87.github.io/logie87/" }],
    },
  ] as Project[],
};
