import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import './scroll-expansion-hero.css';

type Props = {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
};

/** The supplied scroll-expansion component, adapted only to use standard Vite images. */
export default function ScrollExpansionHero({
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  children,
}: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const updateProgress = (delta: number) => {
      const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
      setScrollProgress(next);
      if (next >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
      } else if (next < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (mediaFullyExpanded && event.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        event.preventDefault();
      } else if (!mediaFullyExpanded) {
        event.preventDefault();
        updateProgress(event.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (event: TouchEvent) => setTouchStartY(event.touches[0].clientY);
    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = event.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        event.preventDefault();
      } else if (!mediaFullyExpanded) {
        event.preventDefault();
        updateProgress(deltaY * (deltaY < 0 ? 0.008 : 0.005));
        setTouchStartY(touchY);
      }
    };
    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaWidth = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobile ? 180 : 150);
  const firstWord = title?.split(' ')[0] ?? '';
  const restOfTitle = title?.split(' ').slice(1).join(' ') ?? '';

  return <div ref={sectionRef} className="scroll-expand-root">
    <section className="scroll-expand-section">
      <motion.div className="scroll-expand-background" initial={{ opacity: 0 }} animate={{ opacity: 1 - scrollProgress }} transition={{ duration: .1 }}>
        <img src={bgImageSrc} alt="" />
        <div />
      </motion.div>
      <div className="scroll-expand-inner">
        <div className="scroll-expand-stage">
          <div className="scroll-expand-media" style={{ width: `${mediaWidth}px`, height: `${mediaHeight}px` }}>
            <div className="scroll-expand-video-wrap">
              <video src={mediaSrc} autoPlay muted loop playsInline preload="auto" disablePictureInPicture disableRemotePlayback />
              <motion.div className="scroll-expand-media-overlay" initial={{ opacity: .7 }} animate={{ opacity: .5 - scrollProgress * .3 }} transition={{ duration: .2 }} />
            </div>
            <div className="scroll-expand-meta">
              {date && <p style={{ transform: `translateX(-${textTranslateX}vw)` }}>{date}</p>}
              {scrollToExpand && <p style={{ transform: `translateX(${textTranslateX}vw)` }}>{scrollToExpand}</p>}
            </div>
          </div>
          <div className={`scroll-expand-title ${textBlend ? 'is-blended' : ''}`}>
            <motion.h1 style={{ transform: `translateX(-${textTranslateX}vw)` }}>{firstWord}</motion.h1>
            <motion.h1 style={{ transform: `translateX(${textTranslateX}vw)` }}>{restOfTitle}</motion.h1>
          </div>
        </div>
        <motion.section className="scroll-expand-content" initial={{ opacity: 0 }} animate={{ opacity: showContent ? 1 : 0 }} transition={{ duration: .7 }}>
          {children}
        </motion.section>
      </div>
    </section>
  </div>;
}
