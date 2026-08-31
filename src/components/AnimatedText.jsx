import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AnimatedText = ({ text, className = '', type = 'chars' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const targets = containerRef.current.querySelectorAll('.anim-element');
    if (!targets.length) return;

    // Handwriting/typing pen reveal effect (sequential left-to-right fade & ink bleed reveal)
    gsap.to(targets, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      stagger: type === 'chars' ? 0.04 : 0.08,
      duration: 0.5,
      ease: 'power1.out',
    });
  }, { scope: containerRef });

  if (type === 'words') {
    const words = text.split(' ');
    return (
      <span ref={containerRef} className={`inline-block ${className}`}>
        {words.map((word, idx) => (
          <span
            key={idx}
            className="anim-element inline-block mr-2 opacity-0 filter blur-[4px] scale-95"
          >
            {word}
          </span>
        ))}
      </span>
    );
  }

  // Cursive Pen Writing/Typewriter character reveal
  const words = text.split(' ');
  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="anim-element inline-block opacity-0 filter blur-[3px] scale-90"
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
