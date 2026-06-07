'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const TEXT_WELCOME = 'Hi! Welcome to portfolio page';
const TEXT_MENU = "What would you like to\ntake a look at?";
const MENU_ITEMS = ['About', 'My  Works', 'Get in Touch'];

/* ── Typewriter hook ── */
function useTypewriter(speed = 52) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timer = useRef(null);
  const idx = useRef(0);
  const full = useRef('');

  const start = useCallback((text) => {
    clearInterval(timer.current);
    full.current = text;
    idx.current = 0;
    setDisplayed('');
    setDone(false);
    timer.current = setInterval(() => {
      idx.current++;
      setDisplayed(full.current.slice(0, idx.current));
      if (idx.current >= full.current.length) {
        clearInterval(timer.current);
        setDone(true);
      }
    }, speed);
  }, [speed]);

  const skip = useCallback(() => {
    clearInterval(timer.current);
    setDisplayed(full.current);
    setDone(true);
  }, []);

  useEffect(() => () => clearInterval(timer.current), []);
  return { displayed, done, start, skip };
}

/* ── Render text preserving \n ── */
function Lines({ text }) {
  return text.split('\n').map((line, i, a) => (
    <span key={i}>{line}{i < a.length - 1 && <br />}</span>
  ));
}

/* ── SVG Rounded Triangle ── */
const RoundedTriangle = ({ className = "", rotate = false }) => (
  <svg
    viewBox="0 0 24 24"
    className={`${styles.roundedTriangle} ${className}`}
    stroke="currentColor"
    strokeWidth="4"
    strokeLinejoin="round"
    fill="currentColor"
    style={{ transform: rotate ? 'rotate(-90deg)' : 'none' }}
  >
    <polygon points="4,6 20,6 12,20" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [introPhase, setIntroPhase] = useState('loading');
  const [phase, setPhase] = useState('welcome');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIn, setMenuIn] = useState(false);
  const [hovered, setHovered] = useState(0);
  const typer = useTypewriter(52);

  // ==================== VIDEO / SCROLL REFS ====================
  const phaseRef = useRef(introPhase);
  const loopStartRef = useRef(0);
  const handoffTimeRef = useRef(0);
  const virtualScrollRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const lastTouchYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const PING_PONG_SECONDS = 1.0;
  const SMOOTHNESS = 0.08;           // 0.05 = heavy glide, 0.15 = snappy
  const MAX_VIRTUAL_SCROLL = 4000; // "pixels" of wheel/touch to reach video end
  // ==============================================================

  // Sync phase ref for rAF
  useEffect(() => { phaseRef.current = introPhase; }, [introPhase]);

  // Typewriter on home
  useEffect(() => {
    if (introPhase === 'home') typer.start(TEXT_WELCOME);
  }, [introPhase, typer]);

  // Video metadata loaded → start ping-pong
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      video.currentTime = 0;
      video.pause();
      loopStartRef.current = performance.now();
      setIntroPhase('looping');
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener('loadedmetadata', onMeta);

    return () => video.removeEventListener('loadedmetadata', onMeta);
  }, []);

  // Dimming → Home transition
  useEffect(() => {
    if (introPhase !== 'dimming') return;
    fadeTimerRef.current = window.setTimeout(() => {
      // Navigate safely: if router isn't ready, fall back to location change
      try {
        if (router && typeof router.replace === 'function') {
          router.replace('/welcome');
        } else {
          window.location.href = '/welcome';
        }
      } catch (err) {
        // Fallback navigation avoids uncaught Next.js internal error
        console.warn('Router replace failed, falling back to location.href', err);
        try { window.location.href = '/welcome'; } catch (e) { /* ignore */ }
      }
    }, 1800);
    return () => { if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current); };
  }, [introPhase, router]);

  // ==================== MAIN ANIMATION LOOP ====================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const step = () => {
      const current = phaseRef.current;

      if (current === 'home') {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      if (current === 'looping') {
        const elapsed = (performance.now() - loopStartRef.current) / 1000;
        const cycle = PING_PONG_SECONDS * 2;
        const t = elapsed % cycle;
        const nextTime = t < PING_PONG_SECONDS ? t : cycle - t;
        const clamped = Math.max(0, Math.min(PING_PONG_SECONDS, nextTime));

        video.currentTime = clamped;
        smoothTimeRef.current = clamped;
        targetTimeRef.current = clamped;
      }

      if (current === 'scrolling') {
        // Smooth lerp: current chases target
        const diff = targetTimeRef.current - smoothTimeRef.current;
        smoothTimeRef.current += diff * SMOOTHNESS;
        video.currentTime = smoothTimeRef.current;

        // Reached end → dimming
        if (video.duration > 0 && smoothTimeRef.current >= video.duration - 0.05) {
          video.currentTime = video.duration;
          setIntroPhase('dimming');
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ==================== INPUT HANDLERS ====================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const beginScrollMode = () => {
      const p = phaseRef.current;
      if (p === 'home' || p === 'dimming' || p === 'scrolling') return;

      // Capture exact handoff frame
      handoffTimeRef.current = video.currentTime;
      virtualScrollRef.current = 0;
      smoothTimeRef.current = handoffTimeRef.current;
      targetTimeRef.current = handoffTimeRef.current;

      setIntroPhase('scrolling');
    };

    const onWheel = (e) => {
      if (phaseRef.current === 'home' || phaseRef.current === 'dimming') return;
      e.preventDefault();
      beginScrollMode();

      // Accumulate virtual scroll (like scrollY)
      virtualScrollRef.current += e.deltaY;
      virtualScrollRef.current = Math.max(0, virtualScrollRef.current);

      // Map to video time
      const progress = Math.min(1, virtualScrollRef.current / MAX_VIRTUAL_SCROLL);
      const remaining = video.duration - handoffTimeRef.current;
      targetTimeRef.current = handoffTimeRef.current + (progress * remaining);
    };

    const onTouchStart = (e) => {
      if (phaseRef.current === 'home') return;
      isDraggingRef.current = true;
      lastTouchYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || phaseRef.current === 'home') return;
      if (!e.touches.length) return;
      e.preventDefault();
      beginScrollMode();

      const y = e.touches[0].clientY;
      const delta = lastTouchYRef.current - y; // natural scroll direction
      lastTouchYRef.current = y;

      virtualScrollRef.current += delta;
      virtualScrollRef.current = Math.max(0, virtualScrollRef.current);

      const progress = Math.min(1, virtualScrollRef.current / MAX_VIRTUAL_SCROLL);
      const remaining = video.duration - handoffTimeRef.current;
      targetTimeRef.current = handoffTimeRef.current + (progress * remaining);
    };

    const onTouchEnd = () => { isDraggingRef.current = false; };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // ==================== UI HANDLERS ====================
  const handleClick = () => {
    if (!typer.done) { typer.skip(); return; }
    if (phase === 'welcome') {
      setPhase('menu');
      setMenuOpen(true);
      setTimeout(() => setMenuIn(true), 1500);
      typer.start(TEXT_MENU);
    }
  };

  useEffect(() => {
    if (phase !== 'menu') return;
    const fn = (e) => {
      if (e.key === 'ArrowDown') setHovered(h => (h + 1) % MENU_ITEMS.length);
      if (e.key === 'ArrowUp') setHovered(h => (h - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [phase]);

  // ==================== RENDER ====================
  return (
    <main className={styles.main}>
      <div className={`${styles.homeStage} ${introPhase === 'home' ? styles.homeStageVisible : styles.homeStageLocked}`}>
        {/* ── SCENE ── */}
        <div className={styles.scene}>
          <div
            className={`${styles.mapIcon} ${menuOpen ? styles.mapVanish : ''}`}
            onClick={() => router.push('/map')}
            role="button"
            aria-label="Open map"
            style={{cursor: 'pointer'}}
          >
            <img src="/map-icon.png" alt="Map icon" draggable={false} />
          </div>

          <div className={styles.character}>
            <img
              src="/sprite-cropped.png"
              alt="Nithin"
              className={styles.characterImg}
              draggable={false}
            />
          </div>

          {menuOpen && (
            <div className={`${styles.menuModal} ${menuIn ? styles.menuModalIn : ''}`}>
              <div className={styles.menuInner}>
                {MENU_ITEMS.map((item, i) => (
                  <div
                    key={item}
                    className={`${styles.menuItem} ${hovered === i ? styles.menuItemActive : ''}`}
                    onMouseEnter={() => setHovered(i)}
                    onClick={() => { if (item === 'About') router.push('/about'); }}
                  >
                    <span className={styles.menuArrow}>
                      {hovered === i ? <RoundedTriangle rotate={true} /> : '\u00A0\u00A0'}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── DIALOG BOX ── */}
        <div className={styles.dialogBox} onClick={handleClick}>
          <div className={styles.dialogContent}>
            <p className={styles.dialogText}>
              {phase === 'welcome' && (
                <>
                  <Lines text={typer.displayed} />
                  {typer.done && (
                    <>
                      {' '}
                      <span className={styles.floatArrow}><RoundedTriangle /></span>
                      <span className={styles.clickHint}> ✦Click Me</span>
                    </>
                  )}
                  {!typer.done && <span className={styles.cursor} />}
                </>
              )}
              {phase === 'menu' && (
                <>
                  <Lines text={typer.displayed} />
                  {typer.done && <span className={styles.floatArrow}><RoundedTriangle /></span>}
                  {!typer.done && <span className={styles.cursor} />}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── INTRO OVERLAY ── */}
      <div className={`${styles.introOverlay} ${introPhase === 'dimming' || introPhase === 'home' ? styles.introOverlayDimmed : ''} ${introPhase === 'home' ? styles.introOverlayHidden : ''}`}>
        <video
          ref={videoRef}
          id="intro-video"
          className={`${styles.introVideo} ${(introPhase === 'dimming' || introPhase === 'home') ? styles.introVideoDimmed : ''}`}
          muted
          playsInline
          preload="auto"
          src="/introvidi.mp4"
        />
        <div className={`${styles.introShade} ${introPhase === 'dimming' || introPhase === 'home' ? styles.introShadeActive : ''}`} />
        <div className={`${styles.introCopy} ${introPhase === 'home' ? styles.introCopyHidden : ''}`}>
          <span>Scroll to enter</span>
        </div>
      </div>
    </main>
  );
}