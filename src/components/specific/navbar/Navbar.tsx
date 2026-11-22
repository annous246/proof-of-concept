import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Valeurs", href: "#valeurs" },
  { label: "Contact", href: "mailto:it@teamallin.com" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header className={`${styles.bar} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#accueil" className={styles.logo}>
          Team ALL<span className={styles.dash}>-</span>IN
        </a>
  
        <nav className={styles.desktopLinks}>
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>
  
        <button
          type="button"
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="drawer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
        </button>
      </header>

      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside
        id="drawer"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
      >
        <nav className={styles.drawerLinks}>
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.drawerLink}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <span className={styles.number}>0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <p className={styles.mail}>it@teamallin.com</p>
      </aside>
    </>
  );
}
