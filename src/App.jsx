import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import VideoSection from './sections/VideoSection';
import VideoVertical from './sections/VideoVertical';
import VideoFondo from './sections/VideoFondo';  // â† NUEVO
import StorySection from './sections/StorySection';
import GallerySection from './sections/GallerySection';
import FinalSection from './sections/FinalSection';
import OutroSection from './sections/OutroSection';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navbar />
      <Hero />
      <VideoSection />
      <VideoVertical />
      <VideoFondo />         {/* â† NUEVA SECCIÃ“N */}
      <StorySection />
      <GallerySection />
      <FinalSection />
      <OutroSection />
    </main>
  );
};

export default App;

