import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const FinalSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set('.final-content', {
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)'
    });
    
    gsap.set('.final-title', {
      opacity: 0,
      y: 60,
      filter: 'blur(8px)'
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        scrub: 2.0,
        pin: true,
        anticipatePin: 1
      }
    });

    tl
      .to('.final-content', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out'
      })
      .to('.final-title', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power2.out'
      }, '-=1');

    const video = videoRef.current;
    if (video) {
      video.onloadedmetadata = () => {
        tl.to(video, {
          currentTime: video.duration,
          duration: 6,
          ease: 'none'
        }, 0);
      };
    }

  }, []);

  return (
    <section ref={containerRef} className="section-container overflow-hidden bg-[#1A0F0A]">
      <div className="final-content w-full h-full relative">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/BodaAraiel/videos/4.mp4"
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/80 via-[#1A0F0A]/20 to-[#6B2D3B]/30" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="final-title text-center px-4">
            <span className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase">♥ El Gran Final ♥</span>
            <h2 className="font-script text-5xl md:text-7xl text-[#FDF7F0] mt-3">
              Para <span className="text-[#C9A84C]">Siempre</span>
            </h2>
            <p className="text-[#E8D5A3]/60 text-lg mt-4 max-w-2xl mx-auto font-light">
              Y asi comienza nuestra historia para siempre
            </p>
            <div className="mt-6 inline-block px-6 py-2 border border-[#C9A84C]/30 rounded-full bg-black/30 backdrop-blur-sm">
              <span className="text-[#E8D5A3]/40 text-xs tracking-widest">⏱ 19s</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
          <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: '0%' }} />
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
