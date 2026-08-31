import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AnimatedText = ({ text, className = '', type = 'chars' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const targets = containerRef.current.querySelectorAll('.anim-element');
    if (!targets.length) return;

    gsap.to(targets, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      stagger: type === 'chars' ? 0.03 : 0.08,
      duration: 0.8,
      ease: 'back.out(1.3)',
    });
  }, { scope: containerRef });

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <span ref={containerRef} className={`inline-block ${className}`}>
        {words.map((word, idx) => (
          <span
            key={idx}
            className="anim-element inline-block mr-2 opacity-0 translate-y-6 scale-95"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  // Default: animate character-by-character
  const words = text.split(' ');
  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="anim-element inline-block opacity-0 translate-y-8 rotate-[15deg] origin-bottom-left"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
