import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const GallerySection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Configuración inicial - Efecto GTA
    gsap.set('.gallery-item', {
      opacity: 0,
      scale: 0.7,
      rotation: 5,
      filter: 'blur(5px)'
    });
    
    gsap.set('.gallery-title', {
      opacity: 0,
      y: 80,
      filter: 'blur(10px)'
    });

    gsap.set('.gallery-subtitle', {
      opacity: 0,
      y: 50
    });

    // Animación con scroll
    gsap.to('.gallery-item', {
      opacity: 1,
      scale: 1,
      rotation: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      stagger: {
        amount: 0.8,
        from: 'center',
        grid: 'auto'
      },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        scrub: 1
      }
    });

    // Animación de títulos
    gsap.to('.gallery-title', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to('.gallery-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Efecto de hover con GSAP (para imágenes)
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          scale: 1.05,
          zIndex: 10,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1,
          zIndex: 1,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
    });

  }, []);

  const images = [
    { src: '/images/1 (1).jpg', title: 'El Inicio', icon: '💕' },
    { src: '/images/1 (2).jpg', title: 'El Amor', icon: '❤️' },
    { src: '/images/1 (3).jpg', title: 'La Promesa', icon: '💍' },
    { src: '/images/1 (4).jpg', title: 'La Felicidad', icon: '✨' },
    { src: '/images/1 (5).jpg', title: 'El Día', icon: '🎊' },
    { src: '/images/1 (6).jpg', title: 'El Futuro', icon: '🌟' },
  ];

  return (
    <section id="galeria" ref={containerRef} className="section-container bg-black py-20 overflow-hidden">
      {/* Fondo con efecto GTA */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-boda-oro/30 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Títulos estilo GTA */}
        <div className="text-center mb-16">
          <h2 className="gallery-title font-script text-5xl md:text-7xl text-white mb-4">
            Nuestra <span className="text-boda-oro">Galería</span>
          </h2>
          <p className="gallery-subtitle text-white/60 text-sm md:text-base tracking-widest uppercase">
            Momentos que capturan nuestra historia de amor
          </p>
          <div className="gallery-subtitle w-24 h-0.5 bg-boda-oro/30 mx-auto mt-6" />
        </div>

        {/* Grid de imágenes estilo GTA */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="gallery-item group relative overflow-hidden rounded-xl aspect-square"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23D4AF37' font-size='40' font-family='Arial'%3E${img.icon}%3C/text%3E%3C/svg%3E`;
                }}
              />
              
              {/* Overlay estilo GTA */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-4">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-white text-sm md:text-base font-light tracking-wider">
                    {img.title}
                  </p>
                  <p className="text-boda-oro text-2xl md:text-3xl mt-1">
                    {img.icon}
                  </p>
                </div>
              </div>

              {/* Borde brillante al hover */}
              <div className="absolute inset-0 border-2 border-boda-oro/0 group-hover:border-boda-oro/50 transition-all duration-500 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
