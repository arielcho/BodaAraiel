import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const PantallaCarga = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterActive, setIsLetterActive] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const envelopeRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(
      '.envelope-wrapper',
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)' }
    );

    // Subtle floating animation
    const floatAnim = gsap.to('.envelope-wrapper', {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Handle mouse movement for 3D tilt effect on desktop
    const handleMouseMove = (e) => {
      if (isOpen) return;
      const el = envelopeRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotationY: x * 22,
        rotationX: -y * 22,
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

    // Gyroscope tilt effect for mobile devices
    const handleDeviceOrientation = (e) => {
      if (isOpen) return;
      const el = envelopeRef.current;
      if (!el) return;

      // gamma is left-to-right tilt (-90 to 90)
      // beta is front-to-back tilt (-180 to 180)
      const tiltX = Math.min(Math.max(e.beta - 45, -30), 30); // center around 45deg typing tilt
      const tiltY = Math.min(Math.max(e.gamma, -30), 30);

      gsap.to(el, {
        rotationY: tiltY * 0.7,
        rotationX: -tiltX * 0.7,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    // Request iOS orientation permissions if available
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().catch(() => {});
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      clearTimeout(fallbackTimerRef.current);
      floatAnim.kill();
    };
  }, [isOpen]);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Tactile bounce click feedback animation
    gsap.timeline()
      .to('.envelope-wrapper', { scale: 0.95, duration: 0.15, ease: 'power2.out' })
      .to('.envelope-wrapper', { 
        scale: 1, 
        duration: 0.4, 
        ease: 'back.out(2)',
        onComplete: startOpeningSequence 
      });
  };

  const startOpeningSequence = () => {
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
    if (isEntering) return;
    setIsEntering(true);

    const completeLoader = () => {
      clearTimeout(fallbackTimerRef.current);
      onComplete?.();
    };

    fallbackTimerRef.current = setTimeout(completeLoader, 1800);

    // Fade out everything and complete with a super smooth zoom-out fade effect
    gsap.to('.loader-container', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power3.inOut',
      pointerEvents: 'none',
      onComplete: completeLoader,
    });
  };

  return (
    <div 
      className={`loader-container fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#FFF8F0] overflow-hidden gta-grid-bg ${!isOpen ? 'cursor-pointer' : ''}`}
      onClick={!isOpen ? handleOpenEnvelope : undefined}
    >
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
              Haz clic en cualquier parte de la pantalla para abrir la invitación
            </p>
          </div>
        )}

        {/* 3D Envelope Wrapper (Enlarged and interactive hover) */}
        <div className="envelope-wrapper relative perspective-1000 w-[340px] h-[240px] sm:w-[440px] sm:h-[300px] transition-transform duration-500 hover:scale-[1.03]">
          <div
            ref={envelopeRef}
            className="relative w-full h-full"
            style={{ transformStyle: isOpen ? 'flat' : 'preserve-3d' }}
          >
            
            {/* 1. Envelope Back Cover */}
            <div className="absolute inset-0 bg-[#EAD8B7] rounded-2xl shadow-[0_20px_50px_rgba(61,43,31,0.15)] border border-[#C9A84C]/25" />

            {/* 2. Invitation Card (Inside) */}
            <div className="envelope-card absolute inset-x-3 top-3 bottom-3 bg-[#FFFFFF] rounded-xl p-3 sm:p-5 flex flex-col justify-between border border-[#C9A84C]/35 shadow-sm z-10 transform-style-3d transition-shadow duration-500">
              <div className="text-center my-auto flex flex-col items-center justify-center h-full">
                {/* Minimalist Ring Icon (SVG) */}
                <svg className="w-6 h-6 text-[#C9A84C] mb-1 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                </svg>
                
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
                  type="button"
                  disabled={isEntering}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnterSite();
                  }}
                  className="mt-3 py-2.5 sm:py-3.5 w-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-[#3D2B1F] rounded-lg font-sans font-black tracking-[0.15em] text-xs sm:text-sm shadow-[0_4px_15px_rgba(201,168,76,0.3)] hover:shadow-[0_4px_25px_rgba(201,168,76,0.5)] transform hover:scale-[1.02] transition-all duration-300 uppercase block relative z-[9999] pointer-events-auto disabled:opacity-70 disabled:cursor-wait"
                >
                  {isEntering ? 'Ingresando...' : 'Entrar a la Boda'}
                </button>
              )}
            </div>

            {/* 3. Envelope Front Cover */}
            <div className="absolute inset-0 z-20 pointer-events-none transform-style-3d">
              <div 
                className="absolute inset-0 bg-[#E3D0AF] rounded-l-2xl border-l border-t-0 border-[#C9A84C]/10" 
                style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }} 
              />
              <div 
                className="absolute inset-0 bg-[#E3D0AF] rounded-r-2xl border-r border-[#C9A84C]/10" 
                style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }} 
              />
              <div 
                className="absolute inset-0 bg-[#D9C6A5] rounded-b-2xl border-b border-[#C9A84C]/15" 
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)' }} 
              />
            </div>

            {/* 4. Top Flap */}
            <div 
              className="envelope-flap absolute inset-x-0 top-0 h-[52%] bg-[#D5C19F] origin-top z-30 border-t border-[#C9A84C]/20 rounded-t-2xl shadow-[0_5px_15px_rgba(61,43,31,0.08)]"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformStyle: 'preserve-3d',
              }} 
            />

            {/* 5. Glowing Wax Seal (Minimalist interlocking hearts SVG) */}
            <div className="envelope-seal absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-40 transform-style-3d transition-transform duration-300">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#C9A84C] rounded-full blur-md opacity-45 animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#C9A84C] via-[#E8D5A3] to-[#A8873A] border-2 border-white shadow-[0_4px_10px_rgba(61,43,31,0.2)] flex items-center justify-center p-2">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
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
