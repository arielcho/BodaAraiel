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
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-boda-oro/20' 
          : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`font-script text-xl md:text-2xl transition-colors duration-500 ${
            isScrolled ? 'text-boda-vino' : 'text-white'
          }`}>
            A âœ¦ A
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#historia" className={`text-sm tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-gray-600 hover:text-boda-oro' : 'text-white/80 hover:text-white'
          }`}>
            HISTORIA
          </a>
          <a href="#galeria" className={`text-sm tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-gray-600 hover:text-boda-oro' : 'text-white/80 hover:text-white'
          }`}>
            GALERÃA
          </a>
          <a href="#evento" className={`text-sm tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-gray-600 hover:text-boda-oro' : 'text-white/80 hover:text-white'
          }`}>
            EVENTO
          </a>
          <a href="#CONFIRMAR" className={`px-5 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-500 ${
            isScrolled 
              ? 'bg-boda-oro text-white hover:bg-boda-oro/80 shadow-md' 
              : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30'
          }`}>
            ðŸ’ CONFIRMAR
          </a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="MenÃº"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[99] bg-black/95 backdrop-blur-md flex items-center justify-center md:hidden">
          <div className="text-center space-y-8">
            <a href="#historia" className="block text-white text-2xl hover:text-boda-oro transition-colors" onClick={() => setIsMenuOpen(false)}>
              Historia
            </a>
            <a href="#galeria" className="block text-white text-2xl hover:text-boda-oro transition-colors" onClick={() => setIsMenuOpen(false)}>
              GalerÃ­a
            </a>
            <a href="#evento" className="block text-white text-2xl hover:text-boda-oro transition-colors" onClick={() => setIsMenuOpen(false)}>
              Evento
            </a>
            <a href="#CONFIRMAR" className="block px-8 py-3 bg-boda-oro text-white rounded-full text-xl hover:bg-boda-oro/80 transition-colors" onClick={() => setIsMenuOpen(false)}>
              ðŸ’ CONFIRMAR
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;



