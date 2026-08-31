import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const PantallaCarga = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterActive, setIsLetterActive] = useState(false);
  const envelopeRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(
      '.envelope-wrapper',
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)' }
    );

    // Subtle floating animation
    gsap.to('.envelope-wrapper', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Handle mouse movement for 3D tilt effect on desktop
    const handleMouseMove = (e) => {
      if (isOpen) return; // Disable tilt once open
      const el = envelopeRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotationY: x * 20,
        rotationX: -y * 20,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      const el = envelopeRef.current;
      if (!el) return;
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLetterActive(true);
      }
    });

    // 1. Break and scale down seal
    tl.to('.envelope-seal', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'back.in(1.7)',
    })
    // 2. Open the top flap
    .to('.envelope-flap', {
      rotateX: -180,
      duration: 1.0,
      ease: 'power2.inOut',
    })
    // Adjust z-index of top flap so it lies behind the card
    .set('.envelope-flap', { zIndex: 5 })
    // 3. Slide the card up out of the envelope
    .to('.envelope-card', {
      y: -190,
      z: 50,
      scale: 1.05,
      duration: 1.2,
      ease: 'power3.out',
    })
    // 4. Move card to top z-index and bring it forward
    .set('.envelope-card', { zIndex: 100 })
    .to('.envelope-card', {
      y: -50,
      scale: 1.15,
      duration: 0.8,
      ease: 'back.out(1.2)',
    });
  };

  const handleEnterSite = () => {
    // Fade out everything and complete with a super smooth zoom-out fade effect
    gsap.to('.loader-container', {
      opacity: 0,
      scale: 0.95,
      duration: 1.5,
      ease: 'power3.inOut',
      onComplete: onComplete,
    });
  };

  return (
    <div className="loader-container fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#FFF8F0] overflow-hidden gta-grid-bg">
      {/* Background Palm Silhouettes & Gold Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -left-20 -bottom-20 w-[300px] h-[500px] bg-gradient-to-t from-[#E8D5A3] to-transparent rounded-full blur-[120px]" />
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-gradient-to-b from-[#F7E7CE] to-transparent rounded-full blur-[150px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center px-4">
        
        {/* Helper Title */}
        {!isOpen && (
          <div className="mb-8 text-center animate-pulse">
            <h3 className="font-sans font-black tracking-[0.3em] text-[#C9A84C] uppercase text-xs sm:text-sm">
              Tienes una invitación privada
            </h3>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1 tracking-wider font-semibold">
              Haz clic en el sello para abrir la carta
            </p>
          </div>
        )}

        {/* 3D Envelope Wrapper (Larger dimensions to prevent overflow) */}
        <div className="envelope-wrapper relative perspective-1000 w-[340px] h-[240px] sm:w-[440px] sm:h-[300px]">
          <div
            ref={envelopeRef}
            className="relative w-full h-full cursor-pointer"
            style={{ transformStyle: isOpen ? 'flat' : 'preserve-3d' }}
            onClick={!isOpen ? handleOpenEnvelope : undefined}
          >
            
            {/* 1. Envelope Back Cover */}
            <div className="absolute inset-0 bg-[#EAD8B7] rounded-2xl shadow-[0_20px_50px_rgba(61,43,31,0.15)] border border-[#C9A84C]/25" />

            {/* 2. Invitation Card (Inside) */}
            <div className="envelope-card absolute inset-x-3 top-3 bottom-3 bg-[#FFFFFF] rounded-xl p-3 sm:p-5 flex flex-col justify-between border border-[#C9A84C]/35 shadow-sm z-10 transform-style-3d transition-shadow duration-500">
              <div className="text-center my-auto flex flex-col items-center justify-center h-full">
                <span className="text-[#C9A84C] font-sans font-extrabold tracking-[0.2em] text-[9px] sm:text-xs uppercase block mb-1">
                  💍 NUESTRA BODA 💍
                </span>
                
                <h2 className="font-script text-3xl sm:text-5xl text-[#3D2B1F] leading-tight my-1 drop-shadow-[0_0_1px_rgba(201,168,76,0.1)]">
                  Ariel & Aracely
                </h2>

                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto my-1.5" />

                <p className="text-gray-600 font-sans text-[10px] sm:text-xs tracking-wider max-w-[270px] mx-auto leading-relaxed font-semibold">
                  Te invitamos a celebrar con nosotros el inicio de nuestro para siempre.
                </p>

                <p className="text-[#C9A84C] font-sans font-black text-[11px] sm:text-sm tracking-[0.2em] mt-2 sm:mt-3 uppercase">
                  SÁBADO 07 · NOV · 2026
                </p>
              </div>

              {isLetterActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnterSite();
                  }}
                  className="mt-3 py-2.5 sm:py-3.5 w-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-[#3D2B1F] rounded-lg font-sans font-black tracking-[0.15em] text-xs sm:text-sm shadow-[0_4px_15px_rgba(201,168,76,0.3)] hover:shadow-[0_4px_25px_rgba(201,168,76,0.5)] transform hover:scale-[1.02] transition-all duration-300 uppercase block relative z-[9999] pointer-events-auto"
                >
                  Entrar a la Boda
                </button>
              )}
            </div>

            {/* 3. Envelope Front Cover (Triangular Pocket Fold Overlay) */}
            <div className="absolute inset-0 z-20 pointer-events-none transform-style-3d">
              {/* Left fold */}
              <div 
                className="absolute inset-0 bg-[#E3D0AF] rounded-l-2xl border-l border-t-0 border-[#C9A84C]/10" 
                style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} 
              />
              {/* Right fold */}
              <div 
                className="absolute inset-0 bg-[#E3D0AF] rounded-r-2xl border-r border-[#C9A84C]/10" 
                style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }} 
              />
              {/* Bottom fold */}
              <div 
                className="absolute inset-0 bg-[#D9C6A5] rounded-b-2xl border-b border-[#C9A84C]/15" 
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }} 
              />
            </div>

            {/* 4. Top Flap (attaches at the top, folds down) */}
            <div 
              className="envelope-flap absolute inset-x-0 top-0 h-[52%] bg-[#D5C19F] origin-top z-30 border-t border-[#C9A84C]/20 rounded-t-2xl shadow-[0_5px_15px_rgba(61,43,31,0.08)]"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformStyle: 'preserve-3d',
              }} 
            />

            {/* 5. Glowing Wax Seal (attaches in the center top crease) */}
            <div className="envelope-seal absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-40 transform-style-3d transition-transform duration-300 hover:scale-110">
              <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center">
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-[#C9A84C] rounded-full blur-md opacity-45 animate-pulse" />
                {/* Seal Body */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#C9A84C] via-[#E8D5A3] to-[#A8873A] border-2 border-white shadow-[0_4px_10px_rgba(61,43,31,0.2)] flex items-center justify-center">
                  <span className="text-xl sm:text-2xl text-white transform hover:rotate-12 transition-transform duration-300 select-none">
                    💖
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative elements */}
        {!isOpen && (
          <div className="mt-12 text-center text-[10px] tracking-[0.4em] text-[#C9A84C]/60 uppercase font-bold">
            Ariel ✦ Aracely · 2026
          </div>
        )}
      </div>
    </div>
  );
};

export default PantallaCarga;
