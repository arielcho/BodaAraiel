import { useState, useEffect } from 'react';
import gsap from 'gsap';

const PantallaCarga = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          onComplete();
        }
      });

      gsap.set('.sobre-contenedor', { scale: 1, opacity: 1 });
      gsap.set('.sobre-tapa', { rotateX: 0, transformOrigin: 'bottom' });
      gsap.set('.sobre-carta', { y: 0, opacity: 0 });

      tl
        .to('.sobre-tapa', {
          rotateX: 180,
          duration: 1.5,
          ease: 'power2.inOut'
        })
        .to('.sobre-carta', {
          y: -100,
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.5')
        .to('.sobre-contenedor', {
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: 'power2.inOut'
        }, '+=0.5');

    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#FFF8F0]">
      <div className="sobre-contenedor relative w-64 h-48 md:w-80 md:h-56 perspective-1000">
        <div className="absolute inset-0 bg-[#F7E7CE] rounded-lg shadow-2xl border-2 border-[#C9A84C]/30" />
        <div className="sobre-tapa absolute inset-0 bg-[#E8D5A3] rounded-lg border-2 border-[#C9A84C]/30"
             style={{ 
               clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
               transformOrigin: 'bottom',
               transformStyle: 'preserve-3d'
             }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-[#C9A84C]/20 flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-script text-[#C9A84C]">💕</span>
          </div>
        </div>
        <div className="sobre-carta absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs">
            <div className="text-center">
              <h2 className="font-script text-2xl md:text-3xl text-[#C9A84C]">Ariel & Aracely</h2>
              <p className="text-sm text-gray-500 mt-1">Te invitamos a nuestra boda</p>
              <div className="w-12 h-0.5 bg-[#C9A84C]/30 mx-auto mt-2" />
              <p className="text-xs text-gray-400 mt-2">07 · Noviembre · 2026</p>
            </div>
          </div>
        </div>
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#C9A84C]/40" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#C9A84C]/40" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#C9A84C]/40" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#C9A84C]/40" />
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-[#C9A84C] text-sm tracking-widest animate-pulse">Cargando...</p>
        </div>
      </div>
    </div>
  );
};

export default PantallaCarga;
