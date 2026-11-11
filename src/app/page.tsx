"use client";

import Link from "next/link";
import { useState } from "react";
import FloatingNav from "@/components/ui/FloatingNav";
import SiteFooter from "@/components/ui/SiteFooter";
import ProfileCard from "@/components/widgets/ProfileCard";

function ArrowUpRight() {
  return <span aria-hidden="true" className="text-lg">↗</span>;
}

export default function Home() {
  const [activeDockItem, setActiveDockItem] = useState(0);

  return (
    <main className="site-shell landing-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-lines" />
      <FloatingNav />

      <section className="hero-section landing-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> Full-stack web developer &amp; CSE student</div>
          <h1>Building useful<br /><span>things for the web.</span></h1>
          <p className="hero-intro">
            I&apos;m Bipradip — a developer from Ichhapur, West Bengal, exploring
            real-time systems, intelligent products, and thoughtful interfaces.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/app">Explore my work <ArrowUpRight /></Link>
            <a className="text-button" href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">View GitHub <span>→</span></a>
          </div>
        </div>

        <ProfileCard />
      </section>

      <div className="app-dock landing-dock" aria-label="App shortcuts">
        {[["✦", "Work app"], ["◉", "About app"], ["↗", "GitHub"], ["●", "Contact app"]].map(([icon, label], index) => (
          <Link
            key={label}
            href={index === 2 ? "https://github.com/iam-bipro" : "/app"}
            target={index === 2 ? "_blank" : undefined}
            rel={index === 2 ? "noreferrer" : undefined}
            title={label}
            onMouseEnter={() => setActiveDockItem(index)}
            onFocus={() => setActiveDockItem(index)}
            className={activeDockItem === index ? "dock-item-active" : ""}
          >
            <span className={`dock-icon ${["icon-work", "icon-about", "icon-mail", "icon-chat"][index]}`}>{icon}</span>
          </Link>
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
