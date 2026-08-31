import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-4 md:px-12 py-3 md:py-4 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-md border-b border-[#C9A84C]/25' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <span className="font-sans font-black tracking-widest text-lg md:text-xl text-[#3D2B1F] hover:text-[#C9A84C] transition-colors duration-300">
            A <span className="text-[#C9A84C] drop-shadow-[0_0_8px_var(--gold)]">✦</span> A
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-sans font-extrabold tracking-widest">
          <a href="#historia" className="text-xs text-[#3D2B1F]/80 hover:text-[#C9A84C] transition-colors duration-300">
            HISTORIA
          </a>
          <a href="#galeria" className="text-xs text-[#3D2B1F]/80 hover:text-[#C9A84C] transition-colors duration-300">
            GALERÍA
          </a>
          <a href="#evento" className="text-xs text-[#3D2B1F]/80 hover:text-[#C9A84C] transition-colors duration-300">
            EVENTO
          </a>
          <a href="#confirmar" className="px-6 py-2.5 rounded-lg text-xs font-black bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-white shadow-[0_4px_15px_rgba(201,168,76,0.2)] hover:shadow-[0_4px_25px_rgba(201,168,76,0.35)] hover:scale-[1.03] transition-all duration-300 uppercase">
            CONFIRMAR
          </a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Menu"
        >
          <svg className="w-6 h-6 text-[#3D2B1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-[#FFF8F0]/98 backdrop-blur-lg flex items-center justify-center md:hidden gta-grid-bg">
          <div className="text-center space-y-8 font-sans font-black tracking-[0.2em] uppercase">
            <a href="#historia" className="block text-[#3D2B1F] text-xl hover:text-[#C9A84C] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Historia
            </a>
            <a href="#galeria" className="block text-[#3D2B1F] text-xl hover:text-[#C9A84C] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Galería
            </a>
            <a href="#evento" className="block text-[#3D2B1F] text-xl hover:text-[#C9A84C] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Evento
            </a>
            <a href="#confirmar" className="block px-10 py-3.5 bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-white rounded-lg text-lg hover:shadow-[0_4px_25px_rgba(201,168,76,0.3)] transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Confirmar
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
