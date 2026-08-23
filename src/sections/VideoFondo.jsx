import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const VideoFondo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set('.video-fondo-wrapper', {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)'
    });
    
    gsap.set('.video-fondo-title', {
      opacity: 0,
      y: 60,
      filter: 'blur(8px)'
    });
    
    gsap.set('.video-fondo-subtitle', {
      opacity: 0,
      y: 40,
      filter: 'blur(5px)'
    });

    gsap.set('.video-fondo-overlay', {
      opacity: 0
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1
      }
    });

    tl
      .to('.video-fondo-wrapper', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      })
      .to('.video-fondo-title', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8')
      .to('.video-fondo-subtitle', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
      .to('.video-fondo-overlay', {
        opacity: 0.5,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 0);

    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
      
      video.onloadedmetadata = () => {
        tl.to(video, {
          currentTime: video.duration,
          duration: 3,
          ease: 'none'
        }, 0);
      };
    }

    const particles = document.querySelectorAll('.fondo-particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: -150 - Math.random() * 100,
        x: (Math.random() - 0.5) * 150,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        delay: i * 0.2,
        repeat: -1,
        ease: 'power1.inOut'
      });
    });

  }, []);

  return (
    <section ref={containerRef} className="section-container overflow-hidden">
      <div className="video-fondo-wrapper absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          loop
          src="/BodaAraiel/videos/3.mp4"
          className="w-full h-full object-cover"
        />
        
        <div className="video-fondo-overlay absolute inset-0 bg-[#1A0F0A]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/70 via-transparent to-[#6B2D3B]/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1A0F0A]/90 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="fondo-particle absolute"
            style={{
              left: 5 + Math.random() * 90 + '%',
              bottom: Math.random() * 30 + '%',
              width: 2 + Math.random() * 4 + 'px',
              height: 2 + Math.random() * 4 + 'px',
              background: ['#C9A84C', '#E8D5A3', '#FDF7F0', '#E8837A'][Math.floor(Math.random() * 4)],
              borderRadius: '50%',
              boxShadow: '0 0 15px currentColor',
              opacity: 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <div className="video-fondo-title">
          <span className="inline-block text-[#C9A84C] text-sm md:text-base tracking-[0.3em] uppercase mb-3">
            ♥ Nuestro Amor en Movimiento ♥
          </span>
          <h2 className="font-script text-4xl md:text-6xl lg:text-7xl text-[#FDF7F0] mb-3">
            Momentos que <span className="text-[#C9A84C]">Viven</span>
          </h2>
        </div>
        
        <p className="video-fondo-subtitle text-[#E8D5A3]/60 text-base md:text-lg max-w-2xl mx-auto font-light tracking-wider">
          Cada fotograma cuenta una historia de amor
        </p>

        <div className="video-fondo-subtitle mt-6 flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-[#C9A84C]/20">
            <span className="text-[#E8D5A3]/50 text-xs tracking-widest">▶ REPRODUCIENDO</span>
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
            <span className="text-[#E8D5A3]/30 text-[10px]">7s</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
      </div>
    </section>
  );
};

export default VideoFondo;
