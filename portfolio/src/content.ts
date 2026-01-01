export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const content = {
  name: "Logan Hindley",
  title: "Software / Systems / Caffeine Engineer",
  location: "Edmonton, AB",
  tagline:
    "I build whatever comes to mind, usually slightly over-engineered fixes to problems — with an obsession for UX dark mode variants.",
  links: {
    github: "https://github.com/logie87",
    linkedin: "https://www.linkedin.com/in/loganhindley/",
    email: "mailto:lhindley@ualberta.cca",
    resume: "#", // to add when i upload it
  },

  about: [
    "I like building products that feel good to use. Preferably things that solve real problems I didn't create.",
    "Currently: student + software dev + videographer. I (for some reason) enjoy mindless debugging over coffee as well as leading large projects.",
  ],

  skills: [
    "TypeScript / React",
    "Java",
    "C / C++",
    "Git & CI/CD",
    "Microsoft Azure",
    "JFrog Artifactory & Pipelines",
  ],

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
        "A modular audio synthesizer, with live telemetry + command protocol layer with clean scheduling and debug tooling. Software in C + Typescript. Hardware in modular PCBs",
      tags: ["C", "PCBs", "Typescript", "Modular Hardware", "Live Telemetry and Data Protocols"],
      links: [{ label: "See the progress!", href: "https://github.com/logie87/audiosynth" }],
    },
    {
      title: "This Portfolio",
      blurb:
        "This site. Built with Vite + TS + motion. Designed to be easy to iterate on and super animated and whatnot.",
      tags: ["Vite", "React", "Framer Motion"],
      links: [{ label: "Live", href: "https://github.com/logie87/logie87" }],
    },
  ] as Project[],
};
