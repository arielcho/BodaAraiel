import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MinimalIcon from './MinimalIcon';

const links = [
  { href: '#historia', label: 'Historia' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#evento', label: 'Evento' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const drawer = createPortal(
    <div
      className={`mobile-drawer md:hidden ${isMenuOpen ? 'is-open' : ''}`}
      aria-hidden={!isMenuOpen}
    >
      <button
        type="button"
        className="mobile-drawer-backdrop"
        onClick={closeMenu}
        aria-label="Cerrar menu"
        tabIndex={isMenuOpen ? 0 : -1}
      />

      <aside className="mobile-drawer-panel" aria-label="Menu principal">
        <div className="mobile-drawer-header">
          <span className="inline-flex items-center gap-2 font-script text-3xl text-[#3D2B1F]">
            Ariel <MinimalIcon name="sparkle" className="w-5 h-5 text-[#C9A84C]" /> Aracely
          </span>
          <button type="button" className="mobile-drawer-close" onClick={closeMenu} aria-label="Cerrar menu" tabIndex={isMenuOpen ? 0 : -1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="mobile-drawer-links" role="navigation" aria-label="Navegacion movil">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
              <span>0{index + 1}</span>
              {link.label}
              <MinimalIcon name="arrow" className="w-4 h-4" />
            </a>
          ))}
          <a className="mobile-drawer-confirm" href="#confirmar" onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
            Confirmar asistencia
            <MinimalIcon name="heart" className="w-4 h-4" />
          </a>
        </div>

        <p className="mobile-drawer-date">07 &middot; Noviembre &middot; 2026</p>
      </aside>
    </div>,
    document.body,
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[150] flex justify-between items-center px-4 md:px-12 py-3 md:py-4 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-md border-b border-[#C9A84C]/25'
          : 'bg-transparent'
      }`}>
        <a href="#" className="flex items-center gap-2" aria-label="Volver al inicio">
          <span className="font-sans font-black tracking-widest text-lg md:text-xl text-[#3D2B1F] transition-colors duration-300">
            A
          </span>
          <MinimalIcon name="sparkle" className="w-5 h-5 text-[#C9A84C]" />
          <span className="font-sans font-black tracking-widest text-lg md:text-xl text-[#3D2B1F]">A</span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-sans font-extrabold tracking-widest">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-xs text-[#3D2B1F]/80 hover:text-[#C9A84C] transition-colors duration-300 uppercase">
              {link.label}
            </a>
          ))}
          <a href="#confirmar" className="px-6 py-2.5 rounded-lg text-xs font-black bg-gradient-to-r from-[#C9A84C] to-[#E8D5A3] text-white shadow-[0_4px_15px_rgba(201,168,76,0.2)] hover:shadow-[0_4px_25px_rgba(201,168,76,0.35)] hover:scale-[1.03] transition-all duration-300 uppercase">
            Confirmar
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="md:hidden w-10 h-10 grid place-items-center rounded-full border border-[#C9A84C]/25 bg-white/45 text-[#3D2B1F]"
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 7h14M5 12h14M5 17h14" />
            )}
          </svg>
        </button>
      </nav>
      {drawer}
    </>
  );
};

export default Navbar;
