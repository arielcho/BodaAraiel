import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';

const FinalSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const initScrub = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse'
        }
      });

      // Scrub video frame
      tl.to(video, {
        currentTime: video.duration || 19,
        ease: 'none',
        duration: 4
      }, 0);

      // Scrub scanning sweep
      tl.fromTo(sweepRef.current,
        { yPercent: -120 },
        { yPercent: 240, ease: 'none', duration: 4 },
        0
      );
    };

    if (video.readyState >= 1) {
      initScrub();
    } else {
      video.addEventListener('loadedmetadata', initScrub);
    }

    return () => {
      video.removeEventListener('loadedmetadata', initScrub);
    };

  }, []);

  return (
    <section ref={containerRef} className="section-container overflow-hidden h-screen border-b border-[#C9A84C]/25 bg-[#FFF8F0] flex items-center justify-center">
      <div className="final-content w-full h-full relative">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/BodaAraiel/videos/4.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Glowing Scanline sweep (reactive to scroll) */}
        <div 
          ref={sweepRef}
          className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none mix-blend-screen blur-[3px] z-10" 
        />
        
        {/* Light champagne gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/35 to-[#F7E7CE]/20 backdrop-blur-[0.5px]" />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="final-title text-center px-4">
            <span className="text-[#C9A84C] text-xs sm:text-sm tracking-[0.3em] uppercase font-sans font-black">
              <AnimatedText text="♥ El Gran Final ♥" type="words" />
            </span>
            <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] mt-3 drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
              <AnimatedText text="Para Siempre" />
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans font-semibold tracking-wider">
              Y así comienza nuestra historia para siempre
            </p>
            
            <div className="mt-6 inline-block px-4 py-2 bg-white/70 backdrop-blur-sm rounded-lg border border-[#C9A84C]/35">
              <span className="text-[#3D2B1F] text-[9px] tracking-widest font-sans font-extrabold uppercase">⏱ SCROLL INTERACTIVO · 19s</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-25">
          <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: '100%', transitionDuration: '19s' }} />
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
