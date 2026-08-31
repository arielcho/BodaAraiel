import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from '../components/AnimatedText';
import MinimalIcon from '../components/MinimalIcon';
import { setupScrollVideo } from '../utils/scrollVideo';

const FinalSection = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const sweepRef = useRef(null);

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const cleanupScrollVideo = setupScrollVideo({
      video,
      trigger: containerRef.current,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      '.final-content',
      { scale: 1.06, filter: 'blur(2px)' },
      { scale: 0.96, filter: 'blur(0px)', ease: 'none', duration: 4 }
    );

    tl.fromTo(
      video,
      { yPercent: -12, scale: 1.25 },
      { yPercent: 12, ease: 'none', duration: 4 },
      0
    );

    tl.fromTo(
      sweepRef.current,
      { yPercent: -120 },
      { yPercent: 240, ease: 'none', duration: 4 },
      0
    );

    tl.fromTo(
      '.final-title',
      { y: 40, opacity: 0.8 },
      { y: -40, opacity: 1, ease: 'none', duration: 4 },
      0
    );

    return cleanupScrollVideo;
  }, []);

  return (
    <section ref={containerRef} className="section-container overflow-hidden h-[75vh] min-h-[500px] border-b border-[#C9A84C]/25 bg-[#FFF8F0] flex items-center justify-center">
      <div className="final-content w-full h-full relative">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/BodaAraiel/videos/4.mp4"
          className="absolute inset-0 w-full h-[125%] object-cover"
        />

        <div
          ref={sweepRef}
          className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent pointer-events-none mix-blend-screen blur-[3px] z-10"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F0] via-[#FFF8F0]/35 to-[#F7E7CE]/20 backdrop-blur-[0.5px]" />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="final-title text-center px-4">
            <span className="inline-flex items-center justify-center gap-3 text-[#C9A84C] text-xs sm:text-sm tracking-[0.3em] uppercase font-sans font-black">
              <MinimalIcon name="heart" className="w-4 h-4" />
              <AnimatedText text="El Gran Final" type="words" />
              <MinimalIcon name="heart" className="w-4 h-4" />
            </span>
            <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] mt-3 drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
              <AnimatedText text="Para Siempre" />
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans font-semibold tracking-wider">
              Y asi comienza nuestra historia para siempre
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-lg border border-[#C9A84C]/35">
              <MinimalIcon name="clock" className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[#3D2B1F] text-[9px] tracking-widest font-sans font-extrabold uppercase">TRANSICION ACTIVA EN SCROLL</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-25">
          <div className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] transition-all duration-300" style={{ width: '100%' }} />
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
