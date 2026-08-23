import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VideoVertical = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set('.vertical-video-wrapper', {
      opacity: 0,
      scale: 0.85,
      y: 80,
      rotationX: 10,
      filter: 'blur(10px)'
    });
    
    gsap.set('.vertical-title', {
      opacity: 0,
      y: 50,
      filter: 'blur(8px)'
    });

    gsap.set('.vertical-subtitle', {
      opacity: 0,
      y: 30
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.2,
        toggleActions: 'play none none reverse'
      }
    });

    tl
      .to('.vertical-video-wrapper', {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      })
      .to('.vertical-title', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }, '-=0.8')
      .to('.vertical-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5');

    const video = videoRef.current;
    if (video) {
      video.onloadedmetadata = () => {
        tl.to(video, {
          currentTime: video.duration,
          duration: 2.5,
          ease: 'none'
        }, 0);
      };
    }

  }, []);

  return (
    <section ref={containerRef} className="section-container bg-gradient-to-b from-[#1A0F0A] via-[#2C1810] to-[#1A0F0A] py-16 md:py-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="vertical-title font-script text-3xl md:text-5xl text-[#FDF7F0] mb-2">
            Nuestros <span className="text-[#C9A84C]">Momentos</span>
          </h2>
          <p className="vertical-subtitle text-[#E8D5A3]/40 text-xs md:text-sm tracking-widest uppercase">
            Capturados desde el corazón
          </p>
        </div>

        <div className="vertical-video-wrapper flex justify-center">
          <div className="relative w-full max-w-[280px] md:max-w-sm lg:max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C9A84C]/20 via-[#E8837A]/10 to-[#C9A84C]/20 rounded-3xl blur-xl" />
            
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-[#C9A84C]/20 bg-black">
              <video
                ref={videoRef}
                muted
                playsInline
                preload="metadata"
                src="/videos/1 (1).mp4"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
              </div>

              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-white/60 text-[10px] md:text-xs tracking-widest">▶ REPRODUCIR</span>
                  <span className="text-[#C9A84C]/60 text-[10px] md:text-xs">|</span>
                  <span className="text-white/40 text-[10px] md:text-xs">10s</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: '0%' }} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-[#E8D5A3]/20 text-xs md:text-sm mt-6 max-w-2xl mx-auto font-light tracking-wider">
          "Cada instante es único, cada mirada cuenta una historia"
        </p>
      </div>
    </section>
  );
};

export default VideoVertical;