import React, { useState, useEffect } from "react";
import "./App.css";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GroupsIcon from "@mui/icons-material/Groups";

function App() {
  const [selectedCV, setSelectedCV] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const team = [
    {
      name: "Nourhan Mohamed",
      linkedin: "https://www.linkedin.com/in/nourhan-almadawey-4a4120267",
      cv: "/CVs/NourhanAlmadawey.pdf",
    },
    {
      name: "Youssef Mahmoud",
      linkedin: "https://www.linkedin.com/in/youssef-mahmoud-b2a922214/",
      cv: "/CVs/Youssef Mahmoud Abdelrahman.pdf",
    },
    {
      name: "Marwan Mohamed",
      linkedin: "https://www.linkedin.com/in/marwan-mohamed-atef-elfouly",
      cv: "/CVs/marwan mohamed atef.pdf",
    },
    {
      name: "Hagar Ibrahim",
      linkedin: "https://www.linkedin.com/in/hagar-ibrahim-36ba50275/",
      cv: "/CVs/Hagar-ibrahim .pdf",
    },
  ];

  const features = [
    { icon: "🤖", title: "AI Legal Analysis",      desc: "Detect violations, ambiguities and missing obligations." },
    { icon: "⚖️", title: "OCL Validation",          desc: "Formal verification using Object Constraint Language." },
    { icon: "📄", title: "SRS/SDD Verification",   desc: "Validate contracts against technical documents." },
    { icon: "🔒", title: "Digital Signing",         desc: "Secure and legally binding signatures." },
  ];

  const steps = [
    "Registration", "Policy Input", "Contract Creation",
    "AI Analysis", "Digital Signing", "SRS/SDD Verification", "Monitoring",
  ];

  const stats = [
    { value: "4",    label: "Members"  },
    { value: "4+",   label: "Features" },
    { value: "7",    label: "Steps"    },
    { value: "2026", label: "Year"     },
  ];

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── fade-up observer ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── counter observer ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const raw = el.dataset.target;
          const suffix = raw.replace(/\d/g, "");
          const target = parseInt(raw, 10);
          const big = target > 100;
          const startVal = big ? target - 50 : 0;
          const dur = 1200;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(startVal + (target - startVal) * ease) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-target]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app">

      {/* PROGRESS */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* NAV */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
     <span className="nav-logo">SoftwareGuard</span>


        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#about"    onClick={closeMenu}>About</a>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#workflow" onClick={closeMenu}>Workflow</a>
        <a href="#team"     onClick={closeMenu}>Team</a>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-orb orb1" />
        <div className="hero-orb orb2" />

        <div className="hero-left">
          <span className="badge">
            <span className="badge-dot" />
            AI · OCL · Legal Compliance
          </span>
          <h1>SoftwareGuard</h1>
          <p className="hero-sub">AI Contract Review Platform</p>
          <p className="hero-desc">
            An intelligent enterprise platform that automates software contract
            analysis, compliance verification and risk detection using AI and OCL.
          </p>
          <div className="hero-buttons">
            <a
              href="https://github.com/YoussefMa7moud/Graduation"
              target="_blank" rel="noreferrer"
              className="primary-btn"
            >
              <GitHubIcon fontSize="small" /> Source Code
            </a>
            <a href="#team" className="secondary-btn">
              <GroupsIcon fontSize="small" /> Meet The Team
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="logo-wrap">
            <img src="/logo.png" alt="SoftwareGuard" className="hero-logo" />
          </div>
        </div>
      </header>

      {/* ═══════════════ STATS ═══════════════ */}
      <div className="stats-bar">
        {stats.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-num" data-target={s.value}>0</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="intro" id="about">
        <div className="section-header fade-up">
          <h2>About SoftwareGuard</h2>
        </div>
        <div className="intro-grid fade-up">
          <p>
            SoftwareGuard is a web-based enterprise platform that assists
            organizations in creating, reviewing, validating, and monitoring
            software contracts based on Egyptian law and internal company policies.
          </p>
          <p>
            By combining AI, Large Language Models (LLMs), NLP, and OCL,
            the system identifies legal violations, compliance risks,
            ambiguities, and inconsistencies with company policies and
            technical documentation.
          </p>
     <p>
  SoftwareGuard offers integrated Arabic and English language support,
  enabling organizations to efficiently manage contracts in a bilingual
  environment.
</p>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="features" id="features">
        <div className="section-header fade-up">
          <h2>Core Features</h2>
          <p>Everything you need for intelligent contract management.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature fade-up" key={i}>
              <span className="feature-icon">{f.icon}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ WORKFLOW ═══════════════ */}
      <section className="workflow" id="workflow">
        <div className="section-header fade-up">
          <h2>Project Workflow</h2>
      </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step fade-up" key={i}>
              <span className="step-num">0{i + 1}</span>
              <span className="step-label">{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ VIDEOS ═══════════════ */}
      <section className="video-section">
        <div className="section-header fade-up">
          <h2>Marketing Video</h2>
  
        </div>
        <div className="videos-grid">
          {[
            { src: "https://res.cloudinary.com/dwvyqg1pg/video/upload/v1781657972/marketing-vid.mp4" },
          ].map((v, i) => (
            <div className="video-card fade-up" key={i}>
             
              <video controls>
                <source src={v.src} />
              </video>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ TEAM ═══════════════ */}
      <section className="team" id="team">
        <div className="section-header fade-up">
          <h2>Project Team</h2>
      </div>
        <div className="team-grid">
          {team.map((m, i) => {
            const initials = m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div className="member-card fade-up" key={i}>
                <div className="avatar">{initials}</div>
                <h3>{m.name}</h3>
                <a href={m.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInIcon fontSize="small" /> LinkedIn
                </a>
                <button onClick={() => setSelectedCV(m.cv)}>View CV</button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ MODAL ═══════════════ */}
      {selectedCV && (
        <div className="overlay" onClick={() => setSelectedCV(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>CV Options</h2>
            <div className="modal-buttons">
              <a href={selectedCV} target="_blank" rel="noreferrer" className="primary-btn">
                View PDF
              </a>
              <a href={selectedCV} download className="secondary-btn">
                Download
              </a>
            </div>
            <button className="modal-close" onClick={() => setSelectedCV(null)}>
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer>
        <div className="footer-inner">

          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-logo">SoftwareGuard</span>
            <p className="footer-tagline">AI Contract Review Platform</p>
            <a
              href="https://github.com/YoussefMa7moud/Graduation"
              target="_blank" rel="noreferrer"
              className="footer-github"
            >
              <GitHubIcon fontSize="small" /> View on GitHub
            </a>
          </div>

          {/* Columns */}
          <div className="footer-cols">
            <div className="footer-col">
              <div className="footer-label">Project</div>
              <p>Graduation Project 2025/2026</p>
              <p>Faculty of Computer Science</p>
              <p>Misr International University</p>
            </div>

            <div className="footer-col">
              <div className="footer-label">Supervised by</div>
              <p>Asst. Prof. Nissreen El-Saber</p>
              <p>Eng. Rana Mohamed</p>
            </div>

            <div className="footer-col">
              <div className="footer-label">Developed by</div>
              <p>Computer Science Students</p>
              <p>Software Development Major</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2026 SoftwareGuard — Misr International University</span>
          <span>Built with AI · OCL · NLP</span>
        </div>
      </footer>

    </div>
  );
}

export default App;