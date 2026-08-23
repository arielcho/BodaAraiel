import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    gsap.set('.hero-title-3d', {
      opacity: 0,
      y: 150,
      scale: 0.6,
      rotationX: 30,
      rotationY: -15,
      filter: 'blur(15px)',
      perspective: 1000
    });
    
    gsap.set('.hero-subtitle-3d', {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotationX: 20,
      filter: 'blur(10px)'
    });
    
    gsap.set('.hero-date-3d', {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotationX: 15,
      filter: 'blur(8px)'
    });
    
    gsap.set('.hero-floating-text', {
      opacity: 0,
      y: 40,
      scale: 0.9
    });

    gsap.set('.hero-bg', {
      scale: 1.2,
      filter: 'brightness(0.5)'
    });

    gsap.set('.hero-glow', {
      opacity: 0,
      scale: 0.5
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=150%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
      }
    });

    tl
      .to('.hero-title-3d', {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        filter: 'blur(0px)',
        duration: 2.5,
        ease: 'power4.out'
      })
      .to('.hero-subtitle-3d', {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out'
      }, '-=1.8')
      .to('.hero-date-3d', {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      }, '-=1.2')
      .to('.hero-floating-text', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8')
      .to('.hero-bg', {
        scale: 1,
        filter: 'brightness(0.7)',
        duration: 3,
        ease: 'none'
      }, 0)
      .to('.hero-glow', {
        opacity: 0.4,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      }, 0);

    const title = titleRef.current;
    if (title) {
      let timeout;
      title.addEventListener('mousemove', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const rect = title.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          gsap.to('.hero-title-3d', {
            rotationY: x * 12,
            rotationX: -y * 8,
            duration: 0.8,
            ease: 'power2.out'
          });
          
          gsap.to('.hero-subtitle-3d', {
            rotationY: x * 6,
            rotationX: -y * 4,
            duration: 0.8,
            ease: 'power2.out'
          });
        }, 10);
      });
      
      title.addEventListener('mouseleave', () => {
        gsap.to('.hero-title-3d', {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
        gsap.to('.hero-subtitle-3d', {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }

    const sparkles = document.querySelectorAll('.sparkle-particle');
    sparkles.forEach((sparkle, i) => {
      gsap.to(sparkle, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: i * 0.08,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    const hearts = document.querySelectorAll('.heart-3d');
    hearts.forEach((heart, i) => {
      gsap.to(heart, {
        y: -250 - Math.random() * 150,
        x: (i % 2 === 0 ? 120 : -120) + (Math.random() - 0.5) * 80,
        rotation: 540,
        scale: 1.3,
        opacity: 0,
        duration: 5 + Math.random() * 3,
        delay: i * 0.3,
        repeat: -1,
        ease: 'power1.inOut'
      });
    });

  }, []);

  return (
    <section ref={containerRef} className="hero-section section-container overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/BodaAraiel/images/hero-bg.jpg" 
          alt="Fondo Boda" 
          className="hero-bg w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/20 blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="sparkle-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: ['#D4AF37', '#FFB6C1', '#FFFFFF', '#FFD700'][Math.floor(Math.random() * 4)],
              borderRadius: '50%',
              boxShadow: '0 0 8px currentColor',
              opacity: 0,
              scale: 0
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="heart-3d absolute text-5xl"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${80 + Math.random() * 20}%`,
              fontSize: `${30 + Math.random() * 50}px`,
              color: ['#FF6B6B', '#FFB6C1', '#D4AF37', '#FF4757'][Math.floor(Math.random() * 4)],
              textShadow: '0 0 25px currentColor, 0 0 50px currentColor',
              opacity: 0.2,
              transform: 'scale(0)'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div ref={titleRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="hero-floating-text w-24 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />

        <h1 className="hero-title-3d font-script text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-white mb-2 leading-none tracking-wide" 
            style={{ 
              textShadow: '0 0 30px rgba(212,175,55,0.3), 0 20px 50px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d'
            }}>
          Ariel
        </h1>
        
        <div className="hero-subtitle-3d text-4xl md:text-6xl lg:text-7xl text-[#C9A84C] font-light mb-2"
             style={{
               textShadow: '0 0 40px rgba(212,175,55,0.3), 0 10px 30px rgba(0,0,0,0.3)',
               transformStyle: 'preserve-3d'
             }}>
          ✦
        </div>

        <h1 className="hero-title-3d font-script text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-white mb-4 leading-none"
            style={{ 
              textShadow: '0 0 30px rgba(212,175,55,0.3), 0 20px 50px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d'
            }}>
          Aracely
        </h1>

        <p className="hero-subtitle-3d text-xl md:text-3xl lg:text-4xl text-[#C9A84C]/90 font-light tracking-[0.3em] uppercase mb-4"
           style={{
             textShadow: '0 0 30px rgba(212,175,55,0.2), 0 5px 15px rgba(0,0,0,0.3)',
             transformStyle: 'preserve-3d',
             letterSpacing: '0.3em'
           }}>
          El Amor No Tiene Límites
        </p>
        
        <div className="hero-date-3d inline-block px-8 py-3 md:px-10 md:py-4 border-2 border-[#C9A84C]/40 rounded-full backdrop-blur-sm bg-black/30 hover:bg-black/50 transition-all duration-500 hover:scale-105 hover:border-[#C9A84C]/80 shadow-2xl"
             style={{
               transformStyle: 'preserve-3d',
               boxShadow: '0 0 40px rgba(212,175,55,0.1)'
             }}>
          <span className="text-white/90 text-lg md:text-2xl tracking-[0.2em] font-light">
            07 · NOVIEMBRE · 2026
          </span>
        </div>

        <p className="hero-floating-text text-white/40 text-xs md:text-sm mt-8 max-w-2xl mx-auto font-light tracking-[0.2em] uppercase">
          "El amor verdadero trasciende el tiempo y el espacio"
        </p>

        <button className="hero-floating-text mt-8 px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-[#1A0F0A] rounded-full hover:scale-105 transition-all duration-500 shadow-2xl text-sm md:text-lg font-semibold tracking-wider group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-3">
            DESCUBRE NUESTRA HISTORIA
            <span className="text-lg md:text-xl group-hover:translate-x-2 transition-transform duration-300">▶</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8D5A3] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-7 h-11 border-2 border-white/20 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
            <div className="w-1.5 h-3.5 bg-[#C9A84C]/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
