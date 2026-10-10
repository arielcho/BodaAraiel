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
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0]/55 via-[#FFF8F0]/25 to-[#FFF8F0]/90" />
        <div className="absolute inset-0 bg-white/10 backdrop-brightness-[0.82]" />
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

        <h1 className="hero-title-3d font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#3D2B1F] mb-1 sm:mb-2 leading-[1.2] py-2 sm:py-3 tracking-wide" 
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

        <h1 className="hero-title-3d font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#3D2B1F] mb-3 sm:mb-5 leading-[1.2] py-2 sm:py-3" 
            style={{ 
              textShadow: '0 0 35px rgba(201,168,76,0.3), 0 20px 50px rgba(0,0,0,0.05)',
              transformStyle: 'preserve-3d'
            }}>
          Aracely
        </h1>

        <p className="hero-subtitle-3d max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-[#3D2B1F] font-serif italic font-semibold leading-relaxed mb-4 sm:mb-6"
           style={{
             textShadow: '0 2px 18px rgba(255,248,240,0.95), 0 1px 2px rgba(255,255,255,0.9)',
             transformStyle: 'preserve-3d',
           }}>
          "Todo lo cree, todo lo espera, todo lo soporta."
        </p>
        <p className="hero-floating-text text-[#7E642E] text-[10px] sm:text-xs mt-2 font-sans font-black tracking-[0.24em] uppercase">
          1 Corintios 13:7
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0]/40 via-transparent to-[#FFF8F0]/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
