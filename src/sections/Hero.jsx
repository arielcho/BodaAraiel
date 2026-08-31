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
      filter: 'brightness(0.7)'
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
        filter: 'brightness(0.8)',
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/30 via-[#F7E7CE]/20 to-[#FFF8F0]" />
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8D5A3]/25 blur-3xl animate-pulse" />
      </div>

      {/* Floating gold light grids */}
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="sparkle-particle absolute"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              width: 3 + Math.random() * 4 + 'px',
              height: 3 + Math.random() * 4 + 'px',
              background: ['#C9A84C', '#E8D5A3', '#FFFFFF', '#A8873A'][Math.floor(Math.random() * 4)],
              borderRadius: '50%',
              boxShadow: '0 0 10px currentColor',
              opacity: 0,
              scale: 0
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="heart-3d absolute text-5xl"
            style={{
              left: 10 + Math.random() * 80 + '%',
              top: 80 + Math.random() * 20 + '%',
              fontSize: 25 + Math.random() * 40 + 'px',
              color: ['#F5D6D6', '#FFB6C1', '#C9A84C', '#E8D5A3'][Math.floor(Math.random() * 4)],
              textShadow: '0 0 20px currentColor, 0 0 40px currentColor',
              opacity: 0.35,
              transform: 'scale(0)'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div ref={titleRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-28 pb-12 sm:pt-32" style={{ cursor: "default" }}>
        <div className="hero-floating-text w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />

        <h1 className="hero-title-3d font-script text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-[#3D2B1F] mb-2 leading-[1.1] pb-3 tracking-wide" 
            style={{ 
              textShadow: '0 0 35px rgba(201,168,76,0.3), 0 20px 50px rgba(0,0,0,0.05)',
              transformStyle: 'preserve-3d'
            }}>
          Ariel
        </h1>
        
        <div className="hero-subtitle-3d text-4xl md:text-6xl lg:text-7xl text-[#C9A84C] font-light mb-2"
             style={{
               textShadow: '0 0 40px rgba(201,168,76,0.3), 0 10px 30px rgba(0,0,0,0.05)',
               transformStyle: 'preserve-3d'
             }}>
          ✦
        </div>

        <h1 className="hero-title-3d font-script text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-[#3D2B1F] mb-4 leading-[1.1] pb-3"
            style={{ 
              textShadow: '0 0 35px rgba(201,168,76,0.3), 0 20px 50px rgba(0,0,0,0.05)',
              transformStyle: 'preserve-3d'
            }}>
          Aracely
        </h1>

        <p className="hero-subtitle-3d text-sm md:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#A8873A] font-sans font-black tracking-[0.4em] uppercase mb-4"
           style={{
             textShadow: '0 0 30px rgba(201,168,76,0.15)',
             transformStyle: 'preserve-3d',
             letterSpacing: '0.4em'
           }}>
          El Amor No Tiene Límites
        </p>
        
        <div className="hero-date-3d inline-block px-8 py-3 md:px-10 md:py-4 border-2 border-[#C9A84C]/45 rounded-xl backdrop-blur-md bg-white/40 hover:bg-white/70 transition-all duration-500 hover:scale-105 hover:border-[#C9A84C]/80 shadow-[0_4px_25px_rgba(201,168,76,0.12)]"
             style={{
               transformStyle: 'preserve-3d',
             }}>
          <span className="text-[#3D2B1F]/90 text-sm md:text-xl tracking-[0.25em] font-sans font-extrabold uppercase">
            07 · NOVIEMBRE · 2026
          </span>
        </div>

        <p className="hero-floating-text text-[#3D2B1F]/50 text-[10px] md:text-xs mt-8 max-w-2xl mx-auto font-sans font-semibold tracking-[0.2em] uppercase">
          "El amor verdadero trasciende el tiempo y el espacio"
        </p>

        <a href="#historia" className="hero-floating-text mt-8 inline-block px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-[#3D2B1F] rounded-xl hover:scale-105 transition-all duration-500 shadow-[0_4px_20px_rgba(201,168,76,0.35)] text-sm md:text-lg font-sans font-black tracking-widest group relative overflow-hidden uppercase">
          <span className="relative z-10 flex items-center gap-3">
            Descubre nuestra historia
            <span className="text-lg md:text-xl group-hover:translate-x-2 transition-transform duration-300">▶</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8D5A3] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#3D2B1F]/40 text-[10px] tracking-[0.3em] uppercase font-bold">Desplazar</span>
          <div className="w-7 h-11 border-2 border-[#C9A84C]/35 rounded-full flex justify-center backdrop-blur-sm bg-white/20">
            <div className="w-1.5 h-3.5 bg-[#C9A84C]/80 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0]/40 via-transparent to-[#FFF8F0]/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
