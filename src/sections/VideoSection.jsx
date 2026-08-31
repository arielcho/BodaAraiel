import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useGSAP(() => {
    // Set initial states
    gsap.set('.video-wrapper', {
      opacity: 0,
      scale: 0.94,
      y: 60,
      filter: 'blur(8px)'
    });
    
    gsap.set('.video-subtitle', {
      opacity: 0,
      y: 20
    });

    // Entrance animation
    gsap.to('.video-wrapper', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'back.out(1.2)'
    });

    gsap.to('.video-subtitle', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 3D Parallax effect on the video element itself
    gsap.fromTo(videoRef.current,
      { yPercent: -12, scale: 1.25 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.video-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Scroll-driven golden scanning beam sweep (GTA VI scanline vibe)
    gsap.fromTo(sweepRef.current,
      { yPercent: -120 },
      {
        yPercent: 220,
        ease: 'none',
        scrollTrigger: {
          trigger: '.video-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Aura soft pulse
    gsap.to('.video-glow', {
      opacity: 0.5,
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

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
          
          <div 
            onClick={handlePlayPause}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(61,43,31,0.12)] border border-[#C9A84C]/30 bg-[#FFF8F0] cursor-pointer group"
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              src="/BodaAraiel/videos/4.mp4"
              className="absolute inset-0 w-full h-[125%] object-cover"
            />

            {/* Glowing Scanline sweep beam (reactive to scroll) */}
            <div 
              ref={sweepRef}
              className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent pointer-events-none mix-blend-screen blur-[2px]" 
            />
            
            {/* Play/Pause Overlay Toggle */}
            <div className={`absolute inset-0 flex items-center justify-center bg-[#3D2B1F]/20 hover:bg-[#3D2B1F]/35 transition-all duration-500 z-20 ${!isPlaying ? 'opacity-100 bg-[#3D2B1F]/45' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="text-center transform transition-transform duration-500 scale-95 group-hover:scale-100">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FFF8F0]/95 backdrop-blur-sm flex items-center justify-center shadow-[0_8px_30px_rgba(201,168,76,0.35)] border border-[#C9A84C]/50">
                  {isPlaying ? (
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#3D2B1F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#3D2B1F] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
                <p className="text-[#FFF8F0] text-xs mt-4 tracking-widest uppercase font-sans font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {isPlaying ? 'PAUSAR VIDEO' : 'REPRODUCIR'}
                </p>
              </div>
            </div>

            {/* Subtle Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
              <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: isPlaying ? '100%' : '0%', transitionDuration: isPlaying ? '19s' : '0.5s' }} />
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
