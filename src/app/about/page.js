"use client";

import { useRef, useState, useEffect } from 'react';
import styles from './page.module.css';
import MobileAboutCard from './MobileAboutCard';

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [openPokes, setOpenPokes] = useState([false, false, false, false, false, false]);
  const [isMobile, setIsMobile] = useState(false);
  const tiltRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check initially
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const togglePoke = (index) => {
    setOpenPokes(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const updatePointerPosition = (event) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratioX = (event.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const ratioY = (event.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    el.style.setProperty('--ratio-x', ratioX);
    el.style.setProperty('--ratio-y', ratioY);
  };

  const resetPointerPosition = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--ratio-x', 0);
    el.style.setProperty('--ratio-y', 0);
  };

  if (isMobile) {
    return <MobileAboutCard />;
  }

  return (
    <main className={styles.page}>

      {/* ── TILT WRAPPER: handles mouse-tilt rotateX/Y ── */}
      <div
        ref={tiltRef}
        className={styles.tiltWrapper}
        onPointerMove={updatePointerPosition}
        onPointerLeave={resetPointerPosition}
      >

        {/* ── HOVER FLIP ZONES ── */}
        {!isFlipped && (
          <div 
            className={`${styles.flipZone} ${styles.rightFlipZone}`} 
            onClick={() => setIsFlipped(true)}
          >
            <span className={styles.flipText}>Flip?</span>
          </div>
        )}
        {isFlipped && (
          <div 
            className={`${styles.flipZone} ${styles.leftFlipZone}`} 
            onClick={() => setIsFlipped(false)}
          >
            <span className={styles.flipText}>Flip?</span>
          </div>
        )}

        {/* ── FLIP CONTAINER: exactly .container from CodePen ── */}
        <div className={`${styles.flipContainer} ${isFlipped ? styles.flipped : ''}`}>

          {/* ══ FRONT FACE ══ */}
          <section className={styles.cardFront}>
            <div className={styles.holoBg} />
            <div className={styles.holoLines} />
            <div className={styles.circles} />

            <div className={styles.cardContent}>
              <div className={styles.header}>
                <div className={styles.headerLines}>
                  <div className={styles.headerLine} />
                  <div className={styles.headerTitle}>TRAINER CARD</div>
                  <div className={styles.headerLine} />
                </div>
                <div className={styles.headerBadge}>ID No. : 2413</div>
              </div>

              <div className={styles.body}>
                <div className={styles.contactList}>
                  <div className={`${styles.contactRow} ${styles.nameRow}`}>
                    <span className={styles.contactIcon}><img src="/ball18.webp" alt="name" /></span>
                    <span className={styles.contactLabel}>Name :</span>
                    <span className={styles.contactValue}>NITHIN D</span>
                  </div>
                  <a className={styles.contactRow} href="https://www.linkedin.com/in/nithin-deepak-82231a301/" target="_blank" rel="noreferrer">
                    <span className={styles.contactIcon}><img src="/ball18.webp" alt="linkedin" /></span>
                    <span className={styles.contactLabel}>LinkedIn :</span>
                    <span className={styles.contactValue}>Nithin-Deepak-82231a301</span>
                  </a>
                  <a className={styles.contactRow} href="https://github.com/NithinxD" target="_blank" rel="noreferrer">
                    <span className={styles.contactIcon}><img src="/ball18.webp" alt="github" /></span>
                    <span className={styles.contactLabel}>Github  :</span>
                    <span className={styles.contactValue}>NithinXD</span>
                  </a>
                  <a className={styles.contactRow} href="mailto:nithindeepak2004@gmail.com" target="_blank" rel="noreferrer">
                    <span className={styles.contactIcon}><img src="/ball18.webp" alt="mail" /></span>
                    <span className={styles.contactLabel}>Mail :</span>
                    <span className={styles.contactValue}>nithindeepak2004</span>
                  </a>
                </div>

                <img className={styles.profile} src="/final__1_-removebg-preview.png" alt="profile" />

                <div className={styles.arcsContainer}>
                  <div className={styles.arcOuter} />
                  <div className={styles.arcInner} />
                </div>
              </div>

              <div className={styles.footer}>
                <div className={styles.footerTrackLines}>
                  <div className={styles.footerTrackLine} />
                  <div className={styles.footerTrackLine} />
                  <div className={styles.footerTrackLine} />
                </div>
                <div className={styles.footerNodes}>
                  <div className={styles.node}><img src="/flutter-logo-png_seeklogo-354671.webp" alt="flutter" /></div>
                  <div className={styles.node}><img src="/React.webp" alt="react" /></div>
                  <div className={styles.node}><img src="/ml_py_icon.png" alt="ml" /></div>
                  <div className={styles.node}><img src="/Node.webp" alt="node" /></div>
                  <div className={styles.node}><img src="/Kubernetes.webp" alt="k8s" /></div>
                  <div className={styles.node}><img src="/uiux.webp" alt="UI/UX" /></div>
                  <div className={styles.node}><img src="/langchain-icon-logo-png_seeklogo-611655.webp" alt="langchain" /></div>
                  <div className={styles.node}><img src="/fastapi.webp" alt="fastapi" /></div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ BACK FACE ══ */}
          <section className={styles.cardBack}>
            <div className={styles.backContent}>
              <div className={styles.backHeader}>
                <div className={styles.headerLines}>
                  <div className={styles.headerLine} />
                  <div className={styles.headerTitle}>TRAINER:     Nithin D</div>
                  <div className={styles.headerLine} />
                </div>
              </div>

              <div className={styles.backBody}>
                <div className={styles.backText}>
                  <p>Hi, I'm Nithin & I build apps that ship, scale,</p>
                  <p>and actually make it to the store. 2+ years turning</p>
                  <p>ideas into production-ready mobile experiences</p>
                  <p>across Android, iOS, and AI systems.</p>
                  <p>From fleet-tracking platforms to international</p>
                  <p>markets, I don't just write code — I deliver.</p>
                </div>
                <img className={styles.backProfile} src="/8bit.png" alt="Nithin avatar" />
              </div>

              <div className={styles.footer}>
                <div className={styles.footerTrackLines}>
                  <div className={styles.footerTrackLine} />
                  <div className={styles.footerTrackLine} />
                  <div className={styles.footerTrackLine} />
                </div>
                <div className={styles.footerLabels}>
                  <div className={styles.pokeItem} onClick={() => togglePoke(0)} style={{ cursor: 'pointer' }}>
                    <img src={openPokes[0] ? "/openpoke.png" : "/closepoke.png"} alt="poke" className={styles.pokeImg} />
                    <div className={styles.footerLabel} style={{ opacity: openPokes[0] ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>Website<br/>Dev</div>
                  </div>
                  <div className={styles.pokeItem} onClick={() => togglePoke(1)} style={{ cursor: 'pointer' }}>
                    <img src={openPokes[1] ? "/openpoke.png" : "/closepoke.png"} alt="poke" className={styles.pokeImg} />
                    <div className={styles.footerLabel} style={{ opacity: openPokes[1] ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>Mobile<br/>Apps</div>
                  </div>
                  <div className={styles.pokeItem} onClick={() => togglePoke(2)} style={{ cursor: 'pointer' }}>
                    <img src={openPokes[2] ? "/openpoke.png" : "/closepoke.png"} alt="poke" className={styles.pokeImg} />
                    <div className={styles.footerLabel} style={{ opacity: openPokes[2] ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>Agentic<br/>Pipelines</div>
                  </div>
                  <div className={styles.pokeItem} onClick={() => togglePoke(3)} style={{ cursor: 'pointer' }}>
                    <img src={openPokes[3] ? "/openpoke.png" : "/closepoke.png"} alt="poke" className={styles.pokeImg} />
                    <div className={styles.footerLabel} style={{ opacity: openPokes[3] ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>Web<br/>Designing</div>
                  </div>
                  <div className={styles.pokeItem} onClick={() => togglePoke(4)} style={{ cursor: 'pointer' }}>
                    <img src={openPokes[4] ? "/openpoke.png" : "/closepoke.png"} alt="poke" className={styles.pokeImg} />
                    <div className={styles.footerLabel} style={{ opacity: openPokes[4] ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>Machine<br/>Learning</div>
                  </div>
                  <div className={styles.pokeItem} onClick={() => togglePoke(5)} style={{ cursor: 'pointer' }}>
                    <img src={openPokes[5] ? "/openpoke.png" : "/closepoke.png"} alt="poke" className={styles.pokeImg} />
                    <div className={styles.footerLabel} style={{ opacity: openPokes[5] ? 1 : 0, transition: 'opacity 0.2s ease-in-out' }}>Hotel Menu<br/>Management</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>{/* /flipContainer */}
      </div>{/* /tiltWrapper */}
    </main>
  );
}