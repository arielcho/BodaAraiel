import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';

const VideoVertical = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useGSAP(() => {
    // Set initial state
    gsap.set('.vertical-video-wrapper', {
      opacity: 0,
      scale: 0.9,
      y: 60,
      rotationX: 8,
      filter: 'blur(8px)'
    });

    // GTA VI style entrance transition
    gsap.to('.vertical-video-wrapper', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'back.out(1.2)'
    });

    // 3D Parallax effect on the video element inside the container
    gsap.fromTo(videoRef.current,
      { yPercent: -15, scale: 1.3 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vertical-video-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Scroll-driven golden scanning beam sweep
    gsap.fromTo(sweepRef.current,
      { yPercent: -120 },
      {
        yPercent: 240,
        ease: 'none',
        scrollTrigger: {
          trigger: '.vertical-video-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

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
    <section ref={containerRef} className="section-container bg-gradient-to-b from-[#FFF8F0] via-[#FDFBF7] to-[#FFF8F0] py-20 overflow-hidden border-b border-[#C9A84C]/25">
      {/* Background Soft Grids */}
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="vertical-title font-script text-4xl md:text-6xl text-[#3D2B1F] mb-3 drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
            <AnimatedText text="Nuestros Momentos" />
          </h2>
          <p className="vertical-subtitle text-gray-500 text-xs md:text-sm tracking-widest uppercase font-sans font-black">
            <AnimatedText text="Capturados desde el corazón" type="words" />
          </p>
          <div className="w-16 h-px bg-[#C9A84C]/30 mx-auto mt-4" />
        </div>

        {/* Vertical Video container */}
        <div className="vertical-video-wrapper flex justify-center">
          <div className="relative w-full max-w-[280px] md:max-w-sm lg:max-w-md">
            {/* Golden Aura Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#C9A84C]/20 via-[#E8D5A3]/15 to-[#C9A84C]/20 rounded-3xl blur-xl" />
            
            <div 
              onClick={handlePlayPause}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(61,43,31,0.15)] border border-[#C9A84C]/30 bg-black cursor-pointer group"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                src="/BodaAraiel/videos/1 (1).mp4"
                className="absolute inset-0 w-full h-[130%] object-cover"
              />

              {/* Glowing Scanline sweep (reactive to scroll) */}
              <div 
                ref={sweepRef}
                className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-[#C9A84C]/25 to-transparent pointer-events-none mix-blend-screen blur-[2px] z-10" 
              />
              
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
              </div>

              {/* Autoplay play/pause toggle indicator */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/40 transition-all duration-500 z-20 ${!isPlaying ? 'opacity-100 bg-black/45' : 'opacity-0 group-hover:opacity-100'}`}>
                <div className="w-18 h-18 md:w-22 md:h-22 rounded-full bg-[#FFF8F0]/95 flex items-center justify-center shadow-lg border border-[#C9A84C]/50 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                  {isPlaying ? (
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#3D2B1F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-[#3D2B1F] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
                <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: isPlaying ? '100%' : '0%', transitionDuration: isPlaying ? '10s' : '0.5s' }} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs md:text-sm mt-8 max-w-2xl mx-auto font-sans font-semibold italic">
          "Cada instante es único, cada mirada cuenta una historia de amor"
        </p>
      </div>
    </section>
  );
};

export default VideoVertical;
