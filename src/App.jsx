import { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import PantallaCarga from './components/PantallaCarga';
import FloresYAdornos from './components/FloresYAdornos';
import Hero from './sections/Hero';
import VideoSection from './sections/VideoSection';
import VideoVertical from './sections/VideoVertical';
import VideoFondo from './sections/VideoFondo';
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import EventSection from './sections/EventSection';
import FinalSection from './sections/FinalSection';
import OutroSection from './sections/OutroSection';
import MusicPlayer from './components/MusicPlayer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [cargaCompleta, setCargaCompleta] = useState(false);

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    if (window.location.hash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    let frameId;
    let resetTimer;

    const resetToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    if (!cargaCompleta) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      resetToTop();
      frameId = requestAnimationFrame(resetToTop);
      resetTimer = window.setInterval(resetToTop, 120);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      resetToTop();
      frameId = requestAnimationFrame(() => {
        resetToTop();
        ScrollTrigger.refresh();
      });
      resetTimer = window.setTimeout(resetToTop, 250);
    }

    return () => {
      cancelAnimationFrame(frameId);
      if (cargaCompleta) {
        clearTimeout(resetTimer);
      } else {
        clearInterval(resetTimer);
      }
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [cargaCompleta]);

  const handleInvitationComplete = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setCargaCompleta(true);
  };

  return (
    <>
      <main className="relative overflow-x-hidden bg-[#FFF8F0]">
        <FloresYAdornos />
        <Navbar />
        <Hero isActive={cargaCompleta} />
        <VideoSection />
        <VideoVertical />
        <VideoFondo />
        <StorySection />
        <GallerySection />
        <EventSection />
        <FinalSection />
        <OutroSection />
      </main>
      {!cargaCompleta && <PantallaCarga onComplete={handleInvitationComplete} />}
      <MusicPlayer />
    </>
  );
};

export default App;
