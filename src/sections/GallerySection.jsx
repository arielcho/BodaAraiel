import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import MinimalIcon from '../components/MinimalIcon';
import { assetUrl } from '../utils/assetUrl';

const PHOTO_COUNT = 14;

const GallerySection = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const images = useMemo(() => {
    const numbers = Array.from({ length: 100 }, (_, index) => index + 1);
    for (let index = numbers.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
    }
    return numbers.slice(0, PHOTO_COUNT).map((number, index) => ({
      src: assetUrl(`images/gallery/${number}.webp`),
      fallback: assetUrl(`images/1 (${number}).jpg`),
      alt: `Recuerdo de Ariel y Aracely ${index + 1}`,
    }));
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => setCurrentIndex((index) => (index + 1) % images.length), 5000);
    return () => window.clearInterval(timer);
  }, [images.length, isPaused]);

  useGSAP(() => {
    gsap.fromTo('.gallery-heading', { opacity: 0, y: 45 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 78%', once: true },
    });
    gsap.fromTo('.gallery-carousel', { opacity: 0, y: 60, scale: 0.96 }, {
      opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%', once: true },
    });
  }, { scope: containerRef });

  const showPrevious = () => setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  const showNext = () => setCurrentIndex((index) => (index + 1) % images.length);
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') showPrevious();
    if (event.key === 'ArrowRight') showNext();
  };

  return (
    <section id="galeria" ref={containerRef} className="section-container gallery-section overflow-hidden border-b border-[#C9A84C]/25">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="gallery-heading mb-10 text-center md:mb-14">
          <h2 className="font-script text-5xl text-[#3D2B1F] md:text-7xl"><AnimatedText text="Instantes de nuestra historia" /></h2>
          <p className="mt-3 font-sans text-xs font-black uppercase tracking-widest text-gray-500 sm:text-sm"><AnimatedText text="Recuerdos que guardamos en el corazon" type="words" /></p>
        </div>

        <div className="gallery-carousel" role="region" aria-label="Galeria de recuerdos" tabIndex="0" onKeyDown={handleKeyDown}>
          <div className="gallery-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
              <figure className="gallery-slide" key={image.src} aria-hidden={index !== currentIndex}>
                <img src={image.src} alt={image.alt} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = image.fallback; }} />
              </figure>
            ))}
          </div>
          <button type="button" className="carousel-control carousel-previous" onClick={showPrevious} aria-label="Foto anterior" title="Foto anterior"><MinimalIcon name="chevronLeft" className="h-6 w-6" /></button>
          <button type="button" className="carousel-control carousel-next" onClick={showNext} aria-label="Foto siguiente" title="Foto siguiente"><MinimalIcon name="chevronRight" className="h-6 w-6" /></button>
          <button type="button" className="carousel-autoplay" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'} title={isPaused ? 'Reanudar' : 'Pausar'}><MinimalIcon name={isPaused ? 'play' : 'pause'} className="h-4 w-4" /></button>
        </div>

        <div className="carousel-dots" aria-label="Seleccionar fotografia">
          {images.map((image, index) => (
            <button type="button" key={image.src} className={index === currentIndex ? 'is-active' : ''} onClick={() => setCurrentIndex(index)} aria-label={`Ver fotografia ${index + 1}`} aria-current={index === currentIndex ? 'true' : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
