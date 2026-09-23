import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MinimalIcon from '../components/MinimalIcon';

const activities = [
  { time: '10:00 - 10:30', title: 'Llegada de invitados', description: 'Recepcion en el lugar de la ceremonia.', icon: 'guests' },
  { time: '10:30 - 12:00', title: 'Ceremonia', description: 'Desarrollo de la ceremonia y votos.', icon: 'rings' },
  { time: '12:00 - 15:00', title: 'Almuerzo & Sesion de fotos', description: 'Tiempo libre de los novios para almorzar y fotos de pareja.', icon: 'camera' },
  { time: '15:00 - 15:30', title: 'Recepcion de invitados', description: 'Apertura del salon, acomodo en mesas y bocaditos con refrescos.', icon: 'glass' },
  { time: '16:55 - 17:25', title: 'Baile de Honor & Brindis', description: 'Baile de novios, baile con los papas y brindis de bendicion.', icon: 'music' },
  { time: '17:25 - 17:55', title: 'Tercer bloque: Avance', description: 'Fotos por mesas e interaccion con los invitados.', icon: 'camera' },
  { time: '17:55 - 18:55', title: 'Cena', description: 'Servicio del banquete.', icon: 'dinner' },
  { time: '18:55 - 19:40', title: 'Tradiciones & Torta', description: 'Corte de pastel, lanzamiento del ramo y flor de azahar, y reparto de la torta.', icon: 'cake' },
  { time: '19:40 - 20:55', title: 'Tiempo de Gozo & Celebracion', description: 'Musica cristiana alegre, jubilo, baile y fraternidad.', icon: 'music' },
  { time: '20:55 - 21:00', title: 'Cierre y despedida', description: 'Oracion.', icon: 'heart' },
];

const EventSection = () => {
  const containerRef = useRef(null);
  const weddingDate = new Date('2026-11-07T10:00:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.from('.event-heading', {
      opacity: 0,
      y: 34,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.event-heading', start: 'top 88%', once: true },
    });

    gsap.from('.event-overview', {
      opacity: 0,
      y: 42,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.event-overview', start: 'top 88%', once: true },
    });

    gsap.from('.schedule-heading', {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.schedule-heading', start: 'top 88%', once: true },
    });

    gsap.fromTo('.schedule-progress',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.schedule-timeline',
          start: 'top 72%',
          end: 'bottom 72%',
          scrub: 0.6,
        },
      },
    );

    gsap.utils.toArray('.schedule-entry').forEach((entry, index) => {
      const desktopOffset = window.innerWidth >= 768 ? (index % 2 === 0 ? -28 : 28) : 0;
      gsap.fromTo(entry,
        { opacity: 0.25, x: desktopOffset, y: 26 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 94%',
            end: 'top 72%',
            scrub: 0.55,
          },
        },
      );
    });
  }, { scope: containerRef });

  const counters = [
    ['days', 'Dias'],
    ['hours', 'Horas'],
    ['minutes', 'Minutos'],
    ['seconds', 'Segundos'],
  ];

  return (
    <section id="evento" ref={containerRef} className="event-section section-container py-20 md:py-28 border-b border-[#C9A84C]/25">
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <header className="event-heading text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-3 text-[#A8873A] text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase">
            <MinimalIcon name="calendar" className="w-4 h-4" />
            Sabado 7 de noviembre
            <MinimalIcon name="calendar" className="w-4 h-4" />
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] mt-4">El dia esperado</h2>
          <p className="text-[#6C584B]/75 text-sm md:text-base mt-4 leading-relaxed">
            Cada momento fue pensado para compartirlo contigo sin prisas.
          </p>
        </header>

        <div className="event-overview mt-14 md:mt-20">
          <div className="event-calendar">
            <div className="flex items-end justify-between gap-4 pb-4 border-b border-[#C9A84C]/25">
              <div>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#A8873A] font-black">Calendario</span>
                <h3 className="font-serif text-2xl text-[#3D2B1F] mt-1">Noviembre 2026</h3>
              </div>
              <span className="font-script text-4xl text-[#C9A84C]">07</span>
            </div>
            <div className="calendar-week mt-5">
              {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
            </div>
            <div className="calendar-days">
              {Array.from({ length: 30 }, (_, index) => index + 1).map((day) => (
                <span key={day} className={day === 7 ? 'is-wedding-day' : ''}>{day}</span>
              ))}
            </div>
          </div>

          <div className="event-countdown">
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#A8873A] font-black">Falta muy poco</span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#3D2B1F] mt-2">La cuenta regresiva</h3>
            <div className="countdown-row mt-8">
              {counters.map(([key, label]) => (
                <div key={key}>
                  <strong>{String(timeLeft[key] ?? 0).padStart(2, '0')}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="text-[#6C584B]/65 text-sm italic mt-8 max-w-md">
              Dos corazones a punto de comenzar un mismo camino.
            </p>
          </div>
        </div>

        <div className="schedule-heading text-center mt-24 md:mt-32 mb-14">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#A8873A] font-black">Cronograma</span>
          <h3 className="font-script text-5xl md:text-6xl text-[#3D2B1F] mt-3">Momentos del dia</h3>
        </div>

        <div className="schedule-timeline">
          <div className="schedule-line" aria-hidden="true">
            <span className="schedule-progress" />
          </div>

          {activities.map((activity) => (
            <article key={activity.time} className="schedule-entry">
              <div className="schedule-card">
                <time>{activity.time}</time>
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </div>
              <div className="schedule-marker" aria-hidden="true">
                <MinimalIcon name={activity.icon} className="w-5 h-5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventSection;
