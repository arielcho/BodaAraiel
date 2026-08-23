import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VideoSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set('.video-wrapper', {
      opacity: 0,
      scale: 0.9,
      y: 50,
      filter: 'blur(8px)'
    });
    
    gsap.set('.video-title', {
      opacity: 0,
      y: 60,
      filter: 'blur(8px)'
    });
    
    gsap.set('.video-subtitle', {
      opacity: 0,
      y: 40
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1.8,
        pin: true,
        anticipatePin: 1
      }
    });

    tl
      .to('.video-wrapper', {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      })
      .to('.video-title', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8')
      .to('.video-subtitle', {
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
          duration: 4,
          ease: 'none'
        }, 0);
      };
    }

    gsap.to('.video-glow', {
      opacity: 0.4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  return (
    <section ref={containerRef} className="section-container flex items-center justify-center bg-[#1A0F0A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] via-[#2C1810] to-[#1A0F0A]" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="video-title text-center mb-6 md:mb-8">
          <h2 className="font-script text-4xl md:text-6xl text-[#FDF7F0] mb-2">
            Nuestra <span className="text-[#C9A84C]">Historia</span>
          </h2>
          <p className="text-[#E8D5A3]/50 text-sm md:text-base tracking-widest uppercase">
            Un amor que trasciende el tiempo
          </p>
        </div>

        <div className="video-wrapper relative">
          <div className="video-glow absolute -inset-1 bg-gradient-to-r from-[#C9A84C]/30 via-transparent to-[#C9A84C]/30 rounded-2xl blur-xl opacity-0" />
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-[#C9A84C]/20">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              src="/BodaAraiel/videos/4.mp4"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-500 group cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-[#C9A84C]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[#C9A84C]/30">
                  <span className="text-3xl md:text-5xl text-white">▶</span>
                </div>
                <p className="text-white/60 text-xs md:text-sm mt-3 tracking-widest uppercase">
                  REPRODUCIR
                </p>
                <p className="text-white/30 text-[10px] md:text-xs mt-1 tracking-wider">
                  ⏱ 10s
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: '0%' }} />
            </div>
          </div>

          <p className="video-subtitle text-[#E8D5A3]/30 text-center mt-6 text-sm md:text-base tracking-wider font-light italic">
            "Cada momento es una escena perfecta en nuestra pelicula de amor"
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
