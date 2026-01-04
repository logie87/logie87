// App.tsx
import { useCallback, useMemo } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import Menu from "./components/Menu";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import SkillsGrid from "./components/SkillsGrid";
import Dither from "./components/Dither";
import GradientText from "./components/GradientText";
import TextType from "./components/TextType";

import { content } from "./content";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AppShell() {
  const reduce = useReducedMotion() ?? false;
  const navigate = useNavigate();

  const go = useCallback(
    (raw: string) => {
      // In-page scrolls (only really relevant on "/")
      if (raw.startsWith("#")) {
        navigate("/");
        // wait for route render, then scroll
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(raw.slice(1))));
        return;
      }

      // external links
      if (/^https?:\/\//i.test(raw) || raw.startsWith("mailto:")) {
        window.location.href = raw;
        return;
      }

      navigate(raw);
      window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "auto" });
    },
    [navigate, reduce]
  );

  const links = useMemo(
    () => [
      { label: "GitHub", href: content.links.github, icon: Github },
      { label: "LinkedIn", href: content.links.linkedin, icon: Linkedin },
      { label: "Email", href: content.links.email, icon: Mail },
      { label: "Resume", href: content.links.resume, icon: FileText }
    ],
    []
  );

  return (
    <div className="app">
      <Menu
        position="right"
        // keep it white since your menu panel is white and you want the wipe to feel like the menu continues
        colors={["#ffffff", "#ffffff"]}
        accentColor="#5227FF"
        isFixed
        items={[
          { label: "Home", ariaLabel: "Go to Home", link: "/" },
          { label: "Skills", ariaLabel: "Go to Skills", link: "/skills" },
          { label: "Projects", ariaLabel: "Go to Projects", link: "/projects" },
          { label: "Contact", ariaLabel: "Go to Contact", link: "/contact" }
        ]}
        socialItems={[
          { label: "GitHub", link: content.links.github },
          { label: "LinkedIn", link: content.links.linkedin },
          { label: "Email", link: content.links.email }
        ]}
        onItemSelect={go}
      />

      <div style={{ width: "100%", position: "relative" }}>
        <Dither
          className="ditherBg"
          mouseRadius={0.4}
          colorNum={4.9}
          waveAmplitude={0.26}
          waveFrequency={0.6}
          waveSpeed={0.2}
          waveColor={[0.36, 0.44, 0.38]}
        />
      </div>

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Section id="top" className="hero">
                  <motion.p
                    className="kicker"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {content.location}
                  </motion.p>

                  <motion.h1
                    className="h1"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                  >
                    <GradientText
                      colors={["#4f7a28", "#587a5d", "#ffffff", "#74a7fe", "#3a88fe"]}
                      animationSpeed={5}
                      direction="diagonal"
                      pauseOnHover
                      className="nameGradient"
                      showBorder={false}
                    >
                      {content.name}
                    </GradientText>
                  </motion.h1>

                  <motion.h2
                    className="h2"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.12 }}
                  >
                    <TextType
                      as="span"
                      className="titleType"
                      text={[
                        "Computer Science Student",
                        "Software Engineer",
                        "Videographer",
                        "Caffeine Addict",
                        "Tech Enthusiast",
                        "Builder of Things"
                      ]}
                      smartDelete
                      loop
                      pauseDuration={1800}
                      initialDelay={250}
                      typingSpeed={80}
                      deletingSpeed={55}
                      variableSpeed={{ min: 30, max: 100 }}
                      cursorCharacter="▎"
                    />
                  </motion.h2>

                  <motion.p
                    className="tagline"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.18 }}
                  >
                    {content.tagline}
                  </motion.p>

                  <motion.div
                    className="ctaRow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.24 }}
                  >
                    <button className="btn primary" onClick={() => scrollToId("projects")}>
                      See projects
                    </button>
                    <button className="btn primary" onClick={() => scrollToId("contact")}>
                      Contact →
                    </button>

                    <div className="iconRow">
                      {links.map((l) => {
                        const Icon = l.icon;
                        return (
                          <a
                            key={l.label}
                            className="iconBtn"
                            href={l.href}
                            target={l.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            aria-label={l.label}
                            title={l.label}
                          >
                            <Icon size={18} />
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>

                  {!reduce && <div className="scrollHint">scroll</div>}
                </Section>

                <Section id="about" title="About">
                  <div className="grid2">
                    <div className="card">
                      {content.about.map((p, i) => (
                        <p key={i} className="p">
                          {p}
                        </p>
                      ))}
                    </div>

                    <div className="card">
                      <p className="p muted">Those buzzwords, i.e what I have experience with.</p>
                      <SkillsGrid skills={content.skills} />
                      <div style={{ marginTop: 12 }}>
                        <button className="btn" onClick={() => go("/skills")}>
                          More skills →
                        </button>
                      </div>
                    </div>
                  </div>
                </Section>

                <Section id="projects" title="Projects">
                  <div className="projects">
                    {content.projects.map((p) => (
                      <ProjectCard key={p.title} project={p} />
                    ))}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <button className="btn" onClick={() => go("/projects")}>
                      Project details →
                    </button>
                  </div>
                </Section>

                <Section id="contact" title="Contact">
                  <div className="card contactCard">
                    <p className="p">Want to build something together, or point out flaws in my work (please)?</p>
                    <div className="contactRow">
                      <a className="btn primary" href={content.links.email}>
                        Email me
                      </a>
                      <a className="btn" href={content.links.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                      <a className="btn" href={content.links.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>

                      <button className="btn" onClick={() => go("/contact")}>
                        More →
                      </button>
                    </div>
                  </div>
                </Section>

                <footer className="footer">
                  <span className="muted">© {new Date().getFullYear()} {"Logan Hindley"}</span>
                </footer>
              </>
            }
          />

          {/* DETAIL PAGES */}
          <Route
            path="/skills"
            element={
              <Section id="skills" title="Skills (Details)">
                <div className="card">
                  <p className="p muted">Deeper breakdown of the stuff I use and what I use it for.</p>
                  <SkillsGrid skills={content.skills} />
                </div>
              </Section>
            }
          />

          <Route
            path="/projects"
            element={
              <Section id="projectsPage" title="Projects (Details)">
                <div className="projects">
                  {content.projects.map((p) => (
                    <ProjectCard key={p.title} project={p} />
                  ))}
                </div>
              </Section>
            }
          />

          <Route
            path="/contact"
            element={
              <Section id="contactPage" title="Contact (Details)">
                <div className="card contactCard">
                  <p className="p">Best way to reach me is email. Socials below.</p>
                  <div className="contactRow">
                    <a className="btn primary" href={content.links.email}>
                      Email me
                    </a>
                    <a className="btn" href={content.links.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    <a className="btn" href={content.links.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                    <a className="btn" href={content.links.resume} target="_blank" rel="noreferrer">
                      Resume
                    </a>
                  </div>
                </div>
              </Section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}
