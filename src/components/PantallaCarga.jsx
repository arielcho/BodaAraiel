import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const PantallaCarga = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterActive, setIsLetterActive] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const envelopeRef = useRef(null);
  const floatAnimRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(
      '.envelope-wrapper',
      { scale: 0.85, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)' }
    );

    // Subtle floating animation (killed immediately when opened)
    floatAnimRef.current = gsap.to('.envelope-wrapper', {
      y: -6,
      duration: 2.8,
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
        rotationY: x * 18,
        rotationX: -y * 18,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (isOpen) return;
      const el = envelopeRef.current;
      if (!el) return;
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    // Gyroscope tilt effect for mobile devices
    const handleDeviceOrientation = (e) => {
      if (isOpen) return;
      const el = envelopeRef.current;
      if (!el) return;

      const tiltX = Math.min(Math.max(e.beta - 45, -20), 20);
      const tiltY = Math.min(Math.max(e.gamma, -20), 20);

      gsap.to(el, {
        rotationY: tiltY * 0.5,
        rotationX: -tiltX * 0.5,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission().catch(() => {});
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      clearTimeout(fallbackTimerRef.current);
      if (floatAnimRef.current) floatAnimRef.current.kill();
    };
  }, [isOpen]);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    window.dispatchEvent(new CustomEvent('wedding:open'));

    // 1. Immediately kill floating wobble
    if (floatAnimRef.current) {
      floatAnimRef.current.kill();
    }
    gsap.to('.envelope-wrapper', { y: 0, scale: 1, duration: 0.2 });

    // 2. Immediately reset any 3D tilt angles to completely flat
    if (envelopeRef.current) {
      gsap.to(envelopeRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
    }

    // 3. Trigger clean opening sequence
    startOpeningSequence();
  };

  const startOpeningSequence = () => {
    const isMobile = window.innerWidth < 640;
    const targetY = isMobile ? -130 : -165;
    const targetScale = isMobile ? 1.06 : 1.12;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLetterActive(true);
      }
    });

    // Step 0: Fade out top helper title so opened card has full room
    tl.to('.envelope-helper-title', {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Step 1: Break & hide wax seal
    .to('.envelope-seal', {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: 'back.in(1.7)',
    }, '-=0.15')
    .set('.envelope-seal', { display: 'none', pointerEvents: 'none' })

    // Step 2: Open top flap backwards (-180deg)
    .to('.envelope-flap', {
      rotateX: -180,
      duration: 0.55,
      ease: 'power2.inOut',
    })
    // Move flap behind back cover so it doesn't block the card
    .set('.envelope-flap', { zIndex: 0, pointerEvents: 'none' })

    // Step 3: Card slides UP and OUT from inside the pocket
    .set('.envelope-card', { opacity: 1, pointerEvents: 'auto' })
    .to('.envelope-card', {
      y: targetY * 0.5,
      duration: 0.35,
      ease: 'power2.out',
    })
    // As soon as the card clears the pocket, lift its z-index above the envelope front
    .set('.envelope-card', { zIndex: 50 })
    // Continue moving card to full elevated presentation
    .to('.envelope-card', {
      y: targetY,
      scale: targetScale,
      duration: 0.5,
      ease: 'back.out(1.2)',
    })

    // Step 4: The entire envelope assembly (back + front + flap) lowers slightly and softens as a background pedestal
    .to('.envelope-outer-box', {
      y: isMobile ? 30 : 45,
      opacity: 0.4,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.5');
  };

  const handleEnterSite = () => {
    if (isEntering) return;
    setIsEntering(true);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const completeLoader = () => {
      clearTimeout(fallbackTimerRef.current);
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      onComplete?.();
    };

    fallbackTimerRef.current = setTimeout(completeLoader, 1600);

    // Fade out everything and complete with a super smooth zoom-out fade effect
    gsap.to('.loader-container', {
      opacity: 0,
      scale: 0.96,
      duration: 0.8,
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
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-[480px]">
        
        {/* Helper Title */}
        {!isOpen && (
          <div className="envelope-helper-title mb-6 sm:mb-8 text-center animate-pulse transition-opacity duration-300">
            <h3 className="font-sans font-black tracking-[0.25em] text-[#C9A84C] uppercase text-xs sm:text-sm">
              Tienes una invitación privada
            </h3>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1 tracking-wider font-semibold">
              Haz clic en cualquier parte de la pantalla para abrir la invitación
            </p>
          </div>
        )}

        {/* 3D Envelope Wrapper */}
        <div className={`envelope-wrapper relative w-[310px] h-[215px] sm:w-[420px] sm:h-[280px] ${!isOpen ? 'perspective-1000 transition-transform duration-500 hover:scale-[1.02]' : 'pointer-events-none'}`}>
          <div
            ref={envelopeRef}
            className="relative w-full h-full"
            style={{ transformStyle: isOpen ? 'flat' : 'preserve-3d' }}
          >
            
            {/* ENTIRE ENVELOPE ASSEMBLY: Back + Flap + Front + Seal (All attached together so the flap NEVER separates) */}
            <div className="envelope-outer-box absolute inset-0 pointer-events-none">
              {/* 1. Envelope Back Cover */}
              <div className="absolute inset-0 bg-[#EAD8B7] rounded-2xl shadow-[0_20px_50px_rgba(61,43,31,0.15)] border border-[#C9A84C]/25 z-0" />

              {/* 4. Top Flap (Hinged at the top of the envelope back) */}
              <div 
                className="envelope-flap absolute inset-x-0 top-0 h-[52%] bg-[#D5C19F] origin-top z-30 border-t border-[#C9A84C]/20 rounded-t-2xl shadow-[0_5px_15px_rgba(61,43,31,0.08)] pointer-events-none"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformStyle: 'preserve-3d',
                }} 
              />

              {/* 3. Envelope Front Cover Pocket */}
              <div className="absolute inset-0 z-20 pointer-events-none">
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

              {/* 5. Glowing Wax Seal */}
              <div className="envelope-seal absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-40 transform-style-3d transition-transform duration-300 pointer-events-none">
                <div className="relative w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#C9A84C] rounded-full blur-md opacity-45 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#C9A84C] via-[#E8D5A3] to-[#A8873A] border-2 border-white shadow-[0_4px_10px_rgba(61,43,31,0.2)] flex items-center justify-center p-2">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Invitation Card (Slides out from envelope pocket and takes center stage) */}
            <div 
              className={`envelope-card absolute inset-x-2 sm:inset-x-3 top-2.5 sm:top-3 bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 flex flex-col justify-between border-2 border-[#C9A84C]/45 shadow-[0_15px_40px_rgba(61,43,31,0.2)] z-10 opacity-0 pointer-events-none ${
                isOpen ? 'cursor-pointer' : ''
              }`}
              style={{
                minHeight: '255px',
              }}
              onClick={isOpen ? (e) => {
                e.stopPropagation();
                handleEnterSite();
              } : undefined}
            >
              <div className="text-center my-auto flex flex-col items-center justify-center">
                {/* Minimalist Wedding Ring Icon */}
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#C9A84C] mb-1 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="9" cy="12" r="6" />
                  <circle cx="15" cy="12" r="6" />
                </svg>
                
                <h2 className="font-script text-3xl sm:text-4xl text-[#3D2B1F] leading-tight my-0.5 drop-shadow-[0_0_1px_rgba(201,168,76,0.1)]">
                  Ariel & Aracely
                </h2>

                <div className="w-14 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto my-1.5" />

                <p className="text-[#5A4333] font-sans text-[11px] sm:text-xs tracking-wider max-w-[270px] mx-auto leading-relaxed font-semibold">
                  Te invitamos a celebrar con nosotros el inicio de nuestro para siempre.
                </p>

                <p className="text-[#C9A84C] font-sans font-black text-[11px] sm:text-xs tracking-[0.2em] mt-1.5 uppercase">
                  SÁBADO 07 · NOV · 2026
                </p>
              </div>

              {/* Enter Site Button */}
              <div className="mt-3 w-full">
                <button
                  type="button"
                  disabled={isEntering}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnterSite();
                  }}
                  className="card-enter-btn py-3 px-4 w-full bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#C9A84C] text-[#3D2B1F] rounded-xl font-sans font-black tracking-[0.15em] text-xs sm:text-sm shadow-[0_4px_16px_rgba(201,168,76,0.35)] hover:shadow-[0_6px_22px_rgba(201,168,76,0.55)] transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase flex items-center justify-center gap-2 relative z-[9999] pointer-events-auto cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  {isEntering ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-[#3D2B1F]" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      <span>Ingresando...</span>
                    </>
                  ) : (
                    <>
                      <span>Entrar a la Boda</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative elements */}
        {!isOpen && (
          <div className="mt-8 sm:mt-10 text-center text-[10px] tracking-[0.35em] text-[#C9A84C]/60 uppercase font-bold">
            Ariel ✦ Aracely · 2026
          </div>
        )}
      </div>
    </div>
  );
};

export default PantallaCarga;
