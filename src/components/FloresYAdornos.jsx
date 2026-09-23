import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BotanicalArt = ({ variant }) => {
  const common = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  if (variant === 0) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M25 318C48 242 73 166 151 18" stroke="#9B7A2F" strokeWidth="1.8" />
        <path d="M48 247c-28-17-39-40-34-67 28 4 45 24 45 56M72 187c26-19 51-22 72-8-15 26-38 34-65 24M101 124c-18-24-20-47-6-66 24 14 31 35 21 59M126 73c19-13 37-14 52-2-12 20-29 26-50 15" stroke="#71805A" strokeWidth="1.6" />
      </g>
    </svg>
  );

  if (variant === 1) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M92 326c-3-82 2-161 3-245" stroke="#71805A" strokeWidth="1.8" />
        <path d="M94 222c-32-18-49-40-48-66 31 0 50 19 54 54M94 165c28-19 51-22 70-9-12 25-34 35-64 24" stroke="#71805A" strokeWidth="1.5" />
        <path d="M95 86c-22-9-31-25-25-44 20 3 31 16 30 38M97 84c22-10 32-26 27-45-21 3-32 17-32 39M95 82c-8-22-3-39 13-51 14 15 15 32 2 50M93 83c-6-22-19-34-39-35 0 21 12 34 34 40" stroke="#C9A84C" strokeWidth="1.7" />
        <circle cx="95" cy="83" r="7" stroke="#9B7A2F" strokeWidth="1.5" />
      </g>
    </svg>
  );

  if (variant === 2) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M31 317c22-95 48-180 119-292" stroke="#9B7A2F" strokeWidth="1.7" />
        {[[48,257,25],[62,220,23],[79,183,22],[96,146,20],[113,111,18],[130,77,16]].map(([x,y,r], index) => (
          <g key={x}>
            <circle cx={x - 13} cy={y - 4} r={r} stroke="#71805A" strokeWidth="1.35" />
            <circle cx={x + 18} cy={y - 20} r={r - 2} stroke="#8B966F" strokeWidth="1.35" />
            <path d={`M${x} ${y}l-13 -4M${x} ${y}l18 -20`} stroke="#71805A" strokeWidth="1.2" />
          </g>
        ))}
      </g>
    </svg>
  );

  if (variant === 3) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M88 325c5-94 8-186 20-292" stroke="#71805A" strokeWidth="1.8" />
        {[65,100,136,172,208,244].map((y, index) => (
          <g key={y} stroke="#71805A" strokeWidth="1.35">
            <path d={`M${101-index*2} ${y}c-30-20-50-18-65-1 20 18 41 20 63 9`} />
            <path d={`M${103-index*2} ${y+14}c27-20 49-21 65-5-16 20-38 24-66 15`} />
          </g>
        ))}
      </g>
    </svg>
  );

  if (variant === 4) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M24 314C61 242 96 167 157 34" stroke="#9B7A2F" strokeWidth="1.8" />
        {[[51,255],[70,216],[91,174],[111,132],[132,91]].map(([x,y]) => (
          <g key={x} stroke="#71805A" strokeWidth="1.45">
            <path d={`M${x} ${y}c-23-15-39-15-51-2 14 18 31 20 50 10`} />
            <path d={`M${x+5} ${y-9}c22-17 39-19 52-7-11 19-28 24-50 17`} />
          </g>
        ))}
        <circle cx="77" cy="204" r="5" stroke="#C9A84C" strokeWidth="1.4" />
        <circle cx="118" cy="119" r="4" stroke="#C9A84C" strokeWidth="1.4" />
      </g>
    </svg>
  );

  if (variant === 5) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M87 325c0-91-8-171-28-252M88 325c17-91 34-166 69-244M87 325c-17-73-35-130-69-181" stroke="#71805A" strokeWidth="1.5" />
        {[[57,71],[157,79],[18,142]].map(([x,y], index) => (
          <g key={x} stroke="#C9A84C" strokeWidth="1.5">
            <circle cx={x} cy={y} r="5" />
            <path d={`M${x} ${y-5}c-7-15-3-25 10-31 8 12 5 23-6 32M${x+4} ${y}c16-6 26-1 29 12-14 6-24 1-30-8M${x-4} ${y+2}c-15 7-25 3-30-10 13-8 24-4 31 8`} />
          </g>
        ))}
      </g>
    </svg>
  );

  if (variant === 6) return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M34 317c17-72 50-137 109-204" stroke="#71805A" strokeWidth="1.7" />
        <path d="M61 260c-24-2-39-14-44-34 22-5 39 5 49 29M83 218c24-4 42 3 52 22-18 13-37 10-55-10M105 173c-21-6-33-20-34-40 22-1 37 11 42 33M128 135c19-8 35-5 47 9-12 17-28 20-47 10" stroke="#8B966F" strokeWidth="1.45" />
        <path d="M142 113c-8-18-5-33 8-45 15 12 18 27 8 44" stroke="#C9A84C" strokeWidth="1.5" />
      </g>
    </svg>
  );

  return (
    <svg viewBox="0 0 180 330" aria-hidden="true">
      <g {...common}>
        <path d="M91 326c-8-83-1-162 32-249" stroke="#9B7A2F" strokeWidth="1.7" />
        <path d="M96 261c-33-7-53-24-58-51 30-7 52 7 66 40M105 204c26-13 49-12 68 3-16 24-38 29-65 14M115 150c-22-15-31-34-25-56 25 5 40 21 41 47" stroke="#71805A" strokeWidth="1.5" />
        <path d="M125 91c-12-16-11-31 1-44 17 10 21 25 12 42M136 82c17-9 31-7 42 5-9 17-23 21-41 12" stroke="#C9A84C" strokeWidth="1.45" />
      </g>
    </svg>
  );
};

const accents = [
  { top: '7%', side: 'left', variant: 0 },
  { top: '18%', side: 'right', variant: 1 },
  { top: '30%', side: 'left', variant: 2 },
  { top: '42%', side: 'right', variant: 3 },
  { top: '55%', side: 'left', variant: 4 },
  { top: '67%', side: 'right', variant: 5 },
  { top: '79%', side: 'left', variant: 6 },
  { top: '91%', side: 'right', variant: 7 },
];

const FloresYAdornos = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.utils.toArray('.botanical-accent').forEach((accent) => {
      const entersFromLeft = accent.classList.contains('from-left');
      gsap.fromTo(accent,
        {
          opacity: 0,
          x: reducedMotion ? 0 : (entersFromLeft ? -120 : 120),
          y: reducedMotion ? 0 : 32,
          scale: reducedMotion ? 1 : 0.82,
          rotation: reducedMotion ? 0 : (entersFromLeft ? -6 : 6),
        },
        {
          opacity: 0.58,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: reducedMotion ? 0.01 : 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: accent,
            start: 'top 90%',
            once: true,
          },
        },
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="botanical-layer" aria-hidden="true">
      {accents.map((accent) => (
        <div
          key={`${accent.side}-${accent.top}`}
          className={`botanical-accent from-${accent.side}`}
          style={{ top: accent.top }}
        >
          <BotanicalArt variant={accent.variant} />
        </div>
      ))}
    </div>
  );
};

export default FloresYAdornos;
