import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import MinimalIcon from '../components/MinimalIcon';

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
    <section id="historia" ref={containerRef} className="section-container bg-gradient-to-b from-[#FFF8F0] via-[#F7E7CE]/20 to-[#FFF8F0] py-20 overflow-hidden gta-grid-bg border-b border-[#C9A84C]/25">
      <div className="absolute inset-0">
        <div className="story-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E8D5A3]/10 blur-3xl opacity-0" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="story-icon flex justify-center text-[#C9A84C] mb-4">
            <MinimalIcon name="book" className="w-12 h-12 md:w-14 md:h-14" />
          </div>
          <h2 className="story-text font-script text-5xl md:text-7xl text-[#3D2B1F] mb-4">
            <AnimatedText text="Nuestra Historia" />
          </h2>
          <div className="story-text w-24 h-0.5 bg-[#C9A84C]/30 mx-auto" />
        </div>

        <div className="space-y-8">
          <div className="story-card gta-panel rounded-2xl p-6 sm:p-8 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-500 group shadow-md bg-white/80">
            <div className="flex items-start gap-4">
              <div className="story-icon text-[#C9A84C] flex-shrink-0">
                <MinimalIcon name="heart" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-[#C9A84C] text-xl md:text-2xl font-sans font-black tracking-wide mb-2 uppercase">El Encuentro</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans font-semibold">
                  En el momento menos esperado, nuestros caminos se cruzaron.
                  Fue como si el destino hubiera escrito nuestra historia mucho antes de que nos conociéramos.
                </p>
              </div>
            </div>
          </div>

          <div className="story-card gta-panel rounded-2xl p-6 sm:p-8 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-500 group shadow-md bg-white/80">
            <div className="flex items-start gap-4">
              <div className="story-icon text-[#C9A84C] flex-shrink-0">
                <MinimalIcon name="sparkle" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-[#C9A84C] text-xl md:text-2xl font-sans font-black tracking-wide mb-2 uppercase">El Amor</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans font-semibold">
                  Cada día a tu lado es un capítulo nuevo en nuestra historia.
                  Juntos hemos construido un amor que trasciende el tiempo y el espacio.
                </p>
              </div>
            </div>
          </div>

          <div className="story-card gta-panel rounded-2xl p-6 sm:p-8 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-500 group shadow-md bg-white/80">
            <div className="flex items-start gap-4">
              <div className="story-icon text-[#C9A84C] flex-shrink-0">
                <MinimalIcon name="rings" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-[#C9A84C] text-xl md:text-2xl font-sans font-black tracking-wide mb-2 uppercase">La Promesa</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans font-semibold">
                  El 07 de Noviembre de 2026, frente a quienes más queremos,
                  sellaremos nuestro amor con la promesa de amarnos para siempre.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="story-text text-center text-gray-500 text-xs sm:text-sm mt-12 tracking-wider font-sans font-semibold italic">
          "El amor verdadero no tiene final feliz, porque el amor verdadero simplemente no tiene final"
        </p>
      </div>
    </section>
  );
};

export default StorySection;
