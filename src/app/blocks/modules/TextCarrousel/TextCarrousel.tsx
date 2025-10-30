'use client';

import { useEffect, useRef } from 'react';
import { BlockSettings } from '@/app/types/types';
import BlockWrapper from '../../blockWrapper/BlockWrapper';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import styles from './styles/TextCarrousel.module.scss';
import { getThemeColor } from '@/app/helperFunctions/helperFunctions';

interface TextCarrouselProps {
  text?: string;
  settings?: BlockSettings;
}

export default function TextCarrousel({ text, settings }: TextCarrouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) return;

    let offset = 0;
    const speed = 1.5; // pixels per frame
    let animationFrameId: number;
    let isVisible = true;

    // Optional: pause when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    },
      { threshold: 0 }
    );
    observer.observe(wrapper);

    const animate = () => {
      if (isVisible) {
        offset += speed;
        if (offset > track.scrollWidth / 2) offset = 0;
        track.style.transform = `translateX(-${offset}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const repeatedText = Array(10).fill(text).map((t, i) => <span key={i}>{t}</span>);

  return (
    <BlockWrapper settings={settings}>
      <ContentWrapper isFullBackground>
        <div className={styles.wrapper} ref={wrapperRef}>
          <div className={styles.track} ref={trackRef}>
            {repeatedText}
            {repeatedText}
          </div>

          {/* Fading edges */}
          <div
            className={`${styles.fadingEdge} ${styles.leftFade}`}
            style={{
              background: `linear-gradient(to right, ${getThemeColor(settings?.backgroundColor?.color)}, transparent)`,
            }}
          />
          <div
            className={`${styles.fadingEdge} ${styles.rightFade}`}
            style={{
              background: `linear-gradient(to left, ${getThemeColor(settings?.backgroundColor?.color)}, transparent)`,
            }}
          />
        </div>
      </ContentWrapper>
    </BlockWrapper>
  );
}

