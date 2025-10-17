// src/Animations/BannerAnimation.tsx
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useBannerAnimation() {
  const [color, setColor] = useState('#FFD700');
  const [scene, setScene] = useState(0); // 0: Globe, 1: Universe, 2: Weather

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '#portfolio-section',
      start: 'top top',
      end: '+=3000',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // Update color
        const colors = ['#FFD700', '#00FFFF', '#FF69B4'];
        const index = Math.floor(progress * colors.length);
        setColor(colors[index]);

        // Update scene
        if (progress < 0.33) setScene(0);
        else if (progress < 0.66) setScene(1);
        else setScene(2);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return { color, scene };
}
