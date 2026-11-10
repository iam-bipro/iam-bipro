"use client";

import {
  ArrowUp,
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const contributionCells = Array.from({ length: 42 }, (_, index) => {
  const level = [0, 1, 0, 2, 1, 0, 3, 1, 2, 0, 1, 3, 0, 2][index % 14];
  return level;
});

function useIstClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    };
    format();
    const interval = window.setInterval(format, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export default function SiteFooter() {
  const time = useIstClock();
  const [nightMode, setNightMode] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="footer-atmosphere" aria-hidden="true" />
      <div className="footer-topline">
        <span><Sparkles size={13} /> OPEN TO MEANINGFUL COLLABORATION</span>
        <span>01 — 2026</span>
      </div>

      <div className="footer-grid">
        <section className="footer-cta glass-card">
          <div className="footer-card-kicker">Have a useful idea?</div>
          <h2>LET&apos;S BUILD SOMETHING <span>USEFUL</span> TOGETHER.</h2>
          <p>
            I enjoy turning thoughtful ideas into clear, reliable web products.
            If you have a problem worth solving, I&apos;d love to hear about it.
          </p>
          <div className="footer-cta-row">
            <a className="footer-email-button" href="mailto:bipradipnandy@gmail.com">
              Shoot an Email <Send size={14} />
            </a>
            <span className="footer-availability"><i /> Available for select projects</span>
          </div>
        </section>

        <a className="footer-github-card glass-card" href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">
          <div className="footer-card-heading">
            <span className="footer-icon-box"><span className="brand-icon">GH</span></span>
            <ArrowUpRight size={15} />
          </div>
          <div className="footer-profile-handle">@iam-bipro</div>
          <p>Building ideas, one commit at a time.</p>
          <div className="contribution-grid" aria-label="Decorative contribution activity">
            {contributionCells.map((level, index) => <i className={`contribution-cell level-${level}`} key={index} />)}
          </div>
          <div className="footer-stat-row">
            <span><strong>Public</strong> profile</span>
            <span><strong>JS</strong> · React · Web</span>
          </div>
        </a>

        <section className="footer-location-card glass-card">
          <div className="footer-card-heading">
            <span className="footer-card-kicker"><MapPin size={13} /> CURRENTLY IN</span>
            <button type="button" className={`moon-button ${nightMode ? "is-active" : ""}`} onClick={() => setNightMode((active) => !active)} aria-label="Toggle moon accent">
              <Moon size={14} />
            </button>
          </div>
          <div className="location-name">ICHHAPUR, <span>INDIA</span></div>
          <div className="radar-motif" aria-hidden="true"><span /><i /><b /></div>
          <div className="location-time"><Clock3 size={13} /><strong>{time || "--:-- --"}</strong><span>IST · UTC+5:30</span></div>
        </section>
      </div>

      <div className="footer-lower">
        <div className="footer-links-column">
          <span className="footer-column-title">NAVIGATE</span>
          <a href="#">Home</a>
          <a href="#work">Selected work</a>
          <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
        </div>
        <div className="footer-links-column">
          <span className="footer-column-title">MADE WITH</span>
          <span>Next.js &amp; TypeScript</span>
          <span>Framer Motion</span>
          <span>Curiosity &amp; care</span>
        </div>
        <div className="footer-social-column">
          <span className="footer-column-title">FIND ME AROUND</span>
          <div className="footer-social-dock">
            <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer" aria-label="GitHub"><span className="brand-icon">GH</span></a>
            <a href="https://www.linkedin.com/in/bipradip-nandy/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="brand-icon">in</span></a>
            <a href="https://x.com/iam_bipro" target="_blank" rel="noreferrer" aria-label="X"><span className="x-icon">𝕏</span></a>
            <a href="mailto:bipradipnandy@gmail.com" aria-label="Email"><Mail size={16} /></a>
            <a href="https://discord.com/" target="_blank" rel="noreferrer" aria-label="Discord"><MessageCircle size={16} /></a>
          </div>
        </div>
        <button type="button" className="back-to-top" onClick={scrollToTop}><ArrowUp size={15} /> Back to top</button>
      </div>

      <div className="footer-bottom">
        <span className="footer-badge">BN</span>
        <span>© 2026 Bipradip Nandy. Made with intent.</span>
        <span>ICHHAPUR · INDIA</span>
      </div>
    </footer>
  );
}
