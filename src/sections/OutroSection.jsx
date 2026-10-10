import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import MinimalIcon from '../components/MinimalIcon';
import { assetUrl } from '../utils/assetUrl';
import { WHATSAPP_CONFIRM_URL } from '../utils/whatsapp';

const OutroSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

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

    const video = videoRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video?.play().catch(() => {});
      } else {
        video?.pause();
      }
    }, { threshold: 0.25 });

    if (video) observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="confirmar" ref={containerRef} className="section-container flex items-center justify-center py-28 relative overflow-hidden bg-[#17120f]">
      <video
        ref={videoRef}
        src={assetUrl('videos/vistaDron-web.mp4')}
        poster={assetUrl('videos/posters/vistaDron.jpg')}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Vista aerea del lugar de la boda"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-10" />

      <div className="outro-content text-center max-w-4xl mx-auto px-4 relative z-10">
        <div className="flex justify-center text-[#E8D5A3] mb-6 drop-shadow-[0_0_10px_rgba(201,168,76,0.3)]">
          <MinimalIcon name="heart" className="w-16 h-16 md:w-20 md:h-20" />
        </div>

        <h2 className="font-script text-5xl md:text-7xl lg:text-[5.5rem] text-white leading-snug mb-8 drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
          <AnimatedText text="Nos vemos el 7 de Noviembre" />
        </h2>

        <p className="text-base md:text-lg text-white/80 font-sans tracking-wide leading-relaxed italic max-w-lg mx-auto">
          "El amor es la fuerza mas hermosa del universo, el inicio de una aventura eterna."
        </p>

        <a
          href={WHATSAPP_CONFIRM_URL}
          target="_blank"
          rel="noreferrer"
          className="outro-confirm-button mt-9 inline-flex items-center gap-3 rounded-lg border border-[#E8D5A3]/55 bg-[#C9A84C] px-7 py-3.5 font-sans text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition duration-300 hover:bg-[#A8873A] hover:-translate-y-0.5"
        >
          <MinimalIcon name="heart" className="h-5 w-5" />
          Confirmar asistencia
        </a>

        <div className="mt-6 flex justify-center">
          <span className="inline-flex items-center gap-3 px-8 py-3 bg-black/25 backdrop-blur-md rounded-xl text-[#E8D5A3] border border-[#E8D5A3]/35 font-sans font-bold tracking-widest text-sm uppercase shadow-[0_4px_15px_rgba(0,0,0,0.18)]">
            <MinimalIcon name="rings" className="w-5 h-5" />
            Ariel & Aracely
          </span>
        </div>
      </div>
    </section>
  );
};

export default OutroSection;
