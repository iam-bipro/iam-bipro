import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import PortfolioFooter from "@/components/PortfolioFooter";
import WaterRippleBackground from "@/components/WaterRippleBackground";

export default function ConnectPage() {
  return (
    <main className="site-shell route-shell">
      <WaterRippleBackground />
      <a className="skip-link" href="#connect-content">Skip to connect</a>
      <SiteNav active="connect" />
      <section className="route-hero" id="connect-content">
        <p className="route-kicker">Start a conversation</p>
        <h1>Let&apos;s make<br /><span>something useful.</span></h1>
        <p className="route-intro">Have a product idea, a technical problem, or a collaboration in mind? The best way to reach me is through GitHub.</p>
        <Link className="back-link" href="/">← Back to home</Link>
      </section>
      <section className="connect-grid">
        <a className="connect-card glass-card" href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">
          <span className="route-kicker">Open source</span>
          <h2>GitHub</h2>
          <p>iam-bipro</p>
          <span className="route-card-link">View profile ↗</span>
        </a>
        <div className="connect-card glass-card">
          <span className="route-kicker">Based in</span>
          <h2>Ichhapur, India</h2>
          <p>Working across full-stack web development, real-time systems, and applied machine learning.</p>
          <span className="route-card-note">Available for thoughtful collaborations</span>
        </div>
      </section>
      <PortfolioFooter />
    </main>
  );
}
