import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';

const VideoFondo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);

  useGSAP(() => {
    // Set initial states
    gsap.set('.video-fondo-wrapper', {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)'
    });

    // Background reveal
    gsap.to('.video-fondo-wrapper', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power3.out'
    });

    // 3D Parallax scroll on the background video itself
    gsap.fromTo(videoRef.current,
      { yPercent: -10, scale: 1.2 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
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
        yPercent: 220,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Float particles animation
    const particles = document.querySelectorAll('.fondo-particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: -150 - Math.random() * 100,
        x: (Math.random() - 0.5) * 150,
        opacity: 0,
        duration: 4 + Math.random() * 3,
        delay: i * 0.2,
        repeat: -1,
        ease: 'power1.inOut'
      });
    });

  }, []);

  return (
    <section ref={containerRef} className="section-container overflow-hidden h-[70vh] min-h-[500px] border-b border-[#C9A84C]/25">
      
      {/* Background looping video with light gold overlays */}
      <div className="video-fondo-wrapper absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/BodaAraiel/videos/3.mp4"
          className="absolute inset-0 w-full h-[120%] object-cover"
        />

        {/* Glowing Scanline sweep (reactive to scroll) */}
        <div 
          ref={sweepRef}
          className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none mix-blend-screen blur-[3px] z-10" 
        />
        
        {/* Light gold champagne tint overlay */}
        <div className="video-fondo-overlay absolute inset-0 bg-[#FFF8F0]/35 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0]/85 via-transparent to-[#FFF8F0]/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
      </div>

      {/* Floating Gold Flakes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="fondo-particle absolute"
            style={{
              left: 5 + Math.random() * 90 + '%',
              bottom: Math.random() * 30 + '%',
              width: 3 + Math.random() * 4 + 'px',
              height: 3 + Math.random() * 4 + 'px',
              background: ['#C9A84C', '#E8D5A3', '#FFFFFF', '#A8873A'][Math.floor(Math.random() * 4)],
              borderRadius: '50%',
              boxShadow: '0 0 15px currentColor',
              opacity: 0.5
            }}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <div className="video-fondo-title">
          <span className="inline-block text-[#C9A84C] text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 font-sans font-black">
            <AnimatedText text="♥ Nuestro Amor en Movimiento ♥" type="words" />
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] mb-3 drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
            <AnimatedText text="Momentos que Viven" />
          </h2>
        </div>
        
        <p className="video-fondo-subtitle text-gray-600 text-sm sm:text-base max-w-2xl mx-auto font-sans font-semibold tracking-wider">
          Cada fotograma cuenta una historia de amor
        </p>

        <div className="video-fondo-subtitle mt-6 flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#C9A84C]/30 shadow-md">
            <span className="text-[#3D2B1F] text-[10px] sm:text-xs tracking-widest font-sans font-bold">▶ REPRODUCIENDO</span>
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
            <span className="text-gray-500 text-[10px] sm:text-xs font-sans font-semibold">7s</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/25 to-transparent" />
      </div>
    </section>
  );
};

export default VideoFondo;
