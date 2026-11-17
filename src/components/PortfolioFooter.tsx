import Link from "next/link";

export default function PortfolioFooter() {
  return (
    <footer>
      <span>© 2026 Bipradip Nandy</span>
      <span className="footer-note">Built with curiosity &amp; good coffee</span>
      <div className="social-links">
        <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer">GitHub</a>
        <Link href="/work">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/connect">Connect</Link>
      </div>
    </footer>
  );
}
