import { useEffect, useState } from 'react';
import MinimalIcon from '../components/MinimalIcon';

const EventSection = () => {
  const weddingDate = new Date('2026-11-07T16:30:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [activeItem, setActiveItem] = useState(0);

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const itineraryData = [
    {
      time: '16:30',
      title: 'Ceremonia Civil',
      description: 'El momento mas importante. Nuestra union civil y el intercambio de votos matrimoniales frente a la naturaleza en el jardin principal.',
      icon: 'rings',
      dressCode: 'Formal / De Etiqueta',
      location: 'Jardin de Eventos',
    },
    {
      time: '18:00',
      title: 'Sesion de Fotos & Bienvenida',
      description: 'Mientras capturamos nuestros primeros recuerdos como esposos, los invitados disfrutaran de canapes gourmet y bebidas de bienvenida en la terraza.',
      icon: 'camera',
      dressCode: 'Libre',
      location: 'Terraza Principal',
    },
    {
      time: '19:30',
      title: 'Recepcion & Coctel',
      description: 'Apertura oficial del salon principal con musica instrumental en vivo. Inicio de la barra de tragos de autor.',
      icon: 'glass',
      dressCode: 'Libre',
      location: 'Salon de Fiestas',
    },
    {
      time: '21:00',
      title: 'Banquete & Brindis',
      description: 'Una cena especial de tres tiempos disenada para la ocasion, seguida de las palabras de honor de nuestros padres y el brindis principal.',
      icon: 'dinner',
      dressCode: 'Libre',
      location: 'Salon de Fiestas',
    },
    {
      time: '22:30',
      title: 'Apertura de Pista & Fiesta',
      description: 'El inicio del festejo. Nuestro primer baile como esposos, seguido de DJ en vivo, barra libre toda la noche y sorpresas doradas.',
      icon: 'music',
      dressCode: 'Listos para bailar',
      location: 'Pista Central',
    },
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const counters = [
    ['days', 'Dias'],
    ['hours', 'Hrs'],
    ['minutes', 'Min'],
    ['seconds', 'Seg'],
  ];

  return (
    <section id="evento" className="section-container bg-[#FFF8F0] py-20 relative overflow-hidden gta-grid-bg border-b border-[#C9A84C]/25">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <div className="absolute -right-32 top-1/4 w-[350px] h-[350px] bg-[#E8D5A3]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-32 bottom-1/4 w-[350px] h-[350px] bg-[#F7E7CE]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute bottom-0 inset-x-0 h-40 opacity-15 pointer-events-none select-none overflow-hidden">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <path d="M0,200 L1440,200 L1440,50 C1400,80 1350,110 1300,105 C1200,95 1180,60 1100,70 C1000,83 950,120 850,115 C750,110 700,60 600,80 C500,100 450,130 350,120 C250,110 200,60 100,75 C50,83 20,95 0,110 Z" fill="#E8D5A3" />
          <path d="M0,200 L1440,200 L1440,80 C1380,100 1320,130 1250,120 C1150,105 1100,70 1000,90 C900,110 820,130 720,120 C620,110 580,70 480,95 C380,120 300,140 200,120 C100,100 50,80 0,95 Z" fill="#F7E7CE" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-sans font-extrabold tracking-[0.35em] text-xs sm:text-sm uppercase mb-3 inline-flex items-center justify-center gap-3">
            <MinimalIcon name="calendar" className="w-4 h-4" />
            DIA & ITINERARIO
            <MinimalIcon name="calendar" className="w-4 h-4" />
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
            El Momento <span className="gradient-text">Esperado</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="gta-panel p-6 rounded-2xl w-full max-w-md border border-[#C9A84C]/30 shadow-xl relative group overflow-hidden bg-white/80">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#E8D5A3]/10 rounded-full blur-xl group-hover:bg-[#E8D5A3]/25 transition-all duration-500" />

              <div className="text-center mb-4">
                <h3 className="font-sans font-black tracking-widest text-[#C9A84C] text-lg uppercase">NOVIEMBRE 2026</h3>
                <div className="w-12 h-0.5 bg-[#C9A84C]/30 mx-auto mt-1" />
              </div>

              <div className="grid grid-cols-7 text-center font-sans font-bold text-gray-500 text-xs py-2 border-b border-gray-200/50">
                <div>DOM</div>
                <div>LUN</div>
                <div>MAR</div>
                <div>MIE</div>
                <div>JUE</div>
                <div>VIE</div>
                <div>SAB</div>
              </div>

              <div className="grid grid-cols-7 text-center font-sans text-sm gap-y-2 mt-3 font-semibold text-[#3D2B1F]">
                {days.map((day) => (
                  <div key={day} className="relative flex items-center justify-center py-2">
                    {day === 7 ? (
                      <div className="relative z-10 w-9 h-9 flex items-center justify-center cursor-pointer group/day">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#E8D5A3] rounded-full animate-ping opacity-55" />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#E8D5A3] rounded-full shadow-[0_0_15px_rgba(201,168,76,0.7)] border border-white flex items-center justify-center font-black text-white">7</div>
                        <span className="absolute -top-6 bg-[#C9A84C] text-white text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded shadow-lg opacity-100 animate-bounce">DIA</span>
                      </div>
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100/50 transition-colors cursor-default text-[#3D2B1F]">{day}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="gta-panel p-5 rounded-2xl w-full max-w-md border border-[#C9A84C]/25 shadow-lg mt-6 relative overflow-hidden flex flex-col justify-center items-center bg-white/80">
              <span className="text-[#C9A84C] font-sans font-black tracking-[0.2em] text-[10px] uppercase mb-4 inline-flex items-center gap-2">
                <MinimalIcon name="clock" className="w-3.5 h-3.5" />
                LA CUENTA REGRESIVA
              </span>

              <div className="grid grid-cols-4 gap-3 text-center">
                {counters.map(([key, label]) => (
                  <div key={key} className="bg-white/60 border border-[#C9A84C]/25 px-3 py-2 rounded-xl min-w-[70px] shadow-sm">
                    <span className={`block text-2xl font-sans font-black tracking-tight ${key === 'seconds' ? 'text-[#C9A84C]' : 'text-[#3D2B1F]'}`}>{timeLeft[key] ?? 0}</span>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gray-200/50 my-4" />
              <p className="text-[#3D2B1F]/60 font-sans text-xs tracking-wider text-center italic">"Dos corazones a punto de unirse en un solo camino"</p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col">
            <div className="relative pl-6 sm:pl-10 border-l border-gradient-timeline py-2 space-y-6">
              <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C9A84C] via-[#E8D5A3] to-[#A8873A]" />

              {itineraryData.map((item, index) => {
                const isActive = activeItem === index;

                return (
                  <div key={item.time} className="relative transition-all duration-300">
                    <button
                      type="button"
                      aria-label={`Abrir ${item.title}`}
                      onClick={() => setActiveItem(isActive ? null : index)}
                      className={`absolute left-[-32px] sm:left-[-50px] top-1.5 w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-500 z-10 ${
                        isActive
                          ? 'bg-[#C9A84C] border-white shadow-[0_0_15px_rgba(201,168,76,0.6)] scale-110'
                          : 'bg-[#FFF8F0] border-[#C9A84C]/50 hover:border-[#C9A84C]'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#C9A84C]'}`} />
                    </button>

                    <div
                      onClick={() => setActiveItem(isActive ? null : index)}
                      className={`gta-panel p-5 rounded-2xl cursor-pointer select-none transition-all duration-500 bg-white/85 ${
                        isActive
                          ? 'border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.12)] bg-white/95'
                          : 'hover:border-[#C9A84C]/55 hover:bg-white/60'
                      }`}
                    >
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="font-sans font-black text-sm sm:text-base text-[#C9A84C] tracking-widest bg-white px-3 py-1 rounded-lg border border-[#C9A84C]/25 shadow-sm">{item.time}</span>
                          <h4 className="font-sans font-black text-sm sm:text-lg text-[#3D2B1F] tracking-wide transition-colors group-hover:text-[#C9A84C]">{item.title}</h4>
                        </div>
                        <MinimalIcon name={item.icon} className="w-6 h-6 text-[#C9A84C] flex-shrink-0" />
                      </div>

                      <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                        <div className="overflow-hidden">
                          <div className="border-t border-gray-100 pt-4 text-gray-600 text-xs sm:text-sm leading-relaxed space-y-3">
                            <p>{item.description}</p>

                            <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs font-sans tracking-wide uppercase font-semibold mt-2">
                              <span className="inline-flex items-center gap-1.5 bg-[#E8D5A3]/25 text-[#A8873A] px-2.5 py-1 rounded border border-[#C9A84C]/25">
                                <MinimalIcon name="location" className="w-3.5 h-3.5" />
                                {item.location}
                              </span>
                              <span className="inline-flex items-center gap-1.5 bg-[#F7E7CE]/40 text-[#C9A84C] px-2.5 py-1 rounded border border-[#C9A84C]/25">
                                <MinimalIcon name="dress" className="w-3.5 h-3.5" />
                                {item.dressCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSection;
