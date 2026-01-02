export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export type SkillHighlight = { 
  title: string; 
  blurb: string; 
  href: string };

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
    tagline?: string;
  highlights?: SkillHighlight[];
};

export const content = {
  name: "Logan Hindley",
  title: "Software / Systems / Caffeine Engineer",
  location: "Edmonton, AB",
  tagline:
    "I build whatever comes to mind, usually slightly over-engineered fixes to problems and adding dark modes to everything.",
  links: {
    github: "https://github.com/logie87",
    linkedin: "https://www.linkedin.com/in/loganhindley/",
    email: "mailto:lhindley@ualberta.ca",
    resume: "https://docs.google.com/document/d/1OWb428YVy725HeaPIZVizyFydH1pgBG0jaVzwGHzuhQ/edit?usp=sharing", // to add when you upload it
  },

  about: [
    "I like building products that feel good to use. Preferably things that solve real problems I didn't create.",
    "Currently a student + software dev + videographer. I (for some reason) enjoy mindless debugging over coffee as well as leading large projects.",
    "Always seeking new connections and looking for opportunities to learn. If you want to connect, send me a message! I am always up for a coffee chat, and always looking for new events and competitions to take part in!",
    "Thanks for stopping by!",
  ],

  skills: [
    {
      label: "React",
      key: "react",
      tagline: "Built Interactive UIs focusing on modularity.",
      highlights: [
        {
          title: "Instructive (nathacks)",
          blurb: "Led this project and assisted UI development.",
          href: "https://devpost.com/software/instructive",
        },
        {
          title: "My Portfolio",
          blurb: "Iterating on motion + interactions (like this popup).",
          href: "https://github.com/logie87/",
        },
        {
          title: "My Portfolio",
          blurb: "Iterating on motion + interactions (like this popup).",
          href: "https://github.com/logie87/",
        },
      ],
    },
    {
      label: "TypeScript",
      key: "typescript",
      tagline: "Worked on large scale unqiue projects.",
      highlights: [
        {
          title: "Portfolio (Vite + TS)",
          blurb: "Tons of interactive yet modular components.",
          href: "https://github.com/logie87",
        },
        {
          title: "Synth UI Visuals",
          blurb: "TypeScript & C providing live telemetry visuals.",
          href: "https://github.com/logie87/audiosynth",
        },
      ],
    },
    {
      label: "C / C++",
      key: "cpp",
      tagline: "Designed intricate applications.",
      highlights: [
        {
          title: "AudioSynth Telemetry Layer",
          blurb: "Low-level scheduling + command/telemetry protocols.",
          href: "https://github.com/logie87/audiosynth",
        },
        {
          title: "CMPUT 201 uAlberta",
          blurb: "Dedicated C course focused on systems programming.",
          href: "https://apps.ualberta.ca/catalogue/course/cmput/201",
        },
      ],
    },
    {
      label: "Java",
      key: "java",
      tagline: "Focusing on SWE level coding practices.",
      highlights: [
        {
          title: "Seat Sorter",
          blurb: "Built a seat assignment algorithm for restaurants.",
          href: "https://github.com/logie87/seatsorter",
        },
        {
          title: "2025 Telesat Software Engineer Intern",
          blurb: "Numerous bug fixes, testing, and work with Java + Maven.",
          href: "https://www.telesat.com",
        },
      ],
    },
    {
      label: "Git",
      key: "git",
      tagline: "Experience with Git CLI, GitHub, and GitLab.",
      highlights: [
        {
          title: "GitHub Profile",
          blurb: "All projects + My Beautiful Green Chart",
          href: "https://github.com/logie87",
        },
        {
          title: "Telesat LEO Software Engineer Intern",
          blurb: "Summer 2025 - Worked on a Scrum team practicing CI/CD",
          href: "https://www.telesat.com",
        },
      ],
    },
    {
      label: "CI/CD",
      key: "cicd",
      tagline: "Learning how to integrate with others.",
      highlights: [
        {
          title: "All of my Projects",
          blurb: "Honing the essentials.",
          href: "https://github.com/logie87",
        },
        {
          title: "Telesat LEO Software Engineer Intern",
          blurb: "Summer 2025 - Daily bug fixing in large codebases.",
          href: "https://www.telesat.com",
        },
      ],
    },
    {
      label: "Microsoft Azure",
      key: "azure",
      tagline: "Learning how to deploy to existing applications.",
      highlights: [
        {
          title: "2025 Telesat Software Engineer Intern",
          blurb: "Implemented new deployment functionality to Azure nodes",
          href: "https://www.telesat.com",
        },
      ],
    },
    {
      label: "JFrog",
      key: "jfrog",
      tagline: "Centralizing artifacts for longevity",
      highlights: [
        {
          title: "2025 Telesat Software Engineer Intern",
          blurb: "Centralized local Maven artifacts to Artifactory.",
          href: "https://www.telesat.com",
        },
      ],
    },
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
      title: "Audio Synthesizer + Telemetry Visualizer Project",
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
      links: [{ label: "Github", href: "https://github.com/logie87/logie87" }],
    },
  ] as Project[],
};
