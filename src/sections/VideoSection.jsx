import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configure video attributes for manual scrub
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    // Aura soft pulse background animation
    gsap.to('.video-glow', {
      opacity: 0.5,
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    const initScrub = () => {
      // Scroll scrubbing timeline with Pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%', // Scroll depth to scrub the video
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          toggleActions: 'play none none reverse'
        }
      });

      // Scrub the video currentTime
      tl.to(video, {
        currentTime: video.duration || 10,
        ease: 'none',
        duration: 4
      }, 0);

      // Scrub the scanline sweep in sync with the video
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
    <section ref={containerRef} className="section-container flex items-center justify-center bg-[#FFF8F0] relative overflow-hidden border-b border-[#C9A84C]/25 py-20">
      {/* Background Soft Grids & Gold Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0] via-[#F7E7CE]/20 to-[#FFF8F0]" />
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8D5A3]/40 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="video-title text-center mb-10">
          <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] mb-3 drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
            <AnimatedText text="Nuestra Historia" />
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm tracking-widest uppercase font-sans font-black">
            <AnimatedText text="Un amor que trasciende el tiempo" type="words" />
          </p>
          <div className="w-16 h-px bg-[#C9A84C]/30 mx-auto mt-4" />
        </div>

        {/* Video Wrapper Card */}
        <div className="video-wrapper relative max-w-4xl mx-auto">
          {/* Glowing Aura Border */}
          <div className="video-glow absolute -inset-1.5 bg-gradient-to-r from-[#C9A84C]/25 via-transparent to-[#C9A84C]/25 rounded-2xl blur-xl" />
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(61,43,31,0.12)] border border-[#C9A84C]/30 bg-[#FFF8F0]">
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
              className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent pointer-events-none mix-blend-screen blur-[2px] z-10" 
            />

            {/* Overlay Indicator (GTA VI style interact tag) */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-white/70 backdrop-blur-sm rounded-lg border border-[#C9A84C]/30 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-ping" />
              <span className="text-[#3D2B1F] text-[9px] sm:text-[10px] tracking-widest font-sans font-black uppercase">INTERACTIVO CON SCROLL</span>
            </div>
            
            {/* Play/Pause Overlay Indicator (Large interactive button) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FFF8F0]/95 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_30px_rgba(201,168,76,0.35)] border border-[#C9A84C]/50">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#3D2B1F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <p className="video-subtitle text-[#3D2B1F]/60 text-center mt-6 text-xs sm:text-sm tracking-wider font-sans font-medium italic">
            "Cada momento es una escena perfecta en nuestra película de amor"
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
