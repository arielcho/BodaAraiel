import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MinimalIcon from '../components/MinimalIcon';
import { assetUrl } from '../utils/assetUrl';

const Hero = ({ isActive = false }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const introVideoRef = useRef(null);

  useEffect(() => {
    const video = introVideoRef.current;
    if (!video) return;
    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [isActive]);

  // Smoothly fade out scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const indicator = document.querySelector('.hero-scroll-indicator');
      if (!indicator) return;

      if (scrollY > 20) {
        gsap.to(indicator, { opacity: 0, y: 15, duration: 0.35, ease: 'power2.out', pointerEvents: 'none' });
      } else {
        gsap.to(indicator, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', pointerEvents: 'auto' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    gsap.set('.hero-scroll-indicator', {
      opacity: 1,
      y: 0
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
      }, 0)
      .to('.hero-scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power1.out'
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

    // GTA VI style background flying birds silhouette path animations
    const birds = document.querySelectorAll('.flying-bird');
    birds.forEach((bird, i) => {
      gsap.fromTo(bird,
        { x: '-15vw', y: 80 + Math.random() * 260, scale: 0.35 + Math.random() * 0.45, opacity: 0 },
        {
          x: '115vw',
          y: 40 + Math.random() * 130,
          opacity: 0.7,
          duration: 16 + Math.random() * 8,
          delay: i * 4.5,
          repeat: -1,
          ease: 'none'
        }
      );
    });

  }, []);

  return (
    <section ref={containerRef} className="hero-section section-container overflow-hidden min-h-screen relative flex flex-col justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={assetUrl('videos/posters/intro.jpg')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-55"
        />
        <video
          ref={introVideoRef}
          src={assetUrl('videos/intro-web.mp4')}
          poster={assetUrl('videos/posters/intro.jpg')}
          aria-label="Video de introduccion de la boda"
          className="hero-bg relative w-full h-full object-contain"
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/30 via-[#F7E7CE]/20 to-[#FFF8F0]" />
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8D5A3]/25 blur-3xl animate-pulse" />
      </div>

      {/* Floating gold light grids */}
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />

      {/* GTA VI Beach/Sky silhouette flying birds background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {[...Array(4)].map((_, i) => (
          <svg
            key={i}
            className="flying-bird absolute w-7 h-7 text-[#C9A84C]/35 opacity-0"
            viewBox="0 0 50 50"
            style={{
              animation: `flap-wing 0.55s infinite ease-in-out`
            }}
          >
            <path
              fill="currentColor"
              d="M 0 20 Q 20 0 25 15 Q 30 0 50 20 Q 25 35 0 20 Z"
            />
          </svg>
        ))}
      </div>

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
            className="heart-3d absolute"
            style={{
              left: 10 + Math.random() * 80 + '%',
              top: 80 + Math.random() * 20 + '%',
              width: 25 + Math.random() * 40 + 'px',
              height: 25 + Math.random() * 40 + 'px',
              color: ['#F5D6D6', '#FFB6C1', '#C9A84C', '#E8D5A3'][Math.floor(Math.random() * 4)],
              textShadow: '0 0 20px currentColor, 0 0 40px currentColor',
              opacity: 0.35,
              transform: 'scale(0)'
            }}
          >
            <MinimalIcon name="heart" className="w-full h-full" />
          </div>
        ))}
      </div>

      {/* Main Hero Content (pb-28 ensures button never overlaps with bottom scroll indicator) */}
      <div ref={titleRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20 pb-24 sm:pt-24 sm:pb-28" style={{ cursor: "default" }}>
        <div className="hero-floating-text w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-4 sm:mb-6" />

        <h1 className="hero-title-3d font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#3D2B1F] mb-1 sm:mb-2 leading-[1.3] py-2 sm:py-3 tracking-wide" 
            style={{ 
              textShadow: '0 0 35px rgba(201,168,76,0.3), 0 20px 50px rgba(0,0,0,0.05)',
              transformStyle: 'preserve-3d'
            }}>
          Ariel
        </h1>
        
        <div className="hero-subtitle-3d flex justify-center text-[#C9A84C] my-1 sm:my-2"
             style={{
               textShadow: '0 0 40px rgba(201,168,76,0.3), 0 10px 30px rgba(0,0,0,0.05)',
               transformStyle: 'preserve-3d'
             }}>
          <MinimalIcon name="sparkle" className="w-8 h-8 sm:w-10 sm:h-10 text-[#C9A84C] drop-shadow-[0_0_12px_rgba(201,168,76,0.35)]" />
        </div>

        <h1 className="hero-title-3d font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#3D2B1F] mb-3 sm:mb-4 leading-[1.3] py-2 sm:py-3" 
            style={{ 
              textShadow: '0 0 35px rgba(201,168,76,0.3), 0 20px 50px rgba(0,0,0,0.05)',
              transformStyle: 'preserve-3d'
            }}>
          Aracely
        </h1>

        <p className="hero-subtitle-3d text-xs sm:text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#A8873A] font-sans font-black tracking-[0.3em] uppercase mb-3 sm:mb-4"
           style={{
             textShadow: '0 0 30px rgba(201,168,76,0.15)',
             transformStyle: 'preserve-3d',
             letterSpacing: '0.3em'
           }}>
          El Amor No Tiene Límites
        </p>
        
        <div className="hero-date-3d inline-block px-6 py-2.5 sm:px-8 sm:py-3 border-2 border-[#C9A84C]/45 rounded-xl backdrop-blur-md bg-white/40 hover:bg-white/70 transition-all duration-500 hover:scale-105 hover:border-[#C9A84C]/80 shadow-[0_4px_25px_rgba(201,168,76,0.12)]"
             style={{
               transformStyle: 'preserve-3d',
             }}>
          <span className="text-[#3D2B1F]/90 text-xs sm:text-base md:text-lg tracking-[0.2em] font-sans font-extrabold uppercase">
            07 · NOVIEMBRE · 2026
          </span>
        </div>

        <p className="hero-floating-text text-[#3D2B1F]/55 text-[10px] sm:text-xs mt-5 sm:mt-7 max-w-xl mx-auto font-sans font-semibold tracking-[0.18em] uppercase">
          "El amor verdadero trasciende el tiempo y el espacio"
        </p>

        {/* Action Button */}
        <div className="hero-floating-text mt-6 sm:mt-8">
          <a href="#historia" className="inline-block px-8 py-3.5 sm:px-10 sm:py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-[#3D2B1F] rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_25px_rgba(201,168,76,0.5)] text-xs sm:text-base font-sans font-black tracking-widest group relative overflow-hidden uppercase">
            <span className="relative z-10 flex items-center gap-2 sm:gap-3">
              Descubre nuestra historia
              <MinimalIcon name="arrow" className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8D5A3] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
        </div>
      </div>

      {/* Scroll indicator: clearly separated at the bottom, fades out smoothly on scroll */}
      <div className="hero-scroll-indicator absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[#3D2B1F]/45 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-black">Desplazar</span>
          <div className="w-6 h-10 sm:w-7 sm:h-11 border-2 border-[#C9A84C]/45 rounded-full flex justify-center backdrop-blur-sm bg-white/30 shadow-sm">
            <div className="w-1.5 h-3 bg-[#C9A84C] rounded-full mt-2 animate-bounce" />
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
