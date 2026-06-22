import {
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronUp,
  Clapperboard,
  Code2,
  Download,
  Eye,
  Mail,
  MapPin,
  Megaphone,
  PenTool,
  Phone,
  SearchCheck,
  Share2,
  Sparkles,
  SwatchBook,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  aboutStats,
  aboutTimeline,
  experiences,
  marqueePrimary,
  marqueeSecondary,
  profile,
  projects,
  resumeData,
  skills,
  videoShowcase,
  type ProjectItem,
} from "./data";
import { PrismaBackground, PrismaHero } from "@/components/ui/prisma-hero";
import { GlassFilter, GlassEffect } from "@/components/ui/liquid-glass";
import { TextReveal } from "@/components/ui/cascade-text";
import { MeshGradientSVG } from "@/components/ui/shader-svg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const iconMap: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  "pen-tool": PenTool,
  "share-2": Share2,
  "code-2": Code2,
  clapperboard: Clapperboard,
  sparkles: Sparkles,
  "swatch-book": SwatchBook,
  "search-check": SearchCheck,
  "briefcase-business": BriefcaseBusiness,
};

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduced(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="section-label mono-font uppercase">
      <span>{label}</span>
      <span className="orange-slash" aria-hidden="true" />
    </div>
  );
}

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  cursorMode?: "link" | "view";
};

import { GlassButton } from "@/components/ui/liquid-glass";

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  download,
  target,
  rel,
  cursorMode = "link",
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist < 80) {
      gsap.to(wrapper, {
        x: gsap.utils.clamp(-24, 24, dx * 0.35),
        y: gsap.utils.clamp(-24, 24, dy * 0.35),
        duration: 0.3,
        ease: "power3.out",
      });
    } else {
      gsap.to(wrapper, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  };

  const reset = () => {
    if (!wrapperRef.current) return;
    gsap.to(wrapperRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="magnetic-shell relative inline-block will-change-transform"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor={cursorMode}
      data-cursor-fill="true"
    >
      <GlassButton
        href={href}
        onClick={onClick}
        download={download}
        target={target}
        rel={rel}
        className={cn(className, "w-full h-full text-center")}
      >
        {children}
      </GlassButton>
    </div>
  );
}

function Cursor({ reducedMotion }: { reducedMotion: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;

    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const setState = (mode: "default" | "view" | "link") => {
      if (mode === "view") {
        label.textContent = "VIEW";
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.18, overwrite: true });
        gsap.to(label, { opacity: 1, duration: 0.18, overwrite: true });
        gsap.to(ring, {
          width: 60,
          height: 60,
          backgroundColor: "rgba(59,130,246,0.08)",
          borderColor: "rgba(59,130,246,0.4)",
          duration: 0.2,
          overwrite: true,
        });
      } else if (mode === "link") {
        label.textContent = "";
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.18, overwrite: true });
        gsap.to(label, { opacity: 0, duration: 0.18, overwrite: true });
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: "rgba(59,130,246,0.15)",
          borderColor: "rgba(59,130,246,0.35)",
          duration: 0.2,
          overwrite: true,
        });
      } else {
        label.textContent = "";
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.18, overwrite: true });
        gsap.to(label, { opacity: 0, duration: 0.18, overwrite: true });
        gsap.to(ring, {
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          borderColor: "rgba(255,255,255,0.3)",
          duration: 0.2,
          overwrite: true,
        });
      }
    };

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleOver = (event: Event) => {
      const target = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      const mode = target?.dataset.cursor;
      if (mode === "view") setState("view");
      else if (mode === "link") setState("link");
      else setState("default");
    };

    const handleOut = (event: Event) => {
      const related = event instanceof MouseEvent ? event.relatedTarget : null;
      const next = related instanceof HTMLElement ? related.closest<HTMLElement>("[data-cursor]") : null;
      if (!next) setState("default");
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      setDotX(mouseX);
      setDotY(mouseY);
      setRingX(ringX);
      setRingY(ringY);
      frame = window.requestAnimationFrame(render);
    };

    document.body.classList.add("cursor-none-desktop");
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    render();

    return () => {
      document.body.classList.remove("cursor-none-desktop");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div ref={dotRef} className="custom-dot pointer-events-none fixed left-0 top-0 z-[110] hidden md:block" />
      <div ref={ringRef} className="custom-ring pointer-events-none fixed left-0 top-0 z-[109] hidden md:flex">
        <span ref={labelRef} className="mono-font text-[12px] uppercase tracking-[0.3em] text-white opacity-0" />
      </div>
    </>
  );
}

function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[90] h-[2px] w-full bg-white/5">
      <div
        ref={progressRef}
        className="h-full origin-left bg-[linear-gradient(90deg,#3b82f6_0%,#8b5cf6_100%)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

function Loader({ onDone }: { onDone: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    sessionStorage.setItem("shiyan-loader-seen", "true");
    // Allow the slide-up animation to play, then unmount.
    window.setTimeout(onDone, 1000);
  };

  return (
    <motion.div
      className="loader fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
      initial={{ y: 0 }}
      animate={{ y: opening ? "-100%" : 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.6, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -120 || info.velocity.y < -400) {
          handleOpen();
        }
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#3b82f6] opacity-[0.07] blur-[180px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#8b5cf6] opacity-[0.06] blur-[160px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37] opacity-[0.04] blur-[140px]" />
      </div>

      {/* Brand mark */}
      <div className="mono-font absolute left-1/2 top-[8%] z-30 -translate-x-1/2 text-[11px] uppercase tracking-[0.4em] text-white/40">
        SHIYAN SAB
      </div>

      {/* Mesh gradient blob — click or drag up to enter */}
      <button
        type="button"
        onClick={handleOpen}
        className="relative z-10 cursor-pointer text-white outline-none"
        aria-label="Enter portfolio"
        data-cursor="view"
      >
        <MeshGradientSVG />
      </button>

      {/* Hint */}
      <motion.div
        className="absolute bottom-[12%] z-20 flex flex-col items-center gap-3 px-6 text-center"
        animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <ChevronUp className="h-5 w-5 text-white/70" />
        <p className="mono-font text-[11px] uppercase tracking-[0.34em] text-white/55">
          Click or Drag Up to Enter
        </p>
      </motion.div>
    </motion.div>
  );
}

function ParticleField({ reducedMotion }: { reducedMotion: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || reducedMotion) return;

    let destroyed = false;
    let frame = 0;
    let resizeHandler: (() => void) | null = null;
    let moveHandler: ((event: MouseEvent) => void) | null = null;

    void (async () => {
      const THREE = await import("three");
      if (destroyed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 10;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const count = 2000;
      const positions = new Float32Array(count * 3);
      const original = new Float32Array(count * 3);
      const spreadX = 18;
      const spreadY = 12;

      for (let index = 0; index < count; index += 1) {
        const i = index * 3;
        const x = (Math.random() - 0.5) * spreadX;
        const y = (Math.random() - 0.5) * spreadY;
        const z = (Math.random() - 0.5) * 6;
        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;
        original[i] = x;
        original[i + 1] = y;
        original[i + 2] = z;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.04,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const mouse = { x: 999, y: 999 };
      const viewport = { width: 18, height: 12 };

      const updateViewport = () => {
        if (!mountRef.current) return;
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        viewport.height = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        viewport.width = viewport.height * camera.aspect;
      };

      resizeHandler = updateViewport;
      updateViewport();

      moveHandler = (event: MouseEvent) => {
        if (!mountRef.current) return;
        const rect = mountRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        mouse.x = (x - 0.5) * viewport.width;
        mouse.y = (0.5 - y) * viewport.height;
      };

      window.addEventListener("resize", updateViewport);
      window.addEventListener("mousemove", moveHandler);

      const animate = (time: number) => {
        const attribute = geometry.getAttribute("position");
        const array = attribute.array as Float32Array;

        for (let index = 0; index < count; index += 1) {
          const i = index * 3;
          const ox = original[i];
          const oy = original[i + 1];
          const oz = original[i + 2];

          let x = ox + Math.sin(time * 0.0003 + index * 0.1) * 0.08;
          let y = oy + Math.cos(time * 0.00027 + index * 0.14) * 0.08;
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const radius = 1.8;

          if (dist < radius) {
            const force = ((radius - dist) / radius) * 0.45;
            const safe = dist || 1;
            x += (dx / safe) * force;
            y += (dy / safe) * force;
          }

          array[i] = x;
          array[i + 1] = y;
          array[i + 2] = oz + Math.sin(time * 0.00018 + index * 0.12) * 0.02;
        }

        attribute.needsUpdate = true;
        points.rotation.z = Math.sin(time * 0.00005) * 0.06;
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(animate);
      };

      animate(0);

      return () => undefined;
    })();

    return () => {
      destroyed = true;
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (moveHandler) window.removeEventListener("mousemove", moveHandler);
      window.cancelAnimationFrame(frame);
      if (mount.firstChild) {
        mount.removeChild(mount.firstChild);
      }
    };
  }, [reducedMotion]);

  return <div ref={mountRef} className="absolute inset-0 opacity-80" aria-hidden="true" />;
}

function Navbar() {
  const links = useMemo(
    () => [
      { label: "About", id: "about" },
      { label: "Skills", id: "skills" },
      { label: "Projects", id: "projects" },
      { label: "Contact", id: "contact" },
    ],
    [],
  );

  const scrollToId = (id: string) => {
    gsap.to(window, {
      duration: 1.2,
      ease: "expo.inOut",
      scrollTo: { y: `#${id}`, offsetY: 24 },
    });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[var(--border)] bg-transparent px-4 py-3 md:px-6">
        <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-full">{null}</GlassEffect>
        <button
          className="relative z-10 display-font flex items-center gap-3 text-left text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-primary)]"
          onClick={() => scrollToId("home")}
          data-cursor="link"
          data-cursor-fill="true"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-transparent text-base text-[var(--text-primary)]">
            <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-full">{null}</GlassEffect>
            <span className="relative z-10">S</span>
          </span>
          <span className="hidden md:block">Shiyan Sab</span>
        </button>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((link) => (
              <TextReveal
                key={link.id}
                as="button"
                text={link.label.toUpperCase()}
                onClick={() => scrollToId(link.id)}
                className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase"
                hoverColor="var(--text-primary)"
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ animateIn: _animateIn, reducedMotion }: { animateIn: boolean; reducedMotion: boolean }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <ParticleField reducedMotion={reducedMotion} />
      </div>
      <div className="relative z-10">
        <PrismaHero />
      </div>
    </div>
  );
}

function ResumeSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <section className="section-shell relative py-20 md:py-28">
      <div className="resume-card-panel relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-transparent p-6 shadow-xl md:p-10">
        <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[32px]">{null}</GlassEffect>
        <div className="absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle,var(--glow-blue),transparent_60%)]" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <SectionLabel label="Resume / Highlight" />
            <div className="mt-6 flex items-start gap-4">
              <div className="display-font flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--background)] text-2xl text-[var(--text-primary)]">
                S
              </div>
              <div>
                <h2 className="display-font text-3xl text-[var(--text-primary)] md:text-4xl uppercase">{resumeData.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--text-muted)]">
                  Digital Marketer · Developer · Creative Strategist
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)] uppercase">
              A polished resume experience designed like a product feature — quick to preview, easy to download, and detailed enough to explore in a distraction-free full-screen view.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="/shiyan-sab-resume.pdf" download className="btn-primary rounded-full px-6 py-3 text-sm font-medium text-white">
                <Download className="h-4 w-4" />
                <TextReveal text="Download PDF" as="span" hoverColor="white" />
              </MagneticButton>
              <MagneticButton className="btn-ghost rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)]" onClick={() => setOpen(true)}>
                <Eye className="h-4 w-4" />
                <TextReveal text="View Full Resume" as="span" hoverColor="white" />
              </MagneticButton>
            </div>
          </div>

          <div className="resume-preview relative rounded-[28px] border border-[var(--border)] bg-transparent p-5 md:p-6">
            <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[28px]">{null}</GlassEffect>
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-blue)]">Skills · Education · Projects</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">Signature preview</p>
              </div>
              <span className="orange-slash small" aria-hidden="true" />
            </div>
            <div className="relative mt-5 h-[220px] overflow-hidden rounded-[22px] border border-[var(--border)] bg-transparent p-5">
              <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[22px]">{null}</GlassEffect>
              <div className="relative z-10 space-y-4 blur-[1.8px] saturate-75">
                <div>
                  <h3 className="text-xl font-medium text-[var(--text-primary)]">Profile Summary</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{resumeData.summary}</p>
                </div>
                <div>
                  <h4 className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-blue)]">Core Skills</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {resumeData.skills.slice(0, 8).map((skill) => (
                      <span key={skill} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(180deg,transparent,var(--background))]" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-black/95 px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="grain-card relative w-full max-w-4xl rounded-[32px] border border-white/10 bg-transparent p-6 shadow-2xl md:p-10"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-5">
                <div>
                  <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-orange)]">Full Resume</p>
                  <h3 className="display-font mt-2 text-3xl text-white">{resumeData.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <MagneticButton href="/shiyan-sab-resume.pdf" download className="btn-primary rounded-full px-5 py-3 text-sm font-medium text-white">
                    <Download className="h-4 w-4" />
                    <TextReveal text="Download" as="span" hoverColor="white" />
                  </MagneticButton>
                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20"
                    onClick={() => setOpen(false)}
                    data-cursor="link"
                    data-cursor-fill="true"
                    aria-label="Close resume"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-8">
                  <div>
                    <p className="text-sm leading-7 text-[var(--text-muted)]">{resumeData.summary}</p>
                  </div>
                  <div>
                    <h4 className="display-font text-xl text-white">Contact</h4>
                    <div className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                      <p>{resumeData.location}</p>
                      <p>{resumeData.email}</p>
                      <p>{resumeData.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="display-font text-xl text-white">Skills</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <span key={skill} className="mono-font rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/90">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="display-font text-xl text-white">Languages</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {resumeData.languages.map((language) => (
                        <span key={language} className="rounded-full border border-white/10 px-3 py-2 text-sm text-[var(--text-muted)]">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2">
                  <div>
                    <h4 className="display-font text-xl text-white">Education</h4>
                    <div className="mt-5 space-y-5">
                      {resumeData.education.map((item) => (
                        <div key={`${item.degree}-${item.period}`} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h5 className="text-base font-medium text-white">{item.degree}</h5>
                            <span className="mono-font text-xs uppercase tracking-[0.24em] text-[var(--accent-orange)]">{item.period}</span>
                          </div>
                          {item.institution ? <p className="mt-2 text-sm text-[var(--text-muted)]">{item.institution}</p> : null}
                          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>• {bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="display-font text-xl text-white">Projects</h4>
                    <div className="mt-5 space-y-5">
                      {resumeData.projects.map((item) => (
                        <div key={item.name} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                          <h5 className="text-base font-medium text-white">{item.name}</h5>
                          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-muted)]">
                            {item.bullets.map((bullet) => (
                              <li key={bullet}>• {bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function AboutSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      counterRefs.current.forEach((element, index) => {
        const item = aboutStats[index];
        if (!element || !item) return;
        const state = { value: 0 };
        gsap.to(state, {
          value: item.value,
          duration: 1.5,
          ease: "power2.out",
          snap: { value: 1 },
          scrollTrigger: { trigger: element, start: "top 85%", once: true },
          onUpdate: () => {
            element.textContent = `${Math.ceil(state.value)}${item.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="section-shell about-section py-20 md:py-28">
      <div className="grid gap-14 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <SectionLabel label="01 / About" />
          <h2 className="display-font gradient-heading mt-6 text-[length:var(--text-xl)] leading-[0.95] tracking-[-0.03em] uppercase">
            Crafting Digital <br /> Narratives That <br /> Convert
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)] uppercase">
            I’m building my career at the intersection of marketing, technology, and storytelling. My focus is simple: understand the audience deeply, shape the right message, and translate ideas into digital experiences that feel polished, strategic, and measurable.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {aboutStats.map((stat, index) => (
              <div key={stat.label} className="relative rounded-[24px] border border-[var(--border)] bg-transparent p-5">
                <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[24px]">{null}</GlassEffect>
                <div className="relative z-10">
                  <span className="orange-slash small mb-4" aria-hidden="true" />
                  <div ref={(element) => { counterRefs.current[index] = element; }} className="display-font text-4xl text-[var(--text-primary)]">
                    0{stat.suffix}
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative rounded-[32px] border border-[var(--border)] bg-transparent p-6 md:p-8">
          <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[32px]">{null}</GlassEffect>
          <div className="absolute left-[23px] top-8 hidden h-[calc(100%-4rem)] w-6 md:block z-10">
            <svg className="h-full w-full" viewBox="0 0 24 420" fill="none" preserveAspectRatio="none">
              <path ref={pathRef} className="timeline-line" d="M12 0V420" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="relative z-10 space-y-8 md:pl-10">
            {aboutTimeline.map((item) => (
              <div key={`${item.year}-${item.title}`} className="relative rounded-[24px] border border-[var(--border)] bg-transparent p-5">
                <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[24px]">{null}</GlassEffect>
                <div className="absolute -left-[3.1rem] top-6 hidden h-4 w-4 rounded-full border-4 border-[var(--background-secondary)] bg-[var(--accent-blue)] md:block" />
                <div className="relative z-10">
                  <p className="mono-font text-xs uppercase tracking-[0.26em] text-[var(--accent-blue)]">{item.year}</p>
                  <h3 className="mt-3 text-lg font-black uppercase text-[var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)] uppercase">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ title, tags, percentage, icon }: (typeof skills)[number]) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[icon] ?? Sparkles;

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;

    gsap.to(card, {
      rotationY: x * 15,
      rotationX: -y * 15,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(glow, {
      x: `${x * 80}px`,
      y: `${y * 80}px`,
      opacity: 0.6,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const reset = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "elastic.out(1,0.5)",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={cardRef}
      className="skill-card group relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-transparent p-6"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[28px]">{null}</GlassEffect>
      <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow-blue),transparent_70%)] opacity-0" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Icon className="h-6 w-6 text-[var(--accent-blue)]" />
          <span className="mono-font text-[11px] tracking-[0.28em] text-[var(--accent-blue)] opacity-70">0{skills.findIndex((s) => s.title === title) + 1}</span>
        </div>
        <h3 className="display-font mt-6 text-2xl text-[var(--text-primary)] uppercase">{title}</h3>
        <p className="mono-font mt-3 text-[12px] leading-6 text-[var(--text-muted)] uppercase">{tags.join(" · ")}</p>
        <div className="mt-auto pt-10">
          <div className="flex items-center gap-3">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="skill-progress-fill h-full rounded-full bg-[linear-gradient(90deg,var(--accent-blue)_0%,var(--accent-purple)_60%,var(--accent-gold)_100%)]"
                data-width={`${percentage}%`}
                style={{ width: 0 }}
              />
            </div>
            <span className="mono-font text-sm text-[var(--text-primary)]">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        opacity: 0,
        y: 60,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".skill-progress-fill").forEach((fill) => {
        const targetWidth = fill.dataset.width ?? "0%";
        gsap.to(fill, {
          width: targetWidth,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: fill, start: "top 90%", once: true },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="skills" ref={sectionRef} className="section-shell skills-section py-20 md:py-28">
      <SectionLabel label="02 / Skills" />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="display-font gradient-heading text-[length:var(--text-xl)] leading-[0.96] tracking-[-0.03em] uppercase">What I Do Best</h2>
        <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)] uppercase">
          A hybrid toolkit shaped by performance thinking, visual storytelling, and the ability to move from insight to execution across digital platforms.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,1fr)]">
        {skills.map((skill, index) => {
          // Bento pattern: some cards span wider for visual rhythm
          const isLarge = index % 5 === 0;
          const isTall = index % 7 === 3;
          return (
            <div
              key={skill.title}
              className={cn(
                isLarge ? "sm:col-span-2" : "",
                isTall ? "sm:row-span-1" : "",
              )}
            >
              <SkillCard {...skill} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ExperienceSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !trackRef.current || !progressRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!track || !progress) return;

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: experiences.length > 1 ? 1 / (experiences.length - 1) : 1,
          end: () => `+=${getDistance()}`,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="experience-section relative overflow-hidden py-20 md:py-28">
      <div className="section-shell mb-10">
        <SectionLabel label="03 / Experience" />
        <h2 className="display-font gradient-heading mt-6 text-[length:var(--text-xl)] leading-[0.96] tracking-[-0.03em] uppercase">Journey So Far</h2>
      </div>
      <div className="experience-track flex gap-5 px-4 md:px-6" ref={trackRef}>
        {experiences.map((item, index) => (
          <article key={item.title} className="exp-card relative flex min-h-[60vh] w-[86vw] shrink-0 flex-col justify-between rounded-[32px] border border-[var(--border)] bg-transparent p-6 md:w-[34rem] md:p-10">
            <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[32px]">{null}</GlassEffect>
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4">
                <span className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-blue)]">{item.year}</span>
                <span className="text-sm text-[var(--text-faint)]">0{index + 1}</span>
              </div>
              <h3 className="display-font mt-8 text-3xl text-[var(--text-primary)] uppercase">{item.title}</h3>
              <p className="mt-4 text-lg text-[var(--text-secondary)] uppercase">{item.subtitle}</p>
            </div>
            <p className="relative z-10 max-w-md text-base leading-8 text-[var(--text-muted)] uppercase">{item.description}</p>
          </article>
        ))}
      </div>
      <div className="section-shell mt-8">
        <div className="h-[2px] w-full bg-[var(--border)]">
          <div ref={progressRef} className="h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent-blue)_0%,var(--accent-purple)_100%)]" />
        </div>
      </div>
    </section>
  );
}



function VideoShowcaseCard({
  item,
  index,
  registerVideo,
}: {
  item: any;
  index: number;
  registerVideo: (element: HTMLVideoElement | null, index: number) => void;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <article className="video-exp-card relative w-[clamp(11rem,48vw,14rem)] shrink-0 rounded-[28px] border border-[var(--border)] bg-transparent p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] will-change-transform md:w-[13rem] lg:w-[14rem]">
      <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[28px]">{null}</GlassEffect>
      <div className="relative z-10 aspect-[9/16] overflow-hidden rounded-[22px] border border-white/8 bg-black p-1.5">
        <video
          ref={(element) => registerVideo(element, index)}
          className={cn(
            "h-full w-full object-contain transition duration-700",
            missing ? "opacity-0" : "opacity-100",
          )}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setMissing(false)}
          onError={() => setMissing(true)}
        >
          <source src={item.src} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),transparent_35%,rgba(0,0,0,0.72)_100%)]" />

        {missing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(180deg,rgba(17,17,17,0.96),rgba(17,17,17,0.92))] p-6 text-center">
            <span className="display-font text-5xl text-white/15">S</span>
            <div>
              <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-blue)]">Missing Video</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] uppercase">Add <span className="mono-font text-white">{item.fileName}</span> to <span className="mono-font text-white">/public/videos</span>.</p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function VideoExperienceSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !trackRef.current || !progressRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!track || !progress) return;

      const cards = gsap.utils.toArray<HTMLElement>(".video-exp-card");
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const updateCardFocus = () => {
        const viewportCenter = window.innerWidth / 2;
        const focusRadius = window.innerWidth * 0.36;
        const baseScale = window.innerWidth < 768 ? 0.76 : 0.68;
        const activeScale = window.innerWidth < 768 ? 1.18 : 1.48;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(viewportCenter - cardCenter);
          const focus = gsap.utils.clamp(0, 1, 1 - distance / focusRadius);

          gsap.set(card, {
            scale: baseScale + (activeScale - baseScale) * focus,
            opacity: 0.38 + 0.62 * focus,
            y: (1 - focus) * 32,
            zIndex: Math.round(focus * 100),
          });
        });
      };

      gsap.set(cards, {
        scale: 0.68,
        opacity: 0.38,
        transformOrigin: "center center",
      });

      gsap.fromTo(
        track,
        { x: () => -getDistance() },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            pin: true,
            scrub: true,
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            onUpdate: updateCardFocus,
            onRefresh: updateCardFocus,
          },
        },
      );

      requestAnimationFrame(updateCardFocus);

      gsap.to(progress, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "right center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Text exit animation
      gsap.to(headerRef.current, {
        y: -180,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 88%",
          scrub: true,
        },
      });

      gsap.to(footerRef.current, {
        y: 120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top 88%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const videos = videoRefs.current.filter((video): video is HTMLVideoElement => video !== null);
    if (videos.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            const playback = video.play();
            if (playback !== undefined) {
              playback.catch(() => undefined);
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.05, 0.2, 0.35, 0.6] },
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  const registerVideo = (element: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = element;
  };

  return (
    <section id="videos" ref={sectionRef} className="video-experience-section relative z-20 h-screen overflow-hidden bg-[var(--bg)]">
      <div ref={headerRef} className="section-shell pointer-events-none absolute left-0 right-0 top-8 z-10 transition-all duration-500">
        <SectionLabel label="04 / Video Experience" />
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-font gradient-heading mt-6 text-[length:var(--text-xl)] leading-[0.96] tracking-[-0.03em] uppercase">Visual Stories in Motion</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] uppercase">
              A dedicated reel wall for 31 videos — built with a cinematic pinned-scroll feel, moving from left to right as you scroll.
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="mono-font text-[11px] uppercase tracking-[0.28em] text-[var(--text-muted)]">31 videos · autoplay when visible · muted inline playback</p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "video-experience-track absolute left-0 top-1/2 flex h-screen -translate-y-1/2 items-center gap-4 px-[calc(50vw-5.5rem)] md:gap-6 md:px-[calc(50vw-6.5rem)] lg:px-[calc(50vw-7rem)]",
          reducedMotion ? "overflow-x-auto pb-4" : "",
        )}
        ref={trackRef}
      >
        {videoShowcase.map((item, index) => (
          <VideoShowcaseCard key={item.id} item={item} index={index} registerVideo={registerVideo} />
        ))}
      </div>

      <div ref={footerRef} className="section-shell pointer-events-none absolute bottom-6 left-0 right-0 z-10 transition-all duration-500">
        <div className="h-[2px] w-full bg-white/10">
          <div ref={progressRef} className="h-[2px] origin-right scale-x-0 bg-[linear-gradient(90deg,#8b5cf6_0%,#3b82f6_100%)]" />
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ project }: { project: ProjectItem }) {
  return (
    <div
      className="project-image relative h-full w-full overflow-hidden rounded-[30px] border border-white/8 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:h-full"
      style={{ background: `linear-gradient(135deg, ${project.accentFrom}22 0%, ${project.accentTo}12 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: `radial-gradient(circle at 20% 20%, ${project.accentFrom}55 0%, transparent 35%), radial-gradient(circle at 80% 80%, ${project.accentTo}55 0%, transparent 30%)` }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,8,8,0.65),rgba(8,8,8,0.2))] p-4 md:p-6">
        <div className="flex items-center justify-between">
          <span className="mono-font rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.28em] text-white/80">
            {project.category}
          </span>
          <ArrowUpRight className="h-5 w-5 text-white/60 transition duration-300 group-hover:text-white" />
        </div>
        <div className="relative rounded-[24px] border border-[var(--border)] bg-transparent p-5 md:p-8">
          <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[24px]">{null}</GlassEffect>
          <div className="relative z-10 mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#3b82f6]" />
            <span className="h-3 w-3 rounded-full bg-[#8b5cf6]" />
            <span className="h-3 w-3 rounded-full bg-white/30" />
          </div>
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
              <div className="h-4 w-24 rounded-full bg-white/10" />
              <div className="grid gap-3">
                <div className="h-16 rounded-2xl bg-[linear-gradient(90deg,rgba(59,130,246,0.25),rgba(255,255,255,0.08))]" />
                <div className="h-24 rounded-2xl bg-white/8" />
                <div className="h-12 rounded-2xl bg-white/8" />
              </div>
            </div>
            <div className="space-y-4 rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
              <div className="h-28 rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(59,130,246,0.18))]" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-2xl bg-white/10" />
                <div className="h-14 rounded-2xl bg-white/10" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
          <span>{project.mockLabel}</span>
          <span className="mono-font uppercase tracking-[0.26em] text-[var(--accent-orange)]">Preview</span>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!activeProject) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProject]);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const image = card.querySelector<HTMLElement>(".project-image");
        if (!image) return;
        gsap.from(image, {
          clipPath: "inset(0 100% 0 0 round 30px)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: card, start: "top 65%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="projects" ref={sectionRef} className="section-shell py-20 md:py-28">
      <SectionLabel label="05 / Projects" />
      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="display-font gradient-heading text-[length:var(--text-xl)] leading-[0.96] tracking-[-0.03em] uppercase">Selected Work</h2>
        <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)] uppercase">
          Strategic projects that connect design, growth, research, and execution into outcomes that feel both creative and commercially useful.
        </p>
      </div>
      <div className="mt-12 space-y-10 md:space-y-16">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-card group relative flex flex-col md:flex-row items-stretch rounded-[32px] border border-white/8 bg-transparent overflow-hidden"
          >
            <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[32px]">{null}</GlassEffect>
            <button
              type="button"
              className={cn("relative w-full md:w-1/2 min-h-[320px] md:min-h-[500px]", index % 2 === 1 ? "md:order-2" : "")}
              onClick={() => setActiveProject(project)}
              data-cursor="view"
            >
              <ProjectVisual project={project} />
            </button>
            <div className={cn("flex flex-col justify-center p-6 md:p-10 w-full md:w-1/2 uppercase", index % 2 === 1 ? "md:order-1" : "")}>
              <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-orange)]">{project.category}</p>
              <h3 className="display-font mt-4 text-4xl leading-[0.98] text-white uppercase">{project.name}</h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)] uppercase">{project.description}</p>
              <p className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-7 text-white/85 uppercase">{project.result}</p>
              <div className="mt-6 flex flex-wrap gap-2 uppercase">
                {project.stack.map((item) => (
                  <span key={item} className="mono-font rounded-full border border-white/10 px-3 py-2 text-xs text-white/80 uppercase">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton className="btn-primary rounded-full px-6 py-3 text-sm font-medium text-white" onClick={() => setActiveProject(project)} cursorMode="view">
                  <TextReveal text="View Details" as="span" hoverColor="white" />
                </MagneticButton>
                {project.link ? (
                  <MagneticButton href={project.link} className="btn-ghost rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)]" target="_blank" rel="noreferrer">
                    <TextReveal text="Visit Link" as="span" hoverColor="white" />
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[96] flex items-end justify-center bg-black/80 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl rounded-t-[32px] border border-white/10 bg-[var(--surface)] p-6 md:p-10"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 md:right-6 md:top-6"
                onClick={() => setActiveProject(null)}
                data-cursor="link"
                data-cursor-fill="true"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <ProjectVisual project={activeProject} />
                <div>
                  <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--accent-orange)]">{activeProject.category}</p>
                  <h3 className="display-font mt-4 text-4xl leading-[0.98] text-white">{activeProject.name}</h3>
                  <p className="mt-5 text-base leading-8 text-[var(--text-muted)]">{activeProject.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeProject.stack.map((item) => (
                      <span key={item} className="mono-font rounded-full border border-white/10 px-3 py-2 text-xs text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
                    <h4 className="display-font text-xl text-white">Key Outcomes</h4>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{activeProject.result}</p>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                      {activeProject.details.map((detail) => (
                        <li key={detail}>• {detail}</li>
                      ))}
                    </ul>
                  </div>
                  {activeProject.link ? (
                    <div className="mt-8">
                      <MagneticButton href={activeProject.link} className="btn-primary rounded-full px-6 py-3 text-sm font-medium text-white" target="_blank" rel="noreferrer">
                        <TextReveal text="Open Live Project" as="span" hoverColor="white" />
                        <ArrowUpRight className="h-4 w-4" />
                      </MagneticButton>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const trackItems = [...items, ...items];

  return (
    <div className="marquee-row">
      <div className={cn("marquee-inner", reverse ? "marquee-right" : "marquee-left")}>
        {trackItems.map((item, index) => (
          <span key={`${item}-${index}`} className={cn("display-font text-[32px] font-medium md:text-[40px]", index % 2 === 0 ? "text-white" : "text-[var(--accent-orange)]")}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarqueeSection() {
  return (
    <section className="overflow-hidden border-y border-white/8 py-10 md:py-14">
      <MarqueeRow items={marqueePrimary} />
      <div className="my-6" />
      <MarqueeRow items={marqueeSecondary} reverse />
    </section>
  );
}

function ContactSection() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Brand Strategy", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      scale: 0.95,
      backgroundColor: "#22c55e",
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    setSuccess(true);
    const subject = encodeURIComponent(`${formData.subject} — Portfolio Enquiry`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    window.setTimeout(() => {
      window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_self");
    }, 350);
  };

  const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shiyansab/",
    icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  },
  {
    label: "Instagram",
    href: "#", // apna Instagram URL yahan daal dena
    icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
  },
  {
    label: "Gmail",
    href: "mailto:shiyansab486@gmail.com",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
  },
  {
    label: "GitHub",
    href: "https://github.com/shiyansab486-creator",
    icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
  },
];
  return (
    <section id="contact" className="section-shell py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <SectionLabel label="07 / Contact" />
          <h2 className="display-font gradient-heading mt-6 text-[length:var(--text-xl)] leading-[0.96] tracking-[-0.03em] uppercase">Let&apos;s Build Something</h2>
          <p className="mt-5 max-w-md text-base leading-8 text-[var(--text-muted)] uppercase">Have a project in mind? Let&apos;s talk.</p>
          <div className="mt-10 space-y-5 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[var(--accent-orange)]" />
              <a href={`mailto:${profile.email}`} className="transition hover:text-white" data-cursor="link" data-cursor-fill="true">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[var(--accent-orange)]" />
              <a href={`tel:${resumeData.phone}`} className="transition hover:text-white" data-cursor="link" data-cursor-fill="true">
                {profile.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[var(--accent-orange)]" />
              <span>Mangaluru, Karnataka</span>
            </div>
          </div>
          <div className="mt-8">
  <p className="mono-font mb-4 text-[11px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
    Social Links
  </p>

  <div className="flex flex-wrap gap-3">
    {socialLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
        rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="group relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-transparent transition hover:scale-110 hover:border-[var(--accent-blue)]"
        data-cursor="link"
        data-cursor-fill="true"
        aria-label={link.label}
        title={link.label}
      >
        <GlassEffect
          as="div"
          className="absolute inset-0 z-0 rounded-2xl"
        >
          {null}
        </GlassEffect>

        <img
          src={link.icon}
          alt={link.label}
          className="relative z-10 h-7 w-7 object-contain transition group-hover:brightness-125"
        />
      </a>
    ))}
  </div>
</div>
        </div>

        <form onSubmit={handleSubmit} className="relative rounded-[32px] border border-white/8 bg-[var(--surface)] p-6 md:p-8">
          <GlassEffect as="div" className="absolute inset-0 z-[-1] rounded-[32px]">{null}</GlassEffect>
          <div className="relative z-10 grid gap-5 md:grid-cols-2">
            <div className="floating-field md:col-span-1">
              <input
                id="name"
                className="input-field"
                placeholder=" "
                value={formData.name}
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                required
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="floating-field md:col-span-1">
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder=" "
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="floating-field md:col-span-2">
              <select
                id="subject"
                className="input-field"
                value={formData.subject}
                onChange={(event) => setFormData((current) => ({ ...current, subject: event.target.value }))}
                aria-label="Subject"
              >
                <option>Brand Strategy</option>
                <option>Web Dev</option>
                <option>Videography</option>
                <option>Content</option>
                <option>Other</option>
              </select>
              <label htmlFor="subject" className="floating-static">Subject</label>
            </div>
            <div className="floating-field md:col-span-2">
              <textarea
                id="message"
                className="input-field min-h-[180px] resize-none"
                placeholder=" "
                value={formData.message}
                onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                required
              />
              <label htmlFor="message">Message</label>
            </div>
          </div>
          <div className="mt-6" ref={buttonRef as any}>
            <MagneticButton
              type="submit"
              className="send-btn btn-primary w-full rounded-full px-6 py-4 text-sm font-medium text-white"
            >
              <TextReveal text={success ? "Message Ready" : "Send Message"} as="span" hoverColor="white" />
            </MagneticButton>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
            This MVP opens your email client with the project details pre-filled so you can send instantly.
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const backToTop = () => {
    gsap.to(window, { duration: 1.2, ease: "expo.inOut", scrollTo: 0 });
  };

  return (
    <footer className="section-shell pb-12 pt-8">
      <div className="rounded-[32px] border border-white/8 bg-[var(--surface)] p-6 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="display-font flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-white">
              S
            </div>
            <div>
              <div className="display-font text-xl text-white">SHIYAN SAB</div>
              <p className="mt-2 text-sm uppercase text-[var(--text-muted)]">© 2025 AHAMMAD SHIYAN SAB</p>

            </div>
          </div>
        </div>
        <div className="my-8 h-px w-full bg-[linear-gradient(90deg,rgba(59,130,246,1),rgba(139,92,246,0.8),rgba(212,175,55,0.5),transparent)]" />
        <div className="flex justify-center">
          <button
            type="button"
            onClick={backToTop}
            className="mono-font inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] transition hover:text-white"
            data-cursor="link"
            data-cursor-fill="true"
          >
            <ArrowUpRight className="h-4 w-4 rotate-[-45deg]" />
            <TextReveal text="Back to Top" as="span" hoverColor="white" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [showLoader, setShowLoader] = useState<boolean | null>(null);

  useEffect(() => {
    // Always start from the login/loader page on reload
    setShowLoader(!reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
      gestureOrientation: "vertical",
    });

    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  if (showLoader === null) {
    return <div className="min-h-screen bg-[var(--bg)]" />;
  }

  return (
    <>
      <GlassFilter />
      <PrismaBackground />
      <ScrollProgress />
      <Cursor reducedMotion={reducedMotion} />
      <AnimatePresence>{showLoader ? <Loader onDone={() => setShowLoader(false)} /> : null}</AnimatePresence>
      <Navbar />
      <motion.main
        className="relative z-10 force-caps"
        initial={reducedMotion ? undefined : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <HeroSection animateIn={!showLoader} reducedMotion={reducedMotion} />
        <ResumeSection />
        <AboutSection reducedMotion={reducedMotion} />
        <SkillsSection reducedMotion={reducedMotion} />
        <ExperienceSection reducedMotion={reducedMotion} />
        <VideoExperienceSection reducedMotion={reducedMotion} />
        <ProjectsSection reducedMotion={reducedMotion} />
        <MarqueeSection />
        <ContactSection />
        <Footer />
      </motion.main>
    </>
  );
}
