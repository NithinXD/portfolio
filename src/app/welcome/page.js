 'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

const TEXT_WELCOME = "Hi! Welcome to my portfolio\nPage";
const TEXT_MENU = "What would you like to\ntake a look at?";
const MENU_ITEMS = ['About', 'My  Works', 'Get in Touch'];

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

function Lines({ text }) {
  return text.split('\n').map((line, i, a) => (
    <span key={i}>{line}{i < a.length - 1 && <br />}</span>
  ));
}

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

export default function Welcome() {
  const router = useRouter();
  const [phase, setPhase] = useState('welcome');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIn, setMenuIn] = useState(false);
  const [hovered, setHovered] = useState(0);
  const typer = useTypewriter(52);

  useEffect(() => { typer.start(TEXT_WELCOME); }, []); // eslint-disable-line

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

  return (
    <main className={styles.main}>
      <div className={styles.scene}>
        <div
          className={`${styles.mapIcon} ${menuOpen ? styles.mapVanish : ''}`}
          onClick={() => window.location.href = '/map'}
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
    </main>
  );
}
