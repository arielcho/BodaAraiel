import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const StorySection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set('.story-text', {
      opacity: 0,
      y: 80,
      filter: 'blur(10px)'
    });
    
    gsap.set('.story-card', {
      opacity: 0,
      scale: 0.8,
      rotationX: 10
    });

    gsap.set('.story-icon', {
      opacity: 0,
      scale: 0
    });

    gsap.to('.story-text', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to('.story-card', {
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to('.story-icon', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to('.story-glow', {
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  return (
    <section id="historia" ref={containerRef} className="section-container bg-gradient-to-b from-[#FFF8F0] via-[#F7E7CE] to-[#FFF8F0] py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="story-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/5 blur-3xl opacity-0" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="story-icon text-5xl md:text-6xl mb-4">📖</div>
          <h2 className="story-text font-script text-5xl md:text-7xl text-[#3D2B1F] mb-4">
            Nuestra <span className="text-[#C9A84C]">Historia</span>
          </h2>
          <div className="story-text w-24 h-0.5 bg-[#C9A84C]/30 mx-auto" />
        </div>

        <div className="space-y-8">
          <div className="story-card bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-500 group shadow-lg">
            <div className="flex items-start gap-4">
              <div className="story-icon text-3xl flex-shrink-0">💕</div>
              <div>
                <h3 className="text-[#C9A84C] text-xl md:text-2xl font-script mb-2">El Encuentro</h3>
                <p className="text-[#3D2B1F]/70 text-base md:text-lg leading-relaxed">
                  En el momento menos esperado, nuestros caminos se cruzaron.
                  Fue como si el destino hubiera escrito nuestra historia mucho antes de que nos conociéramos.
                </p>
              </div>
            </div>
          </div>

          <div className="story-card bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-500 group shadow-lg">
            <div className="flex items-start gap-4">
              <div className="story-icon text-3xl flex-shrink-0">❤️</div>
              <div>
                <h3 className="text-[#C9A84C] text-xl md:text-2xl font-script mb-2">El Amor</h3>
                <p className="text-[#3D2B1F]/70 text-base md:text-lg leading-relaxed">
                  Cada día a tu lado es un capítulo nuevo en nuestra historia.
                  Juntos hemos construido un amor que trasciende el tiempo y el espacio.
                </p>
              </div>
            </div>
          </div>

          <div className="story-card bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-500 group shadow-lg">
            <div className="flex items-start gap-4">
              <div className="story-icon text-3xl flex-shrink-0">💍</div>
              <div>
                <h3 className="text-[#C9A84C] text-xl md:text-2xl font-script mb-2">La Promesa</h3>
                <p className="text-[#3D2B1F]/70 text-base md:text-lg leading-relaxed">
                  El 07 de Noviembre de 2026, frente a quienes más queremos,
                  sellaremos nuestro amor con la promesa de amarnos para siempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="story-text text-center text-[#3D2B1F]/40 text-sm md:text-base mt-12 tracking-wider font-light italic">
          "El amor verdadero no tiene final feliz, porque el amor verdadero simplemente no tiene final"
        </p>
      </div>
    </section>
  );
};

export default StorySection;
