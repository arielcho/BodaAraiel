import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import { setupScrollVideo } from '../utils/scrollVideo';

const VideoVertical = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const cleanupScrollVideo = setupScrollVideo({
      video,
      trigger: containerRef.current,
    });

    // Scroll scrubbing card dynamics
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // Zoom the vertical card container from 0.88 to 1.04 as you scroll
    tl.fromTo('.vertical-video-wrapper',
      { scale: 0.88, y: 40, rotationX: 6, filter: 'blur(3px)' },
      { scale: 1.03, y: -40, rotationX: 0, filter: 'blur(0px)', ease: 'none', duration: 4 }
    );

    // Parallax scroll on the video itself inside the portrait card
    tl.fromTo(video,
      { yPercent: -15, scale: 1.3 },
      { yPercent: 15, ease: 'none', duration: 4 },
      0
    );

    // Scanline reflection sweep controlled by scroll
    tl.fromTo(sweepRef.current,
      { yPercent: -120 },
      { yPercent: 240, ease: 'none', duration: 4 },
      0
    );

    return cleanupScrollVideo;
  }, []);

  return (
    <section ref={containerRef} className="section-container bg-gradient-to-b from-[#FFF8F0] via-[#FDFBF7] to-[#FFF8F0] py-24 overflow-hidden border-b border-[#C9A84C]/25 flex items-center justify-center">
      {/* Background Soft Grids */}
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
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
            
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(61,43,31,0.15)] border border-[#C9A84C]/30 bg-black">
              <video
                ref={videoRef}
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

              {/* Dynamic tag overlay */}
              <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-white/70 backdrop-blur-sm rounded border border-[#C9A84C]/35">
                <span className="text-[#3D2B1F] text-[8px] tracking-widest font-sans font-extrabold uppercase">PERSPECTIVA ACTIVA</span>
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
