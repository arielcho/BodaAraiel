import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import MinimalIcon from '../components/MinimalIcon';

const OutroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set('.outro-content', { opacity: 0, y: 100 });

    gsap.to('.outro-content', {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 40%',
        end: 'top 10%',
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <section id="confirmar" ref={containerRef} className="section-container flex items-center justify-center bg-gradient-to-b from-[#FFF8F0] via-[#F7E7CE]/20 to-[#FFF8F0] py-28 relative overflow-hidden">
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-20" />
      <div className="absolute -bottom-16 w-[400px] h-[400px] bg-[#E8D5A3]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="outro-content text-center max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex justify-center text-[#C9A84C] mb-6 drop-shadow-[0_0_10px_rgba(201,168,76,0.3)]">
          <MinimalIcon name="heart" className="w-16 h-16 md:w-20 md:h-20" />
        </div>

        <h2 className="font-script text-5xl md:text-7xl lg:text-[5.5rem] text-[#3D2B1F] leading-snug mb-8">
          <AnimatedText text="Nos vemos el 07 de Noviembre" />
        </h2>

        <p className="text-base md:text-lg text-gray-500 font-sans tracking-wide leading-relaxed italic max-w-lg mx-auto">
          "El amor es la fuerza mas hermosa del universo, el inicio de una aventura eterna."
        </p>

        <div className="mt-10 flex justify-center">
          <span className="inline-flex items-center gap-3 px-8 py-3 bg-[#C9A84C]/10 rounded-xl text-[#C9A84C] border border-[#C9A84C]/20 font-sans font-bold tracking-widest text-sm uppercase shadow-[0_4px_15px_rgba(201,168,76,0.08)] hover:border-[#C9A84C]/50 transition-all duration-500">
            <MinimalIcon name="rings" className="w-5 h-5" />
            Ariel & Aracely
          </span>
        </div>
      </div>
    </section>
  );
};

export default OutroSection;
