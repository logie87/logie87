import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import ProjectCard from "./components/ProjectCard";
import GlowBackdrop from "./components/GlowBack";
import SkillsGrid from "./components/SkillsGrid";
import Dither from "./components/Dither";
import { content } from "./content";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function App() {
  const reduce = useReducedMotion();

  const links = useMemo(
    () => [
      { label: "GitHub", href: content.links.github, icon: Github },
      { label: "LinkedIn", href: content.links.linkedin, icon: Linkedin },
      { label: "Email", href: content.links.email, icon: Mail },
      { label: "Resume", href: content.links.resume, icon: FileText },
    ],
    []
  );

  return (
    <div className="app">
      <GlowBackdrop />
      <Navbar />
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
        {/* HERO */}
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
            {content.name}
          </motion.h1>

          <motion.h2
            className="h2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            {content.title}
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
            <a className="btn primary" href="#projects">
              See projects
            </a>
            <a className="btn" href="#contact">
              Contact
            </a>

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

        {/* ABOUT */}
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
              <p className="p muted">
                Those buzzwords, i.e what I have experience with
              </p>
              <SkillsGrid skills={content.skills} />
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="projects">
            {content.projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact">
          <div className="card contactCard">
            <p className="p">
              Want to build something together, or point out flaws in my work
              (please)?
            </p>
            <div className="contactRow">
              <a className="btn primary" href={content.links.email}>
                Email me
              </a>
              <a
                className="btn"
                href={content.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="btn"
                href={content.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Section>

        <footer className="footer">
          <span className="muted">
            © {new Date().getFullYear()} {"Logan Hindley"}
          </span>
          <a className="muted" href="#top">
            Back to top ↑
          </a>
        </footer>
      </main>
    </div>
  );
}
