"use client";

import { ArrowUpRight, BriefcaseBusiness, GitBranch, MessageCircle, UserRound } from "lucide-react";
import WaterRippleBackground from "@/components/WaterRippleBackground";

export default function Home() {
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
          <a href="/work">Work</a>
          <a href="/about">About</a>
          <a href="/connect">Connect</a>
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
            <a className="primary-button" href="/work">Explore my work <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} /></a>
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

      <div className="app-dock" aria-label="Quick links">
        <a href="/work" title="Work" aria-label="Open selected work"><span className="dock-icon icon-work"><BriefcaseBusiness aria-hidden="true" size={17} /></span></a>
        <a href="/about" title="About" aria-label="Open about page"><span className="dock-icon icon-about"><UserRound aria-hidden="true" size={17} /></span></a>
        <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer" title="GitHub" aria-label="Open GitHub profile"><span className="dock-icon icon-mail"><GitBranch aria-hidden="true" size={17} /></span></a>
        <span className="dock-divider" />
        <a href="/connect" title="Connect" aria-label="Open connect page"><span className="dock-icon icon-chat"><MessageCircle aria-hidden="true" size={17} /></span></a>
      </div>
    </main>
  );
}
