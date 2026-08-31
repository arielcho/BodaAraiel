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
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#C9A84C]/20' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`font-script text-xl md:text-2xl transition-colors duration-500 ${
            isScrolled ? 'text-[#3D2B1F]' : 'text-[#3D2B1F]'
          }`}>
            A ✦ A
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#historia" className={`text-sm tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-[#3D2B1F] hover:text-[#C9A84C]' : 'text-[#3D2B1F]/80 hover:text-[#3D2B1F]'
          }`}>
            HISTORIA
          </a>
          <a href="#galeria" className={`text-sm tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-[#3D2B1F] hover:text-[#C9A84C]' : 'text-[#3D2B1F]/80 hover:text-[#3D2B1F]'
          }`}>
            GALERIA
          </a>
          <a href="#evento" className={`text-sm tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-[#3D2B1F] hover:text-[#C9A84C]' : 'text-[#3D2B1F]/80 hover:text-[#3D2B1F]'
          }`}>
            EVENTO
          </a>
          <a href="#confirmar" className={`px-5 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-500 ${
            isScrolled 
              ? 'bg-[#C9A84C] text-white hover:bg-[#C9A84C]/80 shadow-md' 
              : 'bg-[#C9A84C] text-white hover:bg-[#C9A84C]/80 border border-[#C9A84C]/30'
          }`}>
            CONFIRMAR
          </a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
        <div className="fixed inset-0 z-[99] bg-[#FFF8F0]/95 backdrop-blur-md flex items-center justify-center md:hidden">
          <div className="text-center space-y-8">
            <a href="#historia" className="block text-[#3D2B1F] text-2xl hover:text-[#C9A84C] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Historia
            </a>
            <a href="#galeria" className="block text-[#3D2B1F] text-2xl hover:text-[#C9A84C] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Galeria
            </a>
            <a href="#evento" className="block text-[#3D2B1F] text-2xl hover:text-[#C9A84C] transition-colors" onClick={() => setIsMenuOpen(false)}>
              Evento
            </a>
            <a href="#confirmar" className="block px-8 py-3 bg-[#C9A84C] text-white rounded-full text-xl hover:bg-[#C9A84C]/80 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Confirmar
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
