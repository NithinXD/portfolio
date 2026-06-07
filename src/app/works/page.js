'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

import Link from 'next/link';
import { projects } from '../../data/projects';

const LeftArrow = ({ onClick }) => (
  <svg width="60" height="80" viewBox="0 0 60 80" onClick={onClick} className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}>
    <polygon points="56,4 56,76 4,40" fill="#dcdcdc" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
  </svg>
);

const RightArrow = ({ onClick }) => (
  <svg width="60" height="80" viewBox="0 0 60 80" onClick={onClick} className={`${styles.arrowIcon} ${styles.arrowIconRight}`}>
    <polygon points="4,4 4,76 56,40" fill="#dcdcdc" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
  </svg>
);

export default function Works() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDesc, setDisplayedDesc] = useState("");

  // Typewriter effect
  useEffect(() => {
    setDisplayedTitle("");
    setDisplayedDesc("");

    const targetTitle = projects[currentIndex].title;
    const targetDesc = projects[currentIndex].description;

    let i = 0;
    let j = 0;
    let titleDone = false;

    const intervalId = setInterval(() => {
      if (!titleDone) {
        if (i < targetTitle.length) {
          i++;
          setDisplayedTitle(targetTitle.substring(0, i));
        } else {
          titleDone = true;
        }
      } else {
        if (j < targetDesc.length) {
          j++;
          setDisplayedDesc(targetDesc.substring(0, j));
        } else {
          clearInterval(intervalId);
        }
      }
    }, 15); // 15ms per character for classic fast RPG text speed

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  return (
    <main className={styles.container}>
      {/* Background split */}
      <div className={styles.bgTop}></div>
      <div className={styles.bgBottom}></div>
      <div className={styles.bgStripe}></div>
      
      {/* Light overlay for that "falling light" effect */}
      <div className={styles.lightOverlay}></div>

      {/* Map Icon (Top Right) */}
      <div className={styles.mapIcon}>
        <span style={{ fontSize: '1.8rem', zIndex: 2 }}>🗺️</span>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>My Works</h1>

        <div className={styles.carouselWrapper}>
          <LeftArrow onClick={prevProject} />
          
          <div className={styles.projectDisplay}>
            {/* Screen showing project image */}
            <div className={styles.screenFrame}>
              <div className={styles.screenInner}>
                {projects[currentIndex].imageUrl ? (
                  <img src={projects[currentIndex].imageUrl} alt={projects[currentIndex].title} className={styles.projectImg} />
                ) : (
                  <div className={styles.placeholderImg}>
                    <p>Image Placeholder</p>
                    <small>Will add later</small>
                  </div>
                )}
              </div>
            </div>
            
            {/* Text Box showing project description */}
            <div className={styles.textFrame}>
              <div className={styles.projectTitle}>
                {displayedTitle}
              </div>
              <div className={styles.projectDesc}>
                {displayedDesc}
              </div>
              <div className={styles.readMoreWrapper}>
                <Link href={`/works/${projects[currentIndex].id}`} className={styles.readMoreBtn}>
                  Read More ▸
                </Link>
              </div>
            </div>
          </div>

          <RightArrow onClick={nextProject} />
        </div>

        {/* Pagination Pokeballs */}
        <div className={styles.pagination}>
          {projects.map((_, index) => {
            const half = Math.floor(projects.length / 2);
            let distance = (index - currentIndex) % projects.length;
            if (distance > half) distance -= projects.length;
            if (distance < -half) distance += projects.length;
            // Handle edge case for exactly half if array length is even (e.g. -3 vs 3)
            // We want smooth consistent routing, so if distance is -3, we can treat it as HiddenLeft.

            let positionClass;
            let clickHandler = () => {};
            
            if (distance === 0) {
              positionClass = styles.pokeDotCenter;
            } else if (distance === -1) {
              positionClass = styles.pokeDotLeft;
              clickHandler = prevProject;
            } else if (distance === 1) {
              positionClass = styles.pokeDotRight;
              clickHandler = nextProject;
            } else if (distance < -1) {
              positionClass = styles.pokeDotHiddenLeft;
            } else {
              positionClass = styles.pokeDotHiddenRight;
            }

            return (
              <button
                key={index}
                onClick={clickHandler}
                className={`${styles.pokeDotBtn} ${positionClass}`}
                aria-label={`Go to project ${index + 1}`}
              >
                <img src="/poke.png" alt="Pokeball" className={styles.pokeDotImg} />
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
