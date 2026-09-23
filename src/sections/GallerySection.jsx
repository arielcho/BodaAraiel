import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import MinimalIcon from '../components/MinimalIcon';
import { assetUrl } from '../utils/assetUrl';

const GallerySection = () => {
  const containerRef = useRef(null);
  const images = useMemo(() => {
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
    for (let index = numbers.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
    }

    const icons = ['heart', 'sparkle', 'rings', 'camera', 'calendar', 'heart', 'sparkle', 'camera', 'rings'];
    return numbers.slice(0, 9).map((number, index) => ({
      src: assetUrl(`images/gallery/${number}.webp`),
      fallback: assetUrl(`images/1 (${number}).jpg`),
      title: `Momento ${String(index + 1).padStart(2, '0')}`,
      icon: icons[index],
    }));
  }, []);

  useGSAP(() => {
    gsap.set('.gallery-item', {
      opacity: 0,
      scale: 0.7,
      rotation: 5,
      filter: 'blur(5px)',
    });

    gsap.set('.gallery-title', {
      opacity: 0,
      y: 80,
      filter: 'blur(10px)',
    });

    gsap.set('.gallery-subtitle', {
      opacity: 0,
      y: 50,
    });

    gsap.to('.gallery-item', {
      opacity: 1,
      scale: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      stagger: {
        amount: 0.8,
        from: 'center',
        grid: 'auto',
      },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        scrub: 1,
      },
    });

    gsap.to('.gallery-title', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.to('.gallery-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.05,
          zIndex: 10,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          zIndex: 1,
          duration: 0.3,
          ease: 'power2.in',
        });
      });
    });
  }, []);

  return (
    <section id="galeria" ref={containerRef} className="section-container bg-[#FFF8F0] py-20 overflow-hidden border-b border-[#C9A84C]/25">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0] via-[#F7E7CE]/20 to-[#FFF8F0]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="gallery-title font-script text-5xl md:text-7xl text-[#3D2B1F] mb-4">
            <AnimatedText text="Nuestra Galeria" />
          </h2>
          <p className="gallery-subtitle text-gray-500 text-xs sm:text-sm tracking-widest uppercase font-sans font-black">
            <AnimatedText text="Momentos que capturan nuestra historia" type="words" />
          </p>
          <div className="gallery-subtitle w-24 h-px bg-[#C9A84C]/30 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, index) => (
            <div
              key={img.src}
              className="gallery-item group relative overflow-hidden rounded-xl aspect-square border border-white/5 shadow-2xl"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                onError={(e) => {
                  if (e.currentTarget.src !== new URL(img.fallback, window.location.origin).href) {
                    e.currentTarget.src = img.fallback;
                  }
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0612]/95 via-[#0B0612]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-4">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-[#FDF7F0] text-xs sm:text-sm font-sans font-bold tracking-wider uppercase">
                    {img.title}
                  </p>
                  <MinimalIcon name={img.icon} className="w-7 h-7 md:w-8 md:h-8 mt-2 mx-auto text-[#C9A84C]" />
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C9A84C]/60 transition-all duration-500 rounded-xl pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
