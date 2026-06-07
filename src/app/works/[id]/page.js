"use client";

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { projects } from '../../../data/projects';
import styles from './details.module.css';
import parentStyles from '../page.module.css';

export default function ProjectDetails({ params }) {
  // In Next.js 15+, params is a Promise that needs to be unwrapped with React.use()
  const resolvedParams = use(params);
  const router = useRouter();
  
  const projectId = parseInt(resolvedParams.id, 10);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className={parentStyles.container}>
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Project Not Found</h2>
            <button onClick={() => router.push('/works')} className={styles.backBtn}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={parentStyles.container}>
      {/* Exact same background from /works */}
      <div className={parentStyles.bgTop}></div>
      <div className={parentStyles.bgBottom}></div>
      <div className={parentStyles.bgStripe}></div>
      <div className={parentStyles.lightOverlay}></div>
      
      <div className={parentStyles.mapIcon}>
        <span style={{ fontSize: '1.8rem', zIndex: 2 }}>🗺️</span>
      </div>

      {/* Glassmorphism Modal Overlay */}
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          
          <button onClick={() => router.push('/works')} className={styles.closeBtn}>
            ✕
          </button>

          <h1 className={styles.title}>{project.title}</h1>
          
          <div className={styles.bodyLayout}>
            {project.imageUrl && (
              <div className={styles.imageWrapper}>
                <img src={project.imageUrl} alt={project.title} className={styles.projectImg} />
              </div>
            )}
            
            <div className={styles.textContent}>
              <div className={styles.section}>
                <h3>Overview</h3>
                <p>{project.description}</p>
              </div>

              <div className={styles.section}>
                <h3>How It Was Done</h3>
                <p>{project.howItWasDone}</p>
              </div>

              <div className={styles.section}>
                <h3>Tech Stack</h3>
                <div className={styles.techTags}>
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <button onClick={() => router.push('/works')} className={styles.backBtn}>
              ◂ Back to Works
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
