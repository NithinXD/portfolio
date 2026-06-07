"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './mobileCard.module.css';

export default function MobileAboutCard() {
  const tiltRef = useRef(null);
  const [useGyro, setUseGyro] = useState(false);

  // Mouse fallback
  const updatePointerPosition = (event) => {
    if (useGyro) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratioX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ratioY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    el.style.setProperty('--ratio-x', ratioX);
    el.style.setProperty('--ratio-y', ratioY);
  };

  const resetPointerPosition = () => {
    if (useGyro) return;
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty('--ratio-x', 0);
    el.style.setProperty('--ratio-y', 0);
  };

  const handleOrientation = (event) => {
    const el = tiltRef.current;
    if (!el) return;
    
    let x = event.gamma || 0;
    let y = event.beta || 0;

    if (x > 45) x = 45;
    if (x < -45) x = -45;

    let yResting = 45;
    let yDiff = y - yResting;
    if (yDiff > 45) yDiff = 45;
    if (yDiff < -45) yDiff = -45;

    let ratioX = x / 45;
    let ratioY = yDiff / 45;

    el.style.setProperty('--ratio-x', ratioX);
    el.style.setProperty('--ratio-y', ratioY);
  };

  const enableGyro = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
            setUseGyro(true);
          } else {
            alert('Gyroscope permission denied.');
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
      setUseGyro(true);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <div className={styles.mobileContainer}>
      {!useGyro && (
        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.gyroBtn}`} onClick={enableGyro}>
            Enable Gyroscope
          </button>
        </div>
      )}

      <div 
        className={styles.tiltWrapper} 
        id="tiltWrapper"
        ref={tiltRef}
        onPointerMove={updatePointerPosition}
        onPointerLeave={resetPointerPosition}
      >
        <div className={styles.cardContainer}>
          <div className={`${styles.innerCard} ${styles.themeGreen}`} id="cardTheme">

            <div className={styles.header}>
              <div className={styles.stageTag}>STAGE 1</div>
              <div className={styles.name}>Nithin D</div>
              <div className={styles.hpText}>
                2+ YOE
                <span className={`${styles.typeIcon} ${styles.iconLeaf}`}></span>
              </div>
            </div>

            <div className={styles.subHeader}>
              <div className={styles.evoCircle}></div>
              <div className={styles.subHeaderText}>Dev & AI Pipelines</div>
            </div>

            <div className={styles.imageBox}>
              <img src="/final__1_-removebg-preview.png" alt="Profile" className={styles.profileImage} />
            </div>

            <div className={styles.attackZone}>
              <div className={styles.attackBlock}>
                <h4 className={styles.attackTitle}>App & Web Dev</h4>
                <p className={styles.attackDesc}>
                  Flutter, React, Node, Android, iOS.<br/>
                  Turn ideas into production-ready experiences.
                </p>
              </div>
              <div className={styles.attackBlock}>
                <h4 className={styles.attackTitle}>AI & Systems</h4>
                <p className={styles.attackDesc}>
                  Langchain, FastAPI, Kubernetes, ML.<br/>
                  Fleet-tracking to international markets.
                </p>
              </div>
            </div>

            <div className={styles.statsFooter}>
              <a href="https://github.com/NithinxD" target="_blank" rel="noreferrer" className={styles.statItem}>
                <span className={styles.statLabel}>GitHub</span>
                <span className={`${styles.typeIconSmall} ${styles.iconDark}`}></span>
              </a>
              <a href="https://www.linkedin.com/in/nithin-deepak-82231a301/" target="_blank" rel="noreferrer" className={styles.statItem}>
                <span className={styles.statLabel}>LinkedIn</span>
                <span className={`${styles.typeIconSmall} ${styles.iconLightning}`}></span>
              </a>
              <a href="mailto:nithindeepak2004@gmail.com" target="_blank" rel="noreferrer" className={styles.statItem}>
                <span className={styles.statLabel}>Email</span>
                <span className={`${styles.typeIconSmall} ${styles.iconWater}`}></span>
              </a>
            </div>

            <div className={styles.bottomBar}>
              <div className={styles.energyIcons}>
                <span className={`${styles.tinyIcon} ${styles.iconDark}`}></span>
                <span className={`${styles.tinyIcon} ${styles.iconLightning}`}></span>
                <span className={`${styles.tinyIcon} ${styles.iconWater}`}></span>
                <span className={`${styles.tinyIcon} ${styles.iconFighting}`}></span>
                <span className={`${styles.tinyIcon} ${styles.iconSteel}`}></span>
                <span className={`${styles.tinyIcon} ${styles.iconPsychic}`}></span>
              </div>
              <div className={styles.fakeCardText}>Trainer Card</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
