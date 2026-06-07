"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
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

  const handleOrientation = useCallback((event) => {
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
  }, []);

  const toggleGyro = () => {
    if (useGyro) {
      setUseGyro(false);
      resetPointerPosition();
      return;
    }

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            setUseGyro(true);
          } else {
            alert('Gyroscope permission denied.');
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS 13+ devices
      setUseGyro(true);
    }
  };

  useEffect(() => {
    if (useGyro) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      window.removeEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [useGyro, handleOrientation]);

  return (
    <div className={styles.mobileContainer}>
      <div 
        className={styles.tiltWrapper} 
        id="tiltWrapper"
        ref={tiltRef}
        onPointerMove={updatePointerPosition}
        onPointerLeave={resetPointerPosition}
      >
        <div className={styles.cardContainer}>
          <div className={`${styles.innerCard} ${styles.themeGreen}`} id="cardTheme">
            <div className={styles.glare}></div>
            
            <div className={styles.contentWrapper}>
              <div className={styles.header}>
                <div className={styles.stageTag}>2+ YOE</div>
                <div className={styles.name}>Nithin D</div>
              </div>

              <div 
                className={styles.subHeader} 
                onClick={toggleGyro}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.evoCircle}></div>
                <div className={styles.subHeaderText}>
                  {!useGyro ? "TAP FOR GYRO" : "TAP TO DISABLE GYRO"}
                </div>
              </div>

            <div className={styles.imageBox}>
              <img src="/final__1_-removebg-preview.png" alt="Profile" className={styles.profileImage} />
            </div>

              <div className={styles.linksZone}>
                <a href="https://github.com/NithinxD" target="_blank" rel="noreferrer" className={styles.socialIconBtn}>
                  <img src="/github.webp" alt="GitHub" className={styles.socialIconImg} />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/nithin-deepak-82231a301/" target="_blank" rel="noreferrer" className={styles.socialIconBtn}>
                  <img src="/linkedin.webp" alt="LinkedIn" className={styles.socialIconImg} />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:nithindeepak2004@gmail.com" target="_blank" rel="noreferrer" className={styles.socialIconBtn}>
                  <img src="/gmail.webp" alt="Email" className={styles.socialIconImg} />
                  <span>Email</span>
                </a>
              </div>

              <div className={styles.bioTextContainer}>
                <p>Hi, I'm Nithin & I build apps that ship, scale,</p>
                <p>and actually make it to the store. 2+ years turning</p>
                <p>ideas into production-ready mobile experiences</p>
                <p>across Android, iOS, and AI systems.</p>
                <p>From fleet-tracking platforms to international</p>
                <p>markets, I don't just write code — I deliver.</p>
              </div>

              <div className={styles.techBar}>
                <img src="/React.webp" alt="React" className={styles.techIcon} />
                <img src="/Node.webp" alt="Node" className={styles.techIcon} />
                <img src="/flutter-logo-png_seeklogo-354671.webp" alt="Flutter" className={styles.techIcon} />
                <img src="/fastapi.webp" alt="FastAPI" className={styles.techIcon} />
                <img src="/langchain-icon-logo-png_seeklogo-611655.webp" alt="Langchain" className={styles.techIcon} />
                <img src="/Kubernetes.webp" alt="Kubernetes" className={styles.techIcon} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
