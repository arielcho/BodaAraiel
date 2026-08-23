import { useRef } from 'react'; 
import gsap from 'gsap'; 
import { useGSAP } from '@gsap/react'; 
 
const OutroSection = () => { 
  const containerRef = useRef(null); 
 
  useGSAP(() => { 
    gsap.set('.outro-content', { opacity: 0, y: 100 }); 
 
    gsap.to('.outro-content', { 
      opacity: 1, 
      y: 0, 
      duration: 2, 
      ease: 'power2.out', 
      scrollTrigger: { 
        trigger: containerRef.current, 
        start: 'top 40%', 
        end: 'top 10%', 
        scrub: 1.5 
      } 
    }); 
  }, []); 
 
  return ( 
    <section id="confirmar" ref={containerRef} className="section-container flex items-center justify-center hero-gradient py-20"> 
      <div className="outro-content text-center max-w-2xl mx-auto px-4"> 
        <h2 className="font-script text-5xl md:text-6xl text-boda-vino mb-6"> 
          ðŸ’• 
        </h2> 
        <p className="text-2xl md:text-3xl text-gray-700 mb-4"> 
          Â¡Nos vemos el 07 de Noviembre! 
        </p> 
        <p className="text-lg text-gray-500"> 
          "El amor es la fuerza mÃ¡s hermosa del universo" 
        </p> 
        <div className="mt-8 flex justify-center gap-4"> 
          <span className="px-6 py-3 bg-boda-oro/10 rounded-full text-boda-oro"> 
            ðŸ’ Ariel y Aracely 
          </span> 
        </div> 
      </div> 
    </section> 
  ); 
}; 
 
export default OutroSection; 

