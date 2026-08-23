import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);

  // ðŸŽ¨ Efecto de lluvia de pÃ©talos/imÃ¡genes con Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const PARTICLES_COUNT = 40;

    // Configurar canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Crear partÃ­culas (pÃ©talos/imÃ¡genes)
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50 - Math.random() * 200;
        this.size = 15 + Math.random() * 30;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = 0.5 + Math.random() * 1.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 3;
        this.opacity = 0.3 + Math.random() * 0.6;
        this.type = Math.floor(Math.random() * 4); // 0: pÃ©talo, 1: corazÃ³n, 2: estrella, 3: cÃ­rculo
        this.color = ['#C9A84C', '#F5D6D6', '#E8837A', '#E8D5A3', '#FDF7F0', '#6B2D3B'][Math.floor(Math.random() * 6)];
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.wobbleAmount = 0.5 + Math.random() * 1.5;
      }

      update() {
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * this.wobbleAmount * 0.1;

        if (this.y > canvas.height + 50) {
          this.reset();
          this.y = -50 - Math.random() * 100;
        }
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        // Dibujar diferentes formas
        switch(this.type) {
          case 0: // PÃ©talo
            ctx.beginPath();
            ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.4, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            break;
          case 1: // CorazÃ³n
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            const s = this.size * 0.4;
            ctx.beginPath();
            ctx.moveTo(0, s * 0.3);
            ctx.bezierCurveTo(-s * 0.8, -s * 0.5, -s * 0.4, -s * 1.2, 0, -s * 0.6);
            ctx.bezierCurveTo(s * 0.4, -s * 1.2, s * 0.8, -s * 0.5, 0, s * 0.3);
            ctx.fill();
            break;
          case 2: // Estrella
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 20;
            const points = 5;
            const outerRadius = this.size * 0.5;
            const innerRadius = this.size * 0.25;
            ctx.beginPath();
            for (let i = 0; i < points * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (i * Math.PI) / points - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            break;
          case 3: // CÃ­rculo con brillo
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.6);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(0.5, this.color + '80');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
            ctx.fill();
            break;
        }

        ctx.restore();
      }
    }

    // Inicializar partÃ­culas
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    // AnimaciÃ³n
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar partÃ­culas
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Animations
  useGSAP(() => {
    gsap.set('.hero-title-3d', {
      opacity: 0,
      y: 150,
      scale: 0.6,
      rotationX: 25,
      rotationY: -10,
      filter: 'blur(15px)',
      perspective: 1000
    });
    
    gsap.set('.hero-subtitle-3d', {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotationX: 15,
      filter: 'blur(10px)'
    });
    
    gsap.set('.hero-date-3d', {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotationX: 10,
      filter: 'blur(8px)'
    });
    
    gsap.set('.hero-floating-text', {
      opacity: 0,
      y: 40,
      scale: 0.9
    });

    gsap.set('.hero-bg', {
      scale: 1.15,
      filter: 'brightness(0.45)'
    });

    gsap.set('.hero-glow', {
      opacity: 0,
      scale: 0.3
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
        filter: 'brightness(0.6)',
        duration: 3,
        ease: 'none'
      }, 0)
      .to('.hero-glow', {
        opacity: 0.5,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      }, 0);

    // Tilt 3D
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
            rotationY: x * 10,
            rotationX: -y * 7,
            duration: 0.8,
            ease: 'power2.out'
          });
          
          gsap.to('.hero-subtitle-3d', {
            rotationY: x * 5,
            rotationX: -y * 3,
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

  }, []);

  return (
    <section ref={containerRef} className="hero-section section-container overflow-hidden">
      {/* ðŸŽ¨ Canvas para lluvia de imÃ¡genes/pÃ©talos */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-5"
        style={{ opacity: 0.6 }}
      />

      {/* Fondo con gradiente mejorado */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/BodaAraiel/images/hero-bg.jpg" 
          alt="Fondo Boda" 
          className="hero-bg w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradiente mÃ¡s cÃ¡lido y romÃ¡ntico */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6B2D3B]/80 via-[#2C1810]/60 to-[#1A0F0A]/90" />
        <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#C9A84C]/20 blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#C9A84C]/10 to-transparent" />
      </div>

      {/* Contenido principal */}
      <div ref={titleRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* LÃ­nea decorativa ORO */}
        <div className="hero-floating-text w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mb-6" />

        {/* TÃ­tulo principal - ORO */}
        <h1 className="hero-title-3d font-script text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-[#FDF7F0] mb-2 leading-none tracking-wide" 
            style={{ 
              textShadow: '0 0 40px rgba(201,168,76,0.3), 0 20px 60px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d'
            }}>
          Ariel
        </h1>
        
        {/* SÃ­mbolo - ORO */}
        <div className="hero-subtitle-3d text-4xl md:text-6xl lg:text-7xl text-[#C9A84C] font-light mb-2"
             style={{
               textShadow: '0 0 50px rgba(201,168,76,0.3), 0 10px 30px rgba(0,0,0,0.3)',
               transformStyle: 'preserve-3d'
             }}>
          âœ¦
        </div>

        {/* Segundo nombre */}
        <h1 className="hero-title-3d font-script text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] text-[#FDF7F0] mb-4 leading-none"
            style={{ 
              textShadow: '0 0 40px rgba(201,168,76,0.3), 0 20px 60px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d'
            }}>
          Aracely
        </h1>

        {/* SubtÃ­tulo - CORAL */}
        <p className="hero-subtitle-3d text-xl md:text-3xl lg:text-4xl text-[#E8837A] font-light tracking-[0.3em] uppercase mb-4"
           style={{
             textShadow: '0 0 30px rgba(232,131,122,0.2), 0 5px 15px rgba(0,0,0,0.3)',
             transformStyle: 'preserve-3d',
             letterSpacing: '0.3em'
           }}>
          El Amor No Tiene LÃ­mites
        </p>
        
        {/* Fecha - ORO */}
        <div className="hero-date-3d inline-block px-8 py-3 md:px-10 md:py-4 border border-[#C9A84C]/40 rounded-full backdrop-blur-sm bg-black/30 hover:bg-black/40 transition-all duration-500 hover:scale-105 hover:border-[#C9A84C]/80 shadow-2xl"
             style={{
               transformStyle: 'preserve-3d',
               boxShadow: '0 0 40px rgba(201,168,76,0.1)'
             }}>
          <span className="text-[#E8D5A3] text-lg md:text-2xl tracking-[0.2em] font-light">
            07 Â· NOVIEMBRE Â· 2026
          </span>
        </div>

        {/* Texto adicional */}
        <p className="hero-floating-text text-[#E8D5A3]/50 text-xs md:text-sm mt-8 max-w-2xl mx-auto font-light tracking-[0.2em] uppercase">
          "El amor verdadero trasciende el tiempo y el espacio"
        </p>

        {/* BotÃ³n - ORO */}
        <button className="hero-floating-text mt-8 px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-[#1A0F0A] rounded-full hover:scale-105 transition-all duration-500 shadow-2xl text-sm md:text-lg font-semibold tracking-wider group relative overflow-hidden">
          <span className="relative z-10 flex items-center gap-3">
            DESCUBRE NUESTRA HISTORIA
            <span className="text-lg md:text-xl group-hover:translate-x-2 transition-transform duration-300">â–¶</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8D5A3] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#E8D5A3]/40 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-7 h-11 border border-[#C9A84C]/30 rounded-full flex justify-center backdrop-blur-sm bg-black/20">
            <div className="w-1.5 h-3.5 bg-[#C9A84C]/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Efecto de viÃ±eta */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/40 via-transparent to-[#6B2D3B]/10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1A0F0A]/70 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;

