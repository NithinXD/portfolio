 'use client';

import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export default function MapPage() {
  const router = useRouter();

  return (
    <div style={{height: '100vh', width: '100%', background: '#000'}}>
      <div style={{position: 'absolute', zIndex: 60, padding: 18}}>
        <button onClick={() => router.back()} style={{padding: '8px 12px', borderRadius: 8}}>Back</button>
      </div>
      <iframe
        src="/map.html"
        title="Map"
        style={{width: '100%', height: '100vh', border: 'none', display: 'block'}}
      />
    </div>
  );
}
