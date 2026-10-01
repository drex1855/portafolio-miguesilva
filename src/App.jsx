import { useEffect, useState } from 'react';
import { downloadCv } from './generateCvPdf.js';

const navigation = [
  { label: 'Perfil', href: '#about' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Contacto', href: '#contact' },
];

const experienceResponsibilities = [
  'Desarrollé scripts en Python para automatizar procesos internos y optimizar flujos de facturación.',
  'Implementé mejoras de backend para procesos internos y soporte operativo.',
  'Diseñé y desarrollé interfaces para la intranet corporativa con JavaScript, CSS y React.',
  'Administré y optimicé bases de datos SQL y NoSQL para operaciones empresariales.',
  'Realicé QA, debugging y corrección de errores en entornos de producción.',
  'Colaboré con líderes de desarrollo en análisis de código y despliegue de soluciones.',
];

const skillGroups = [
  { title: 'Front-end', items: ['React', 'TypeScript', 'JavaScript','Vite', 'PHP'] },
  { title: 'Backend', items: ['Node.js', '.NET', 'C#', 'Java'] },
  { title: 'Bases de datos y nubes', items: ['AWS', 'Azure', 'Google Cloud', 'PostgreSQL', 'MongoDB', 'SQL', 'NoSQL'] },
  { title: 'IA & Tools', items: [ 'Claude', 'Gemini', 'OpenCode']}
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 24);
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', updateNavbar);
      observer.disconnect();
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} aria-label="Navegación principal">
        <div className="nav-content">
          <a href="#home" className="logo" aria-label="Miguel Silva, inicio">
            <img
              className="logo-photo"
              src="https://res.cloudinary.com/drmv5fjsh/image/upload/v1790547449/1790547305976_f6yc2n.jpg"
              alt="Foto de Miguel Ángel Silva Mejía"
            />
          </a>
          <button
            className={`mobile-menu-btn${isMenuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="nav-links"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <ul className={`nav-links${isMenuOpen ? ' is-open' : ''}`} id="nav-links">
            {navigation.map(({ label, href }) => (
              <li key={href}><a href={href} onClick={closeMenu}>{label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container">
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow"><span className="status-dot" /> Disponible para trabajar</p>
            <h1 className="hero-title">Miguel Ángel<br />Silva Mejía<span className="title-period">.</span></h1>
            <h2 className="hero-subtitle">Desarrollador Full Stack<br />&amp; Automatización</h2>
            <p className="hero-description">
              Creo soluciones eficientes desde el backend hasta interfaces dinámicas. Me apasiona encontrar formas de optimizar procesos.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Hablemos <span aria-hidden="true">↗</span></a>
              <a href="#experience" className="text-link">Conoce mi enfoque <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-index">PORTAFOLIO <span>2026</span></div>
            <div className="avatar-container">
              <img
                className="avatar-photo"
                src="https://res.cloudinary.com/drmv5fjsh/image/upload/v1790547449/1790547305976_f6yc2n.jpg"
                alt="Retrato de Miguel Ángel Silva Mejía"
              />
            </div>
            <div className="hero-coordinate">DESARROLLO<br />CON INTENCIÓN</div>
          </div>
          <a className="scroll-cue" href="#about"><span /> Desliza para explorar</a>
        </section>

        <section className="section about-section" id="about">
          <p className="section-kicker">01 / Perfil</p>
          <div className="about-copy">
            <h2 className="section-heading">De la idea a una solución que <span>funciona.</span></h2>
            <p>
              Desarrollo experiencias digitales conectando el frontend y el backend. Me interesa construir herramientas útiles, simplificar flujos de trabajo y cuidar cada detalle del producto.
            </p>
            <div className="location-badge"><span className="location-mark" aria-hidden="true">+</span> Enfoque en desarrollo y automatización</div>
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-heading-row">
            <div><p className="section-kicker">02 / Experiencia laboral</p><h2 className="section-heading">Trabajo que genera <span>impacto.</span></h2></div>
            <span className="section-count">2023 — 2025</span>
          </div>
          <article className="experience-entry">
            <div className="experience-meta">
              <p className="experience-date">Oct 2023 — Ago 2025</p>
              <p className="experience-location">Medellín, Antioquia</p>
            </div>
            <div className="experience-details">
              <p className="experience-company">Smartlinks</p>
              <h3>Analista de Servicio Nivel 3 <span>/</span> Desarrollador Full Stack</h3>
              <p className="experience-summary">
                Combiné automatización con Python, desarrollo backend y creación de interfaces para optimizar procesos internos y apoyar operaciones en producción.
              </p>
              <ul className="experience-responsibilities">
                {experienceResponsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
              <div className="experience-impact">
                <span>Logros</span>
                <p>Mejoré la eficiencia operativa, resolví incidencias críticas en producción y desarrollé soluciones para optimizar tiempos.</p>
              </div>
            </div>
          </article>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading-row">
            <div><p className="section-kicker">03 / Habilidades</p><h2 className="section-heading">Herramientas para <span>construir.</span></h2></div>
            <p className="skills-intro">Tecnología al servicio de experiencias y procesos mejores.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map(({ title, items }) => (
              <div className="skill-category" key={title}>
                <h3>{title}</h3>
                <div className="tags">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <p className="section-kicker">04 / Contacto</p>
          <div className="contact-card">
            <p className="contact-overline">¿Tienes un proyecto en mente?</p>
            <h2 className="section-heading">Hagamos que <span>suceda.</span></h2>
            <p className="contact-description">Estoy disponible para conversar sobre nuevas oportunidades y proyectos.</p>
            <div className="contact-methods">
              <a className="contact-method" href="mailto:angelsilvamejia@gmail.com">
                <span className="contact-method-label">Correo electrónico</span>
                <span className="contact-method-value">angelsilvamejia@gmail.com</span>
              </a>
              <a
                className="contact-method"
                href="https://wa.me/573012439472?text=Hola%20Miguel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar."
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-method-label">WhatsApp</span>
                <span className="contact-method-value">+57 301 243 9472 <span aria-hidden="true">↗</span></span>
              </a>
            </div>
            <div className="contact-actions">
              <a
                className="btn btn-primary"
                href="https://wa.me/573012439472?text=Hola%20Miguel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar."
                target="_blank"
                rel="noreferrer"
              >
                Escribir por WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a
                className="btn btn-secondary"
                href="https://linkedin.com/in/miguel-angel-silva-mejia-623663259"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <button className="btn btn-secondary" type="button" onClick={downloadCv}>
                Descargar CV <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>M<span className="footer-period">.</span> SILVA</span><span>Desarrollador Full Stack</span><span>© {new Date().getFullYear()}</span></footer>
    </>
  );
}

export default App;