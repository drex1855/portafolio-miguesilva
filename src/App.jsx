import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';
import { downloadCv } from './generateCvPdf.js';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY  = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaToken) return;
    
    setFormStatus('sending');
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        setFormStatus('success');
        setFormData({ from_name: '', from_email: '', message: '' });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      })
      .catch(() => setFormStatus('error'));
  };

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
          <div className="contact-layout">
            <div className="contact-form-container">
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate style={{ marginTop: 0 }}>
                <div className="contact-form-field">
                  <label htmlFor="from_name">Nombre</label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="from_email">Email</label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div className="contact-form-field">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptcha}
                    theme="dark"
                  />
                </div>

                {formStatus === 'success' && (
                  <p className="form-feedback form-feedback--success">
                    ✓ ¡Mensaje enviado! Te responderé pronto.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="form-feedback form-feedback--error">
                    ✗ Ocurrió un error. Intenta de nuevo o escríbeme por WhatsApp.
                  </p>
                )}

                <button
                  className="btn btn-primary contact-form-submit"
                  type="submit"
                  disabled={formStatus === 'sending' || !captchaToken}
                >
                  {formStatus === 'sending' ? 'Enviando...' : <>Enviar mensaje <span aria-hidden="true">↗</span></>}
                </button>
              </form>
            </div>

            <div className="contact-info">
              <p className="contact-overline">¿Tienes un proyecto en mente?</p>
              <h2 className="section-heading">Hagamos que <span>suceda.</span></h2>
              <p className="contact-description">
                Si tienes un proyecto en mente, una oportunidad laboral o solo quieres saludar, no dudes en escribirme.
              </p>
              
              <div className="contact-actions" style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: '2rem' }}>
                <a
                  className="btn btn-secondary"
                  href="https://wa.me/573012439472?text=Hola%20Miguel%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar."
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  WhatsApp <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="btn btn-secondary"
                  href="https://linkedin.com/in/miguel-angel-silva-mejia-623663259"
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="btn btn-secondary"
                  href="https://github.com/drex1855"
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                <button className="btn btn-secondary" type="button" onClick={downloadCv} style={{ width: '100%', justifyContent: 'center' }}>
                  Descargar CV <span aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>M<span className="footer-period">.</span> SILVA</span><span>Desarrollador Full Stack</span><span>© {new Date().getFullYear()} Miguel Ángel Silva Mejía</span></footer>
    </>
  );
}

export default App;