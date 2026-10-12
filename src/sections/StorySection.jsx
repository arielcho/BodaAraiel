import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MinimalIcon from '../components/MinimalIcon';
import ScrollVideoBackdrop from '../components/ScrollVideoBackdrop';

const parents = [
  {
    label: 'Padres de Ariel',
    names: ['Jaime Andrés Rodríguez Sillerico', 'María del Carmen Castro Gutiérrez'],
  },
  {
    label: 'Padres de Aracely',
    names: ['Rolando Ordóñez Carranza', 'Mariela Luza Santalla'],
  },
];

const companions = [
  {
    label: 'Consejeros matrimoniales',
    names: ['Raúl Gabriel López Barrios', 'Ana María Bethzabe Ramos de López'],
    icon: 'rings',
  },
  {
    label: 'Padrinos de torta',
    names: ['Fernando Luza Santalla', 'María Luisa Acarapi de Luza'],
    icon: 'cake',
  },
];

const StorySection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.family-intro', {
      opacity: 0,
      y: 42,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.family-intro', start: 'top 86%', once: true },
    });

    gsap.utils.toArray('.family-card').forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 34,
        x: index % 2 === 0 ? -18 : 18,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });
    });

    gsap.from('.companions-intro', {
      opacity: 0,
      y: 36,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.companions-intro', start: 'top 88%', once: true },
    });
  }, { scope: containerRef });

  return (
    <section id="familias" ref={containerRef} className="family-section section-container py-20 md:py-28 border-b border-[#C9A84C]/25">
      <ScrollVideoBackdrop
        source="videos/Couple_dancing_in_silhouette_20261012062626.mp4"
        triggerRef={containerRef}
        label="Silueta de una pareja bailando"
      />
      <div className="absolute inset-0 gta-grid-bg pointer-events-none opacity-25" />
      <div className="relative z-10 max-w-6xl mx-auto px-5">
        <header className="family-intro text-center max-w-4xl mx-auto">
          <span className="section-kicker">Con la bendición de Dios</span>
          <h2>Guiados por la gracia de Dios<br />y acompañados por nuestros padres</h2>
          <p>
            Quienes nos otorgaron raíces, amor y ejemplo para este nuevo comienzo,
            unimos nuestras vidas en matrimonio.
          </p>
          <span className="section-flourish" aria-hidden="true" />
        </header>

        <div className="family-grid mt-12 md:mt-16">
          {parents.map((group) => (
            <article key={group.label} className="family-card">
              <span>{group.label}</span>
              {group.names.map((name) => <h3 key={name}>{name}</h3>)}
            </article>
          ))}
        </div>

        <header className="companions-intro text-center max-w-3xl mx-auto mt-24 md:mt-32">
          <MinimalIcon name="heart" className="w-8 h-8 mx-auto text-[#C9A84C] mb-5" />
          <h2>Quienes acompañan nuestro sí</h2>
          <p>Personas esenciales que caminan a nuestro lado, brindándonos su ejemplo y valioso apoyo en este comienzo.</p>
          <span className="section-flourish" aria-hidden="true" />
        </header>

        <div className="family-grid mt-12 md:mt-16">
          {companions.map((group) => (
            <article key={group.label} className="family-card companion-card">
              <MinimalIcon name={group.icon} className="w-7 h-7 text-[#B8943E] mb-5" />
              <span>{group.label}</span>
              {group.names.map((name) => <h3 key={name}>{name}</h3>)}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
