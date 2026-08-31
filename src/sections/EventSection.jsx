import { useState, useEffect } from 'react';

const EventSection = () => {
  // Calendar State
  const weddingDate = new Date('2026-11-07T16:30:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Itinerary Accordion State
  const [activeItem, setActiveItem] = useState(0);

  const itineraryData = [
    {
      time: '16:30',
      title: 'Ceremonia Civil',
      description: 'El momento más importante. Nuestra unión civil y el intercambio de votos matrimoniales frente a la naturaleza en el jardín principal.',
      icon: '💍',
      dressCode: 'Formal / De Etiqueta',
      location: 'Jardín de Eventos'
    },
    {
      time: '18:00',
      title: 'Sesión de Fotos & Bienvenida',
      description: 'Mientras capturamos nuestros primeros recuerdos como esposos, los invitados disfrutarán de canapés gourmet y bebidas de bienvenida en la terraza.',
      icon: '📸',
      dressCode: 'Libre',
      location: 'Terraza Principal'
    },
    {
      time: '19:30',
      title: 'Recepción & Cóctel',
      description: 'Apertura oficial del salón principal con música instrumental en vivo. Inicio de la barra de tragos de autor.',
      icon: '🥂',
      dressCode: 'Libre',
      location: 'Salón de Fiestas'
    },
    {
      time: '21:00',
      title: 'Banquete & Brindis',
      description: 'Una cena especial de tres tiempos especialmente diseñada para la ocasión, seguida de las palabras de honor de nuestros padres y el brindis principal.',
      icon: '🍽️',
      dressCode: 'Libre',
      location: 'Salón de Fiestas'
    },
    {
      time: '22:30',
      title: 'Apertura de Pista & Fiesta',
      description: '¡El inicio del festejo! Nuestro primer baile como esposos, seguido de DJ de primer nivel en vivo, barra libre toda la noche y sorpresas doradas.',
      icon: '🎵',
      dressCode: '¡Listos para bailar!',
      location: 'Pista Central'
    }
  ];

  // Calendar parameters for November 2026
  // 1st of November 2026 is Sunday.
  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <section id="evento" className="section-container bg-[#FFF8F0] py-20 relative overflow-hidden gta-grid-bg border-b border-[#C9A84C]/25">
      {/* GTA VI Visual Accents (Gold themed) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <div className="absolute -right-32 top-1/4 w-[350px] h-[350px] bg-[#E8D5A3]/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-32 bottom-1/4 w-[350px] h-[350px] bg-[#F7E7CE]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Silhouette of palm trees in the background (Gold themed) */}
      <div className="absolute bottom-0 inset-x-0 h-40 opacity-15 pointer-events-none select-none overflow-hidden">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <path d="M0,200 L1440,200 L1440,50 C1400,80 1350,110 1300,105 C1200,95 1180,60 1100,70 C1000,83 950,120 850,115 C750,110 700,60 600,80 C500,100 450,130 350,120 C250,110 200,60 100,75 C50,83 20,95 0,110 Z" fill="#E8D5A3" />
          <path d="M0,200 L1440,200 L1440,80 C1380,100 1320,130 1250,120 C1150,105 1100,70 1000,90 C900,110 820,130 720,120 C620,110 580,70 480,95 C380,120 300,140 200,120 C100,100 50,80 0,95 Z" fill="#F7E7CE" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[#C9A84C] font-sans font-extrabold tracking-[0.35em] text-xs sm:text-sm uppercase block mb-3">
            📅 DÍA & ITINERARIO 📅
          </span>
          <h2 className="font-script text-5xl md:text-7xl text-[#3D2B1F] drop-shadow-[0_2px_4px_rgba(61,43,31,0.05)]">
            El Momento <span className="gradient-text">Esperado</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* COLUMN 1: Calendar & Countdown */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Calendar Card */}
            <div className="gta-panel p-6 rounded-2xl w-full max-w-md border border-[#C9A84C]/30 shadow-xl relative group overflow-hidden bg-white/80">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#E8D5A3]/10 rounded-full blur-xl group-hover:bg-[#E8D5A3]/25 transition-all duration-500" />
              
              <div className="text-center mb-4">
                <h3 className="font-sans font-black tracking-widest text-[#C9A84C] text-lg uppercase">
                  NOVIEMBRE 2026
                </h3>
                <div className="w-12 h-0.5 bg-[#C9A84C]/30 mx-auto mt-1" />
              </div>

              {/* Grid Days of Week */}
              <div className="grid grid-cols-7 text-center font-sans font-bold text-gray-500 text-xs py-2 border-b border-gray-200/50">
                <div>DOM</div>
                <div>LUN</div>
                <div>MAR</div>
                <div>MIÉ</div>
                <div>JUE</div>
                <div>VIE</div>
                <div>SÁB</div>
              </div>

              {/* Grid Days of Month */}
              <div className="grid grid-cols-7 text-center font-sans text-sm gap-y-2 mt-3 font-semibold text-[#3D2B1F]">
                {days.map((day) => {
                  const isWeddingDay = day === 7;
                  return (
                    <div key={day} className="relative flex items-center justify-center py-2">
                      {isWeddingDay ? (
                        <div className="relative z-10 w-9 h-9 flex items-center justify-center cursor-pointer group/day">
                          {/* Pulsing ring aura */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#E8D5A3] rounded-full animate-ping opacity-55" />
                          {/* Inner Circle */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C] to-[#E8D5A3] rounded-full shadow-[0_0_15px_rgba(201,168,76,0.7)] border border-white flex items-center justify-center font-black text-white">
                            7
                          </div>
                          {/* Mini floating heart tooltip */}
                          <span className="absolute -top-6 bg-[#C9A84C] text-white text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded shadow-lg opacity-100 animate-bounce">
                            💖¡DÍA!
                          </span>
                        </div>
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100/50 transition-colors cursor-default text-[#3D2B1F]">
                          {day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Countdown Box */}
            <div className="gta-panel p-5 rounded-2xl w-full max-w-md border border-[#C9A84C]/25 shadow-lg mt-6 relative overflow-hidden flex flex-col justify-center items-center bg-white/80">
              <span className="text-[#C9A84C] font-sans font-black tracking-[0.2em] text-[10px] uppercase mb-4">
                ⏳ LA CUENTA REGRESIVA ⏳
              </span>
              
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-white/60 border border-[#C9A84C]/25 px-3 py-2 rounded-xl min-w-[70px] shadow-sm">
                  <span className="block text-2xl font-sans font-black text-[#3D2B1F] tracking-tight">{timeLeft.days ?? 0}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Días</span>
                </div>
                <div className="bg-white/60 border border-[#C9A84C]/25 px-3 py-2 rounded-xl min-w-[70px] shadow-sm">
                  <span className="block text-2xl font-sans font-black text-[#3D2B1F] tracking-tight">{timeLeft.hours ?? 0}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Hrs</span>
                </div>
                <div className="bg-white/60 border border-[#C9A84C]/25 px-3 py-2 rounded-xl min-w-[70px] shadow-sm">
                  <span className="block text-2xl font-sans font-black text-[#3D2B1F] tracking-tight">{timeLeft.minutes ?? 0}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Min</span>
                </div>
                <div className="bg-white/60 border border-[#C9A84C]/25 px-3 py-2 rounded-xl min-w-[70px] shadow-sm">
                  <span className="block text-2xl font-sans font-black text-[#C9A84C] tracking-tight">{timeLeft.seconds ?? 0}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Seg</span>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200/50 my-4" />
              
              <p className="text-[#3D2B1F]/60 font-sans text-xs tracking-wider text-center italic">
                "Dos corazones a punto de unirse en un solo camino"
              </p>
            </div>

          </div>

          {/* COLUMN 2: Interactive Timeline Itinerary */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Timeline wrapper */}
            <div className="relative pl-6 sm:pl-10 border-l border-gradient-timeline py-2 space-y-6">
              
              {/* Custom gold gradient line marker overlay */}
              <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C9A84C] via-[#E8D5A3] to-[#A8873A]" />

              {itineraryData.map((item, index) => {
                const isActive = activeItem === index;
                return (
                  <div key={index} className="relative transition-all duration-300">
                    
                    {/* Glowing circular timeline marker */}
                    <div 
                      onClick={() => setActiveItem(isActive ? null : index)}
                      className={`absolute left-[-32px] sm:left-[-50px] top-1.5 w-[20px] h-[20px] sm:w-[26px] sm:h-[26px] rounded-full border-2 cursor-pointer flex items-center justify-center transition-all duration-500 z-10 ${
                        isActive 
                          ? 'bg-[#C9A84C] border-white shadow-[0_0_15px_rgba(201,168,76,0.6)] scale-110' 
                          : 'bg-[#FFF8F0] border-[#C9A84C]/50 hover:border-[#C9A84C]'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#C9A84C]'}`} />
                    </div>

                    {/* Timeline Event Container */}
                    <div 
                      onClick={() => setActiveItem(isActive ? null : index)}
                      className={`gta-panel p-5 rounded-2xl cursor-pointer select-none transition-all duration-500 bg-white/85 ${
                        isActive 
                          ? 'border-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.12)] bg-white/95' 
                          : 'hover:border-[#C9A84C]/55 hover:bg-white/60'
                      }`}
                    >
                      {/* Header containing time, title, and icon */}
                      <div className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="font-sans font-black text-sm sm:text-base text-[#C9A84C] tracking-widest bg-white px-3 py-1 rounded-lg border border-[#C9A84C]/25 shadow-sm">
                            {item.time}
                          </span>
                          <h4 className="font-sans font-black text-sm sm:text-lg text-[#3D2B1F] tracking-wide transition-colors group-hover:text-[#C9A84C]">
                            {item.title}
                          </h4>
                        </div>
                        <div className="text-xl sm:text-2xl flex-shrink-0">
                          {item.icon}
                        </div>
                      </div>

                      {/* Expandable Panel */}
                      <div className={`grid transition-all duration-500 ease-in-out ${
                        isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                      }`}>
                        <div className="overflow-hidden">
                          <div className="border-t border-gray-100 pt-4 text-gray-600 text-xs sm:text-sm leading-relaxed space-y-3">
                            <p>{item.description}</p>
                            
                            <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs font-sans tracking-wide uppercase font-semibold mt-2">
                              <span className="bg-[#E8D5A3]/25 text-[#A8873A] px-2.5 py-1 rounded border border-[#C9A84C]/25">
                                📍 {item.location}
                              </span>
                              <span className="bg-[#F7E7CE]/40 text-[#C9A84C] px-2.5 py-1 rounded border border-[#C9A84C]/25">
                                👗 {item.dressCode}
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
