"use client";

import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, GitBranch, MessageCircle, UserRound } from "lucide-react";
import WaterRippleBackground from "@/components/WaterRippleBackground";

const projects = [
  {
    title: "MyLeague",
    category: "Real-time sports platform",
    description: "Multi-sport auction and league management with live WebSocket updates.",
    tags: ["Next.js", "WebSockets", "Prisma"],
  },
  {
    title: "IBVAP",
    category: "Computer vision platform",
    description: "Real-time CCTV analytics for perimeter breaches, ANPR, and loitering alerts.",
    tags: ["Next.js", "FastAPI", "YOLOv8"],
    href: "https://github.com/iam-bipro/IBVAP",
  },
  {
    title: "CineMatch AI",
    category: "Machine learning product",
    description: "Fast movie discovery powered by content similarity and a FastAPI backend.",
    tags: ["Python", "FastAPI", "Next.js"],
    href: "https://github.com/iam-bipro/moviereccom",
  },
  {
    title: "JanSuvidha",
    category: "AI for public welfare",
    description: "AI-driven discovery of public welfare schemes, built at IEMHacks 4.0.",
    tags: ["Next.js", "XGBoost", "Product"],
  },
  {
    title: "Campus Channels",
    category: "Campus communication",
    description: "A TypeScript web experience for sharing useful information across campus.",
    tags: ["TypeScript", "React", "UI"],
    href: "https://github.com/iam-bipro/campus-channels",
  },
  {
    title: "Sahayak",
    category: "Frontend experience",
    description: "A focused, accessible interface for connecting people with helpful services.",
    tags: ["TypeScript", "React", "CSS"],
    href: "https://github.com/iam-bipro/sahayak-Frontend",
  },
];

const skills = [
  "C++", "Python", "JavaScript", "TypeScript", "Next.js", "React",
  "Tailwind CSS", "Three.js", "GSAP", "Node.js", "WebSockets", "Django",
  "PostgreSQL", "Prisma", "Redis", "DSA", "Competitive Programming",
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <main className="site-shell">
      <WaterRippleBackground />
      <a className="skip-link" href="#work">Skip to selected work</a>

      <nav className="glass-nav">
        <a href="/" className="brand-mark" aria-label="Bipradip Nandy home">
          <span className="brand-orb">BN</span>
          <span>bipradip<span className="muted">.dev</span></span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer" className="nav-availability">
          <span className="status-dot" /> github.com/iam-bipro
        </a>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Full-stack web developer & CSE student</div>
          <h1>Building useful<br /><span>things for the web.</span></h1>
          <p className="hero-intro">
            I&apos;m Bipradip — a developer from Ichhapur, West Bengal, exploring
            real-time systems, intelligent products, and thoughtful interfaces.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">Explore my work <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} /></a>
            <a className="text-button" href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">View GitHub <span>→</span></a>
          </div>
        </div>

        <div className="profile-card glass-card" id="about">
          <div className="profile-topline"><span>Ichhapur · India</span></div>
          <div className="avatar-wrap">
            <div className="avatar">BN</div>
            <span className="avatar-ring" />
            <span className="avatar-spark">✦</span>
          </div>
          <div className="profile-name">Bipradip Nandy</div>
          <div className="profile-role">Full-stack web developer<br />and Computer Science student.</div>
          <div className="profile-footer"><span>Studying at <strong>KGEC</strong></span><span>Portfolio</span></div>
        </div>
      </section>

      <section className="marquee-row" aria-label="Core areas">
        <span>Full-stack</span><span>Real-time systems</span><span>Machine learning</span><span>Competitive programming</span><span>Full-stack</span>
      </section>

      <section className="credentials-grid" id="about-details">
        <article className="info-panel glass-card">
          <h3>B.Tech in Computer Science<br /><span>and Engineering</span></h3>
          <p>Kalyani Government Engineering College</p>
          <small>3rd Semester · 2025 — present</small>
          <div className="education-record"><strong>94.8%</strong><span>Class 12 · Top 1.5% nationwide across KVS</span></div>
          <div className="education-record"><strong>93.8%</strong><span>Class 10 · Kendriya Vidyalaya No. 1 Ishapore</span></div>
        </article>
        <article className="info-panel glass-card">
          <h3>Curious by nature,<br /><span>consistent by choice.</span></h3>
          <ul className="achievement-list">
            <li><strong>NPTEL</strong><span>Python for Data Science · Elite + Gold · Top 1%</span></li>
            <li><strong>MLH</strong><span>Hacktoberfest Hack Day · Top 3 finalist</span></li>
            <li><strong>KVS Merit</strong><span>Top 1.5% nationwide in Higher Secondary</span></li>
          </ul>
        </article>
      </section>

      <section className="stack-section">
        <div className="section-heading stack-heading">
          <div>
            <h2>Ideas into<br /><span>working systems.</span></h2>
          </div>
          <p>From data structures to delightful<br />interfaces, I like the whole stack.</p>
        </div>
        <div className="skill-cloud">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <h2>Projects with<br /><span>a purpose.</span></h2>
          </div>
          <p>Built, shipped, and still learning from<br />each one of these experiments.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.href ?? "#contact"}
              target={project.href ? "_blank" : undefined}
              rel={project.href ? "noreferrer" : undefined}
              className={`project-card ${index === activeProject ? "is-active" : ""}`}
              onMouseEnter={() => setActiveProject(index)}
              onFocus={() => setActiveProject(index)}
              aria-label={`View ${project.title} project`}
            >
              <div className="project-art">
                <span className="project-label">{project.title}</span>
                <span className="view-project">View project <ArrowUpRight /></span>
              </div>
              <div className="project-info"><span><strong>{project.title}</strong><small>{project.category}</small></span><ArrowUpRight /></div>
              <p>{project.description}</p>
              <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="contact-card glass-card" id="contact">
        <div>
          <h2>Let&apos;s make<br /><span>something useful.</span></h2>
        </div>
        <a className="contact-email" href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">github.com/iam-bipro <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} /></a>
      </section>

      <footer>
        <span>© 2026 Bipradip Nandy</span>
        <span className="footer-note">Built with curiosity & good coffee</span>
        <div className="social-links"><a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">GitHub</a><a href="#work">Projects</a><a href="#about">About</a></div>
      </footer>

      <div className="app-dock" aria-label="Quick links">
        <a href="#work" title="Work" aria-label="Jump to selected work"><span className="dock-icon icon-work"><BriefcaseBusiness aria-hidden="true" size={17} /></span></a>
        <a href="#about" title="About" aria-label="Jump to about"><span className="dock-icon icon-about"><UserRound aria-hidden="true" size={17} /></span></a>
        <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer" title="GitHub" aria-label="Open GitHub profile"><span className="dock-icon icon-mail"><GitBranch aria-hidden="true" size={17} /></span></a>
        <span className="dock-divider" />
        <a href="#contact" title="Contact" aria-label="Jump to contact"><span className="dock-icon icon-chat"><MessageCircle aria-hidden="true" size={17} /></span></a>
      </div>
    </main>
  );
}
