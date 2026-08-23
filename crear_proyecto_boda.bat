@echo off
title 💍 Boda Ariel & Aracely - Configuración del Proyecto
color 0E

echo =========================================================
echo  💍 CREANDO PROYECTO BODA - ARIEL Y ARACELY
echo =========================================================
echo.
echo Este script creara todo el proyecto desde cero
echo con todas las correcciones incluidas.
echo.

pause

echo.
echo 📁 Creando estructura de carpetas...
mkdir src 2>nul
mkdir src\sections 2>nul
mkdir src\components 2>nul
mkdir src\hooks 2>nul
mkdir src\utils 2>nul
mkdir src\styles 2>nul
mkdir public 2>nul
mkdir public\fonts 2>nul
mkdir public\images 2>nul
mkdir public\images\icons 2>nul
mkdir public\videos 2>nul

echo ✅ Carpetas creadas
echo.

echo 📄 Creando archivos de configuración...

echo { > package.json
echo   "name": "boda-ariel-aracely", >> package.json
echo   "private": true, >> package.json
echo   "version": "1.0.0", >> package.json
echo   "type": "module", >> package.json
echo   "scripts": { >> package.json
echo     "dev": "vite", >> package.json
echo     "build": "vite build", >> package.json
echo     "preview": "vite preview" >> package.json
echo   }, >> package.json
echo   "dependencies": { >> package.json
echo     "react": "^18.3.1", >> package.json
echo     "react-dom": "^18.3.1", >> package.json
echo     "gsap": "^3.12.5", >> package.json
echo     "@gsap/react": "^2.0.0" >> package.json
echo   }, >> package.json
echo   "devDependencies": { >> package.json
echo     "@vitejs/plugin-react": "^4.3.1", >> package.json
echo     "vite": "^5.4.8", >> package.json
echo     "tailwindcss": "^3.4.10", >> package.json
echo     "postcss": "^8.4.47", >> package.json
echo     "autoprefixer": "^10.4.20" >> package.json
echo   } >> package.json
echo } >> package.json

echo import { defineConfig } from 'vite'; > vite.config.js
echo import react from '@vitejs/plugin-react'; >> vite.config.js
echo. >> vite.config.js
echo export default defineConfig({ >> vite.config.js
echo   plugins: [react()], >> vite.config.js
echo   server: { >> vite.config.js
echo     port: 5173, >> vite.config.js
echo     open: true, >> vite.config.js
echo     host: true >> vite.config.js
echo   } >> vite.config.js
echo }); >> vite.config.js

echo /** @type {import('tailwindcss').Config} */ > tailwind.config.js
echo export default { >> tailwind.config.js
echo   content: [ >> tailwind.config.js
echo     './index.html', >> tailwind.config.js
echo     './src/**/*.{js,jsx,ts,tsx}', >> tailwind.config.js
echo   ], >> tailwind.config.js
echo   theme: { >> tailwind.config.js
echo     extend: { >> tailwind.config.js
echo       fontFamily: { >> tailwind.config.js
echo         'script': ['"Great Vibes"', 'cursive'], >> tailwind.config.js
echo         'sans': ['"Inter"', 'sans-serif'], >> tailwind.config.js
echo       }, >> tailwind.config.js
echo       colors: { >> tailwind.config.js
echo         'boda-oro': '#D4AF37', >> tailwind.config.js
echo         'boda-rosa': '#FFB6C1', >> tailwind.config.js
echo         'boda-marfil': '#FFFFF0', >> tailwind.config.js
echo         'boda-vino': '#722F37', >> tailwind.config.js
echo         'boda-champagne': '#F7E7CE' >> tailwind.config.js
echo       } >> tailwind.config.js
echo     } >> tailwind.config.js
echo   }, >> tailwind.config.js
echo   plugins: [], >> tailwind.config.js
echo } >> tailwind.config.js

echo export default { > postcss.config.js
echo   plugins: { >> postcss.config.js
echo     tailwindcss: {}, >> postcss.config.js
echo     autoprefixer: {}, >> postcss.config.js
echo   } >> postcss.config.js
echo } >> postcss.config.js

echo node_modules/ > .gitignore
echo .pnpm-store/ >> .gitignore
echo dist/ >> .gitignore
echo build/ >> .gitignore
echo *.local >> .gitignore
echo npm-debug.log* >> .gitignore
echo yarn-debug.log* >> .gitignore
echo .vscode/ >> .gitignore
echo .idea/ >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore

echo ^<!DOCTYPE html^> > index.html
echo ^<html lang="es"^> >> index.html
echo   ^<head^> >> index.html
echo     ^<meta charset="UTF-8" /^> >> index.html
echo     ^<link rel="icon" type="image/svg+xml" href="/images/corazon.svg" /^> >> index.html
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^> >> index.html
echo     ^<link rel="preconnect" href="https://fonts.googleapis.com"^> >> index.html
echo     ^<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin^> >> index.html
echo     ^<link href="https://fonts.googleapis.com/css2?family=Great+Vibes^&family=Inter:wght@300;400;600;700^&display=swap" rel="stylesheet"^> >> index.html
echo     ^<title^>💍 Ariel ^& Aracely - Nuestra Boda^</title^> >> index.html
echo   ^</head^> >> index.html
echo   ^<body^> >> index.html
echo     ^<div id="root"^>^</div^> >> index.html
echo     ^<script type="module" src="/src/main.jsx"^>^</script^> >> index.html
echo   ^</body^> >> index.html
echo ^</html^> >> index.html

echo ✅ Archivos de configuracion creados
echo.

echo 📝 Creando archivos fuente...

echo import { StrictMode } from 'react'; > src\main.jsx
echo import { createRoot } from 'react-dom/client'; >> src\main.jsx
echo import './styles/index.css'; >> src\main.jsx
echo import App from './App.jsx'; >> src\main.jsx
echo. >> src\main.jsx
echo createRoot(document.getElementById('root')).render( >> src\main.jsx
echo   ^<StrictMode^> >> src\main.jsx
echo     ^<App /^> >> src\main.jsx
echo   ^</StrictMode^> >> src\main.jsx
echo ); >> src\main.jsx

echo import { useEffect } from 'react'; > src\App.jsx
echo import gsap from 'gsap'; >> src\App.jsx
echo import { ScrollTrigger } from 'gsap/ScrollTrigger'; >> src\App.jsx
echo import Navbar from './components/Navbar'; >> src\App.jsx
echo import Hero from './sections/Hero'; >> src\App.jsx
echo import VideoSection from './sections/VideoSection'; >> src\App.jsx
echo import StorySection from './sections/StorySection'; >> src\App.jsx
echo import GallerySection from './sections/GallerySection'; >> src\App.jsx
echo import FinalSection from './sections/FinalSection'; >> src\App.jsx
echo import OutroSection from './sections/OutroSection'; >> src\App.jsx
echo. >> src\App.jsx
echo gsap.registerPlugin(ScrollTrigger); >> src\App.jsx
echo. >> src\App.jsx
echo const App = () =^> { >> src\App.jsx
echo   useEffect(() =^> { >> src\App.jsx
echo     return () =^> { >> src\App.jsx
echo       ScrollTrigger.getAll().forEach(trigger =^> trigger.kill()); >> src\App.jsx
echo     }; >> src\App.jsx
echo   }, []); >> src\App.jsx
echo. >> src\App.jsx
echo   return ( >> src\App.jsx
echo     ^<main className="relative overflow-x-hidden bg-white"^> >> src\App.jsx
echo       ^<Navbar /^> >> src\App.jsx
echo       ^<Hero /^> >> src\App.jsx
echo       ^<VideoSection /^> >> src\App.jsx
echo       ^<StorySection /^> >> src\App.jsx
echo       ^<GallerySection /^> >> src\App.jsx
echo       ^<FinalSection /^> >> src\App.jsx
echo       ^<OutroSection /^> >> src\App.jsx
echo     ^</main^> >> src\App.jsx
echo   ); >> src\App.jsx
echo }; >> src\App.jsx
echo. >> src\App.jsx
echo export default App; >> src\App.jsx

echo @tailwind base; > src\styles\index.css
echo @tailwind components; >> src\styles\index.css
echo @tailwind utilities; >> src\styles\index.css
echo. >> src\styles\index.css
echo * { >> src\styles\index.css
echo   margin: 0; >> src\styles\index.css
echo   padding: 0; >> src\styles\index.css
echo   box-sizing: border-box; >> src\styles\index.css
echo } >> src\styles\index.css
echo. >> src\styles\index.css
echo body { >> src\styles\index.css
echo   width: 100dvw; >> src\styles\index.css
echo   overflow-x: hidden; >> src\styles\index.css
echo   background-color: #ffffff; >> src\styles\index.css
echo   color: #1a1a1a; >> src\styles\index.css
echo   font-family: 'Inter', sans-serif; >> src\styles\index.css
echo } >> src\styles\index.css
echo. >> src\styles\index.css
echo @layer utilities { >> src\styles\index.css
echo   .flex-center { >> src\styles\index.css
echo     @apply flex justify-center items-center; >> src\styles\index.css
echo   } >> src\styles\index.css
echo   .gradient-text { >> src\styles\index.css
echo     background: linear-gradient(135deg, #D4AF37, #FFB6C1, #D4AF37); >> src\styles\index.css
echo     -webkit-background-clip: text; >> src\styles\index.css
echo     -webkit-text-fill-color: transparent; >> src\styles\index.css
echo     background-clip: text; >> src\styles\index.css
echo   } >> src\styles\index.css
echo } >> src\styles\index.css
echo. >> src\styles\index.css
echo @layer components { >> src\styles\index.css
echo   .section-container { >> src\styles\index.css
echo     @apply w-full min-h-screen relative overflow-hidden; >> src\styles\index.css
echo   } >> src\styles\index.css
echo } >> src\styles\index.css

echo import { useState, useEffect } from 'react'; > src\components\Navbar.jsx
echo. >> src\components\Navbar.jsx
echo const Navbar = () =^> { >> src\components\Navbar.jsx
echo   const [isScrolled, setIsScrolled] = useState(false); >> src\components\Navbar.jsx
echo. >> src\components\Navbar.jsx
echo   useEffect(() =^> { >> src\components\Navbar.jsx
echo     const handleScroll = () =^> { >> src\components\Navbar.jsx
echo       setIsScrolled(window.scrollY > 50); >> src\components\Navbar.jsx
echo     }; >> src\components\Navbar.jsx
echo     window.addEventListener('scroll', handleScroll); >> src\components\Navbar.jsx
echo     return () =^> window.removeEventListener('scroll', handleScroll); >> src\components\Navbar.jsx
echo   }, []); >> src\components\Navbar.jsx
echo. >> src\components\Navbar.jsx
echo   return ( >> src\components\Navbar.jsx
echo     ^<nav className={\`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-5 md:px-16 py-4 md:py-6 transition-all duration-500 \${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}\`}^> >> src\components\Navbar.jsx
echo       ^<div className="flex items-center gap-2"^> >> src\components\Navbar.jsx
echo         ^<span className="font-script text-2xl md:text-3xl text-boda-vino"^>A ^& A^</span^> >> src\components\Navbar.jsx
echo       ^</div^> >> src\components\Navbar.jsx
echo       ^<div className="flex items-center gap-6"^> >> src\components\Navbar.jsx
echo         ^<a href="#historia" className="text-boda-vino/70 hover:text-boda-vino transition-colors text-sm md:text-base hidden md:block font-sans"^>Historia^</a^> >> src\components\Navbar.jsx
echo         ^<a href="#galeria" className="text-boda-vino/70 hover:text-boda-vino transition-colors text-sm md:text-base hidden md:block font-sans"^>Galería^</a^> >> src\components\Navbar.jsx
echo         ^<a href="#evento" className="text-boda-vino/70 hover:text-boda-vino transition-colors text-sm md:text-base hidden md:block font-sans"^>Evento^</a^> >> src\components\Navbar.jsx
echo         ^<a href="#confirmar" className="px-4 py-2 bg-boda-oro text-white rounded-full text-sm hover:bg-boda-oro/80 transition-colors hidden md:block"^> >> src\components\Navbar.jsx
echo           💍 Confirmar >> src\components\Navbar.jsx
echo         ^</a^> >> src\components\Navbar.jsx
echo       ^</div^> >> src\components\Navbar.jsx
echo     ^</nav^> >> src\components\Navbar.jsx
echo   ); >> src\components\Navbar.jsx
echo }; >> src\components\Navbar.jsx
echo. >> src\components\Navbar.jsx
echo export default Navbar; >> src\components\Navbar.jsx

echo import { useRef } from 'react'; > src\sections\Hero.jsx
echo import gsap from 'gsap'; >> src\sections\Hero.jsx
echo import { useGSAP } from '@gsap/react'; >> src\sections\Hero.jsx
echo. >> src\sections\Hero.jsx
echo const Hero = () =^> { >> src\sections\Hero.jsx
echo   const containerRef = useRef(null); >> src\sections\Hero.jsx
echo. >> src\sections\Hero.jsx
echo   useGSAP(() =^> { >> src\sections\Hero.jsx
echo     gsap.set('.hero-title', { opacity: 0, y: 100, scale: 0.8 }); >> src\sections\Hero.jsx
echo     gsap.set('.hero-subtitle', { opacity: 0, y: 50 }); >> src\sections\Hero.jsx
echo     gsap.set('.hero-date', { opacity: 0, y: 30 }); >> src\sections\Hero.jsx
echo. >> src\sections\Hero.jsx
echo     const tl = gsap.timeline({ >> src\sections\Hero.jsx
echo       scrollTrigger: { >> src\sections\Hero.jsx
echo         trigger: '.hero-section', >> src\sections\Hero.jsx
echo         start: 'top top', >> src\sections\Hero.jsx
echo         end: '+=80%%', >> src\sections\Hero.jsx
echo         scrub: 1.5, >> src\sections\Hero.jsx
echo         pin: true >> src\sections\Hero.jsx
echo       } >> src\sections\Hero.jsx
echo     }); >> src\sections\Hero.jsx
echo. >> src\sections\Hero.jsx
echo     tl.to('.hero-title', { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power2.out' }) >> src\sections\Hero.jsx
echo       .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }, '-=1') >> src\sections\Hero.jsx
echo       .to('.hero-date', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5'); >> src\sections\Hero.jsx
echo   }, []); >> src\sections\Hero.jsx
echo. >> src\sections\Hero.jsx
echo   return ( >> src\sections\Hero.jsx
echo     ^<section ref={containerRef} className="hero-section section-container flex items-center justify-center hero-gradient"^> >> src\sections\Hero.jsx
echo       ^<div className="absolute inset-0 opacity-5"^> >> src\sections\Hero.jsx
echo         ^<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--boda-oro)_0%,_transparent_70%)]" /^> >> src\sections\Hero.jsx
echo       ^</div^> >> src\sections\Hero.jsx
echo       ^<div className="relative z-10 text-center px-4"^> >> src\sections\Hero.jsx
echo         ^<h1 className="hero-title font-script text-5xl md:text-7xl lg:text-8xl text-boda-vino mb-4"^> >> src\sections\Hero.jsx
echo           Ariel ^& Aracely >> src\sections\Hero.jsx
echo         ^</h1^> >> src\sections\Hero.jsx
echo         ^<p className="hero-subtitle text-xl md:text-3xl text-boda-oro/80 font-light mb-4"^> >> src\sections\Hero.jsx
echo           Nos casamos >> src\sections\Hero.jsx
echo         ^</p^> >> src\sections\Hero.jsx
echo         ^<p className="hero-date text-lg md:text-2xl text-gray-600"^> >> src\sections\Hero.jsx
echo           26 de Julio, 2026 >> src\sections\Hero.jsx
echo         ^</p^> >> src\sections\Hero.jsx
echo       ^</div^> >> src\sections\Hero.jsx
echo     ^</section^> >> src\sections\Hero.jsx
echo   ); >> src\sections\Hero.jsx
echo }; >> src\sections\Hero.jsx
echo. >> src\sections\Hero.jsx
echo export default Hero; >> src\sections\Hero.jsx

echo import { useRef } from 'react'; > src\sections\VideoSection.jsx
echo import gsap from 'gsap'; >> src\sections\VideoSection.jsx
echo import { useGSAP } from '@gsap/react'; >> src\sections\VideoSection.jsx
echo. >> src\sections\VideoSection.jsx
echo const VideoSection = () =^> { >> src\sections\VideoSection.jsx
echo   const containerRef = useRef(null); >> src\sections\VideoSection.jsx
echo. >> src\sections\VideoSection.jsx
echo   useGSAP(() =^> { >> src\sections\VideoSection.jsx
echo     gsap.set('.video-content', { opacity: 0, scale: 0.9 }); >> src\sections\VideoSection.jsx
echo. >> src\sections\VideoSection.jsx
echo     gsap.to('.video-content', { >> src\sections\VideoSection.jsx
echo       opacity: 1, >> src\sections\VideoSection.jsx
echo       scale: 1, >> src\sections\VideoSection.jsx
echo       duration: 1.5, >> src\sections\VideoSection.jsx
echo       ease: 'power2.out', >> src\sections\VideoSection.jsx
echo       scrollTrigger: { >> src\sections\VideoSection.jsx
echo         trigger: containerRef.current, >> src\sections\VideoSection.jsx
echo         start: 'top 70%%', >> src\sections\VideoSection.jsx
echo         toggleActions: 'play none none reverse' >> src\sections\VideoSection.jsx
echo       } >> src\sections\VideoSection.jsx
echo     }); >> src\sections\VideoSection.jsx
echo   }, []); >> src\sections\VideoSection.jsx
echo. >> src\sections\VideoSection.jsx
echo   return ( >> src\sections\VideoSection.jsx
echo     ^<section ref={containerRef} className="section-container flex items-center justify-center bg-boda-romantico"^> >> src\sections\VideoSection.jsx
echo       ^<div className="video-content max-w-4xl mx-auto px-4"^> >> src\sections\VideoSection.jsx
echo         ^<div className="relative aspect-video bg-black/5 rounded-2xl overflow-hidden"^> >> src\sections\VideoSection.jsx
echo           ^<div className="absolute inset-0 flex items-center justify-center"^> >> src\sections\VideoSection.jsx
echo             ^<span className="text-6xl text-boda-oro/30">❤️</span^> >> src\sections\VideoSection.jsx
echo           ^</div^> >> src\sections\VideoSection.jsx
echo           ^<p className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400"^> >> src\sections\VideoSection.jsx
echo             Video de la boda (próximamente) >> src\sections\VideoSection.jsx
echo           ^</p^> >> src\sections\VideoSection.jsx
echo         ^</div^> >> src\sections\VideoSection.jsx
echo       ^</div^> >> src\sections\VideoSection.jsx
echo     ^</section^> >> src\sections\VideoSection.jsx
echo   ); >> src\sections\VideoSection.jsx
echo }; >> src\sections\VideoSection.jsx
echo. >> src\sections\VideoSection.jsx
echo export default VideoSection; >> src\sections\VideoSection.jsx

echo import { useRef } from 'react'; > src\sections\StorySection.jsx
echo import gsap from 'gsap'; >> src\sections\StorySection.jsx
echo import { useGSAP } from '@gsap/react'; >> src\sections\StorySection.jsx
echo. >> src\sections\StorySection.jsx
echo const StorySection = () =^> { >> src\sections\StorySection.jsx
echo   const containerRef = useRef(null); >> src\sections\StorySection.jsx
echo. >> src\sections\StorySection.jsx
echo   useGSAP(() =^> { >> src\sections\StorySection.jsx
echo     gsap.set('.story-card', { opacity: 0, y: 50 }); >> src\sections\StorySection.jsx
echo. >> src\sections\StorySection.jsx
echo     gsap.to('.story-card', { >> src\sections\StorySection.jsx
echo       opacity: 1, >> src\sections\StorySection.jsx
echo       y: 0, >> src\sections\StorySection.jsx
echo       duration: 1, >> src\sections\StorySection.jsx
echo       stagger: 0.3, >> src\sections\StorySection.jsx
echo       ease: 'power2.out', >> src\sections\StorySection.jsx
echo       scrollTrigger: { >> src\sections\StorySection.jsx
echo         trigger: containerRef.current, >> src\sections\StorySection.jsx
echo         start: 'top 70%%', >> src\sections\StorySection.jsx
echo         toggleActions: 'play none none reverse' >> src\sections\StorySection.jsx
echo       } >> src\sections\StorySection.jsx
echo     }); >> src\sections\StorySection.jsx
echo   }, []); >> src\sections\StorySection.jsx
echo. >> src\sections\StorySection.jsx
echo   return ( >> src\sections\StorySection.jsx
echo     ^<section id="historia" ref={containerRef} className="section-container flex items-center justify-center bg-white py-20"^> >> src\sections\StorySection.jsx
echo       ^<div className="max-w-4xl mx-auto px-4 text-center"^> >> src\sections\StorySection.jsx
echo         ^<h2 className="font-script text-4xl md:text-5xl text-boda-vino mb-12"^>Nuestra Historia^</h2^> >> src\sections\StorySection.jsx
echo         ^<div className="space-y-8"^> >> src\sections\StorySection.jsx
echo           ^<div className="story-card p-6 bg-boda-romantico rounded-2xl"^> >> src\sections\StorySection.jsx
echo             ^<p className="text-lg text-gray-700"^> >> src\sections\StorySection.jsx
echo               Nos conocimos en un lugar especial, y desde entonces nuestra historia de amor sigue creciendo... >> src\sections\StorySection.jsx
echo             ^</p^> >> src\sections\StorySection.jsx
echo           ^</div^> >> src\sections\StorySection.jsx
echo           ^<div className="story-card p-6 bg-boda-romantico rounded-2xl"^> >> src\sections\StorySection.jsx
echo             ^<p className="text-lg text-gray-700"^> >> src\sections\StorySection.jsx
echo               El 26 de Julio de 2026, uniremos nuestras vidas en matrimonio. >> src\sections\StorySection.jsx
echo             ^</p^> >> src\sections\StorySection.jsx
echo           ^</div^> >> src\sections\StorySection.jsx
echo         ^</div^> >> src\sections\StorySection.jsx
echo       ^</div^> >> src\sections\StorySection.jsx
echo     ^</section^> >> src\sections\StorySection.jsx
echo   ); >> src\sections\StorySection.jsx
echo }; >> src\sections\StorySection.jsx
echo. >> src\sections\StorySection.jsx
echo export default StorySection; >> src\sections\StorySection.jsx

echo import { useRef } from 'react'; > src\sections\GallerySection.jsx
echo import gsap from 'gsap'; >> src\sections\GallerySection.jsx
echo import { useGSAP } from '@gsap/react'; >> src\sections\GallerySection.jsx
echo. >> src\sections\GallerySection.jsx
echo const GallerySection = () =^> { >> src\sections\GallerySection.jsx
echo   const containerRef = useRef(null); >> src\sections\GallerySection.jsx
echo. >> src\sections\GallerySection.jsx
echo   useGSAP(() =^> { >> src\sections\GallerySection.jsx
echo     gsap.set('.gallery-item', { opacity: 0, scale: 0.8 }); >> src\sections\GallerySection.jsx
echo. >> src\sections\GallerySection.jsx
echo     gsap.to('.gallery-item', { >> src\sections\GallerySection.jsx
echo       opacity: 1, >> src\sections\GallerySection.jsx
echo       scale: 1, >> src\sections\GallerySection.jsx
echo       duration: 1, >> src\sections\GallerySection.jsx
echo       stagger: 0.15, >> src\sections\GallerySection.jsx
echo       ease: 'power2.out', >> src\sections\GallerySection.jsx
echo       scrollTrigger: { >> src\sections\GallerySection.jsx
echo         trigger: containerRef.current, >> src\sections\GallerySection.jsx
echo         start: 'top 70%%', >> src\sections\GallerySection.jsx
echo         toggleActions: 'play none none reverse' >> src\sections\GallerySection.jsx
echo       } >> src\sections\GallerySection.jsx
echo     }); >> src\sections\GallerySection.jsx
echo   }, []); >> src\sections\GallerySection.jsx
echo. >> src\sections\GallerySection.jsx
echo   return ( >> src\sections\GallerySection.jsx
echo     ^<section id="galeria" ref={containerRef} className="section-container flex items-center justify-center bg-boda-romantico py-20"^> >> src\sections\GallerySection.jsx
echo       ^<div className="max-w-6xl mx-auto px-4"^> >> src\sections\GallerySection.jsx
echo         ^<h2 className="font-script text-4xl md:text-5xl text-boda-vino text-center mb-12"^>Galería^</h2^> >> src\sections\GallerySection.jsx
echo         ^<div className="grid grid-cols-2 md:grid-cols-4 gap-4"^> >> src\sections\GallerySection.jsx
echo           {[1,2,3,4,5,6,7,8].map((item) =^> ( >> src\sections\GallerySection.jsx
echo             ^<div key={item} className="gallery-item relative overflow-hidden rounded-xl aspect-square bg-white/50"^> >> src\sections\GallerySection.jsx
echo               ^<div className="absolute inset-0 flex items-center justify-center text-4xl text-boda-oro/30"^> >> src\sections\GallerySection.jsx
echo                 📸 >> src\sections\GallerySection.jsx
echo               ^</div^> >> src\sections\GallerySection.jsx
echo             ^</div^> >> src\sections\GallerySection.jsx
echo           ))} >> src\sections\GallerySection.jsx
echo         ^</div^> >> src\sections\GallerySection.jsx
echo       ^</div^> >> src\sections\GallerySection.jsx
echo     ^</section^> >> src\sections\GallerySection.jsx
echo   ); >> src\sections\GallerySection.jsx
echo }; >> src\sections\GallerySection.jsx
echo. >> src\sections\GallerySection.jsx
echo export default GallerySection; >> src\sections\GallerySection.jsx

echo import { useRef } from 'react'; > src\sections\FinalSection.jsx
echo import gsap from 'gsap'; >> src\sections\FinalSection.jsx
echo import { useGSAP } from '@gsap/react'; >> src\sections\FinalSection.jsx
echo. >> src\sections\FinalSection.jsx
echo const FinalSection = () =^> { >> src\sections\FinalSection.jsx
echo   const containerRef = useRef(null); >> src\sections\FinalSection.jsx
echo. >> src\sections\FinalSection.jsx
echo   useGSAP(() =^> { >> src\sections\FinalSection.jsx
echo     gsap.set('.final-content', { opacity: 0, y: 50 }); >> src\sections\FinalSection.jsx
echo. >> src\sections\FinalSection.jsx
echo     gsap.to('.final-content', { >> src\sections\FinalSection.jsx
echo       opacity: 1, >> src\sections\FinalSection.jsx
echo       y: 0, >> src\sections\FinalSection.jsx
echo       duration: 1.5, >> src\sections\FinalSection.jsx
echo       ease: 'power2.out', >> src\sections\FinalSection.jsx
echo       scrollTrigger: { >> src\sections\FinalSection.jsx
echo         trigger: containerRef.current, >> src\sections\FinalSection.jsx
echo         start: 'top 70%%', >> src\sections\FinalSection.jsx
echo         toggleActions: 'play none none reverse' >> src\sections\FinalSection.jsx
echo       } >> src\sections\FinalSection.jsx
echo     }); >> src\sections\FinalSection.jsx
echo   }, []); >> src\sections\FinalSection.jsx
echo. >> src\sections\FinalSection.jsx
echo   return ( >> src\sections\FinalSection.jsx
echo     ^<section id="evento" ref={containerRef} className="section-container flex items-center justify-center bg-white py-20"^> >> src\sections\FinalSection.jsx
echo       ^<div className="final-content max-w-2xl mx-auto px-4 text-center"^> >> src\sections\FinalSection.jsx
echo         ^<h2 className="font-script text-4xl md:text-5xl text-boda-vino mb-6"^>El Gran Día^</h2^> >> src\sections\FinalSection.jsx
echo         ^<div className="bg-boda-romantico rounded-2xl p-8 space-y-4"^> >> src\sections\FinalSection.jsx
echo           ^<p className="text-xl text-gray-700"^> >> src\sections\FinalSection.jsx
echo             📍 Lugar de la Ceremonia >> src\sections\FinalSection.jsx
echo           ^</p^> >> src\sections\FinalSection.jsx
echo           ^<p className="text-lg text-gray-600"^> >> src\sections\FinalSection.jsx
echo             26 de Julio, 2026 - 6:00 PM >> src\sections\FinalSection.jsx
echo           ^</p^> >> src\sections\FinalSection.jsx
echo         ^</div^> >> src\sections\FinalSection.jsx
echo       ^</div^> >> src\sections\FinalSection.jsx
echo     ^</section^> >> src\sections\FinalSection.jsx
echo   ); >> src\sections\FinalSection.jsx
echo }; >> src\sections\FinalSection.jsx
echo. >> src\sections\FinalSection.jsx
echo export default FinalSection; >> src\sections\FinalSection.jsx

echo import { useRef } from 'react'; > src\sections\OutroSection.jsx
echo import gsap from 'gsap'; >> src\sections\OutroSection.jsx
echo import { useGSAP } from '@gsap/react'; >> src\sections\OutroSection.jsx
echo. >> src\sections\OutroSection.jsx
echo const OutroSection = () =^> { >> src\sections\OutroSection.jsx
echo   const containerRef = useRef(null); >> src\sections\OutroSection.jsx
echo. >> src\sections\OutroSection.jsx
echo   useGSAP(() =^> { >> src\sections\OutroSection.jsx
echo     gsap.set('.outro-content', { opacity: 0, y: 100 }); >> src\sections\OutroSection.jsx
echo. >> src\sections\OutroSection.jsx
echo     gsap.to('.outro-content', { >> src\sections\OutroSection.jsx
echo       opacity: 1, >> src\sections\OutroSection.jsx
echo       y: 0, >> src\sections\OutroSection.jsx
echo       duration: 2, >> src\sections\OutroSection.jsx
echo       ease: 'power2.out', >> src\sections\OutroSection.jsx
echo       scrollTrigger: { >> src\sections\OutroSection.jsx
echo         trigger: containerRef.current, >> src\sections\OutroSection.jsx
echo         start: 'top 40%%', >> src\sections\OutroSection.jsx
echo         end: 'top 10%%', >> src\sections\OutroSection.jsx
echo         scrub: 1.5 >> src\sections\OutroSection.jsx
echo       } >> src\sections\OutroSection.jsx
echo     }); >> src\sections\OutroSection.jsx
echo   }, []); >> src\sections\OutroSection.jsx
echo. >> src\sections\OutroSection.jsx
echo   return ( >> src\sections\OutroSection.jsx
echo     ^<section id="confirmar" ref={containerRef} className="section-container flex items-center justify-center hero-gradient py-20"^> >> src\sections\OutroSection.jsx
echo       ^<div className="outro-content text-center max-w-2xl mx-auto px-4"^> >> src\sections\OutroSection.jsx
echo         ^<h2 className="font-script text-5xl md:text-6xl text-boda-vino mb-6"^> >> src\sections\OutroSection.jsx
echo           💕 >> src\sections\OutroSection.jsx
echo         ^</h2^> >> src\sections\OutroSection.jsx
echo         ^<p className="text-2xl md:text-3xl text-gray-700 mb-4"^> >> src\sections\OutroSection.jsx
echo           ¡Nos vemos el 26 de Julio! >> src\sections\OutroSection.jsx
echo         ^</p^> >> src\sections\OutroSection.jsx
echo         ^<p className="text-lg text-gray-500"^> >> src\sections\OutroSection.jsx
echo           "El amor es la fuerza más hermosa del universo" >> src\sections\OutroSection.jsx
echo         ^</p^> >> src\sections\OutroSection.jsx
echo         ^<div className="mt-8 flex justify-center gap-4"^> >> src\sections\OutroSection.jsx
echo           ^<span className="px-6 py-3 bg-boda-oro/10 rounded-full text-boda-oro"^> >> src\sections\OutroSection.jsx
echo             💍 Ariel y Aracely >> src\sections\OutroSection.jsx
echo           ^</span^> >> src\sections\OutroSection.jsx
echo         ^</div^> >> src\sections\OutroSection.jsx
echo       ^</div^> >> src\sections\OutroSection.jsx
echo     ^</section^> >> src\sections\OutroSection.jsx
echo   ); >> src\sections\OutroSection.jsx
echo }; >> src\sections\OutroSection.jsx
echo. >> src\sections\OutroSection.jsx
echo export default OutroSection; >> src\sections\OutroSection.jsx

echo.
echo =========================================================
echo  ✅ ¡PROYECTO CREADO EXITOSAMENTE!
echo =========================================================
echo.
echo 📂 Ubicación: %CD%
echo.
echo 📦 Ahora ejecuta estos comandos:
echo    1. npm install
echo    2. npm run dev
echo.
echo 💍 Sitio web para: Ariel y Aracely
echo 📅 Fecha: 26 de Julio, 2026
echo.
echo 🚀 ¡Listo para ejecutar!
echo.

pause