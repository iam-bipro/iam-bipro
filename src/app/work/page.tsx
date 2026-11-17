import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import PortfolioFooter from "@/components/PortfolioFooter";
import WaterRippleBackground from "@/components/WaterRippleBackground";

const projects = [
  ["MyLeague", "Real-time sports platform", "Multi-sport auction and league management with live WebSocket updates.", ["Next.js", "WebSockets", "Prisma"]],
  ["IBVAP", "Computer vision platform", "Real-time CCTV analytics for perimeter breaches, ANPR, and loitering alerts.", ["Next.js", "FastAPI", "YOLOv8"], "https://github.com/iam-bipro/IBVAP"],
  ["CineMatch AI", "Machine learning product", "Fast movie discovery powered by content similarity and a FastAPI backend.", ["Python", "FastAPI", "Next.js"], "https://github.com/iam-bipro/moviereccom"],
  ["JanSuvidha", "AI for public welfare", "AI-driven discovery of public welfare schemes, built at IEMHacks 4.0.", ["Next.js", "XGBoost", "Product"]],
  ["Campus Channels", "Campus communication", "A TypeScript web experience for sharing useful information across campus.", ["TypeScript", "React", "UI"], "https://github.com/iam-bipro/campus-channels"],
  ["Sahayak", "Frontend experience", "A focused, accessible interface for connecting people with helpful services.", ["TypeScript", "React", "CSS"], "https://github.com/iam-bipro/sahayak-Frontend"],
] as const;

export default function WorkPage() {
  return (
    <main className="site-shell route-shell">
      <WaterRippleBackground />
      <a className="skip-link" href="#work-content">Skip to work</a>
      <SiteNav active="work" />
      <section className="route-hero" id="work-content">
        <p className="route-kicker">Selected work</p>
        <h1>Projects with<br /><span>a purpose.</span></h1>
        <p className="route-intro">A collection of systems, interfaces, and experiments built across real-time products, machine learning, and campus tools.</p>
        <Link className="back-link" href="/">← Back to home</Link>
      </section>
      <section className="route-project-grid" aria-label="Selected projects">
        {projects.map(([title, category, description, tags, href]) => (
          <article className="route-project-card glass-card" key={title}>
            <div className="route-project-topline"><span>{category}</span><span>{href ? "Open source" : "In progress"}</span></div>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="project-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            {href ? <a className="route-card-link" href={href} target="_blank" rel="noreferrer">View repository ↗</a> : <span className="route-card-note">Portfolio case study</span>}
          </article>
        ))}
      </section>
      <PortfolioFooter />
    </main>
  );
}
