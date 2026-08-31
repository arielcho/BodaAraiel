import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';

const FinalSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);

  useGSAP(() => {
    // Set initial states
    gsap.set('.final-content', {
      opacity: 0,
      scale: 0.94,
      filter: 'blur(8px)'
    });

    gsap.to('.final-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out'
    });

    // 3D Parallax scroll on the video element itself
    gsap.fromTo(videoRef.current,
      { yPercent: -12, scale: 1.25 },
      {
        yPercent: 12,
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

  }, []);

  return (
    <section ref={containerRef} className="section-container overflow-hidden h-[75vh] min-h-[500px] border-b border-[#C9A84C]/25 bg-[#FFF8F0]">
      <div className="final-content w-full h-full relative">
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
            <div className="mt-6 inline-block px-6 py-2 border border-[#C9A84C]/25 rounded-full bg-white/60 backdrop-blur-sm shadow-md">
              <span className="text-[#3D2B1F] text-xs tracking-widest font-sans font-bold">⏱ 19s</span>
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
