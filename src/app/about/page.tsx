import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import PortfolioFooter from "@/components/PortfolioFooter";
import WaterRippleBackground from "@/components/WaterRippleBackground";

export default function AboutPage() {
  return (
    <main className="site-shell route-shell">
      <WaterRippleBackground />
      <a className="skip-link" href="#about-content">Skip to about</a>
      <SiteNav active="about" />
      <section className="route-hero" id="about-content">
        <p className="route-kicker">About Bipradip</p>
        <h1>Curious by nature,<br /><span>consistent by choice.</span></h1>
        <p className="route-intro">I&apos;m Bipradip Nandy, a full-stack web developer and Computer Science student from Ichhapur, West Bengal.</p>
        <Link className="back-link" href="/">← Back to home</Link>
      </section>
      <section className="about-grid">
        <article className="route-panel glass-card">
          <p className="route-kicker">Education</p>
          <h2>B.Tech in Computer Science<br /><span>and Engineering</span></h2>
          <p>Kalyani Government Engineering College</p>
          <small>3rd Semester · 2025 — present</small>
          <div className="about-stats">
            <div><strong>94.8%</strong><span>Class 12 · Top 1.5% nationwide across KVS</span></div>
            <div><strong>93.8%</strong><span>Class 10 · Kendriya Vidyalaya No. 1 Ishapore</span></div>
          </div>
        </article>
        <article className="route-panel glass-card">
          <p className="route-kicker">Recognition</p>
          <h2>Learning in public,<br /><span>building with intent.</span></h2>
          <ul className="route-list">
            <li><strong>NPTEL</strong><span>Python for Data Science · Elite + Gold · Top 1%</span></li>
            <li><strong>MLH</strong><span>Hacktoberfest Hack Day · Top 3 finalist</span></li>
            <li><strong>KVS Merit</strong><span>Top 1.5% nationwide in Higher Secondary</span></li>
          </ul>
        </article>
      </section>
      <section className="route-panel glass-card about-toolkit">
        <p className="route-kicker">Toolkit</p>
        <h2>From data structures to delightful interfaces.</h2>
        <div className="skill-cloud">{"C++ Python JavaScript TypeScript Next.js React Tailwind CSS Three.js GSAP Node.js WebSockets Django PostgreSQL Prisma Redis DSA".split(" ").map((skill) => <span key={skill}>{skill}</span>)}</div>
      </section>
      <PortfolioFooter />
    </main>
  );
}
