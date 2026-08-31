import { useEffect, useState } from 'react';
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
import FinalSection from './sections/FinalSection';
import OutroSection from './sections/OutroSection';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [cargaCompleta, setCargaCompleta] = useState(false);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <PantallaCarga onComplete={() => setCargaCompleta(true)} />
      {cargaCompleta && (
        <main className="relative overflow-x-hidden bg-[#FFF8F0]">
          <FloresYAdornos />
          <Navbar />
          <Hero />
          <VideoSection />
          <VideoVertical />
          <VideoFondo />
          <StorySection />
          <GallerySection />
          <FinalSection />
          <OutroSection />
        </main>
      )}
    </>
  );
};

export default App;
