import { MotionConfig } from "motion/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Contact from "./components/Contact";

export default function App() {
  return (
    // reducedMotion="user" makes every Framer animation honor the OS
    // "reduce motion" setting automatically — no per-component guards needed.
    <MotionConfig reducedMotion="user">
      {/* Skip to content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100]
          bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Process />
        <Contact />
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-sm font-bold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TK<span className="text-primary">.</span>
          </span>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Toshit Kesarwani &mdash; Designed &amp; built with intent.
          </p>
        </div>
      </footer>
    </MotionConfig>
  );
}
