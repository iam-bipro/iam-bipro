"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Work", href: "/app" },
  { label: "About", href: "/app" },
  { label: "Contact", href: "/app" },
];

export default function FloatingNav() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="floating-nav fixed top-4 z-50 flex w-[92%] max-w-5xl items-center justify-between rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-2.5 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-white/30 focus-within:border-white/30"
      aria-label="Primary navigation"
    >
      <a
        href="#"
        className="group flex shrink-0 items-center gap-2.5 rounded-xl outline-none"
        aria-label="Bipradip Nandy home"
        onClick={closeMenu}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-gradient-to-br from-indigo-200 to-indigo-500 text-[11px] font-black tracking-[-0.08em] text-slate-950 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:rotate-6">
          BN
        </span>
        <span className="hidden text-sm font-bold tracking-[-0.04em] text-white sm:inline">
          bipradip<span className="font-normal text-white/45">.dev</span>
        </span>
      </a>

      <div
        className="hidden items-center gap-1 md:flex"
        onMouseLeave={() => setHoveredLink(null)}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative rounded-xl px-4 py-2 text-xs text-white/60 outline-none transition-colors hover:text-white focus-visible:text-white"
            onMouseEnter={() => setHoveredLink(link.label)}
            onFocus={() => setHoveredLink(link.label)}
          >
            {hoveredLink === link.label && (
              <motion.span
                layoutId="floating-nav-highlight"
                className="absolute inset-0 -z-10 rounded-xl bg-white/[0.1] ring-1 ring-inset ring-white/10"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="https://github.com/iam-bipro"
        target="_blank"
        rel="noreferrer"
        className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] text-white/65 outline-none transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1] hover:text-white focus-visible:border-white/30 sm:flex"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />
        </span>
        github.com/iam-bipro
        <ArrowUpRight size={13} strokeWidth={1.8} aria-hidden="true" />
      </a>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white/75 transition hover:border-white/25 hover:bg-white/[0.12] md:hidden"
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={17} /> : <Menu size={17} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/15 bg-slate-950/75 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/iam-bipro"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="mt-1 flex items-center justify-between rounded-xl border-t border-white/10 px-4 py-3 text-xs text-white/60"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />
                GitHub profile
              </span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
