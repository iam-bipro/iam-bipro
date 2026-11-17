import Link from "next/link";

type SiteNavProps = {
  active?: "work" | "about" | "connect";
};

export default function SiteNav({ active }: SiteNavProps) {
  return (
    <nav className="glass-nav">
      <Link href="/" className="brand-mark" aria-label="Bipradip Nandy home">
        <span className="brand-orb">BN</span>
        <span>bipradip<span className="muted">.dev</span></span>
      </Link>
      <div className="nav-links">
        <Link className={active === "work" ? "is-current" : undefined} href="/work">Work</Link>
        <Link className={active === "about" ? "is-current" : undefined} href="/about">About</Link>
        <Link className={active === "connect" ? "is-current" : undefined} href="/connect">Connect</Link>
      </div>
      <a href="https://github.com/iam-bipro" target="_blank" rel="noreferrer" className="nav-availability">
        <span className="status-dot" /> github.com/iam-bipro
      </a>
    </nav>
  );
}
