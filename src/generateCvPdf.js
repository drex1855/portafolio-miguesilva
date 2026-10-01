const pageWidth = 210;
const pageHeight = 297;
const margin = 18;
const contentWidth = pageWidth - margin * 2;

export async function downloadCv() {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ format: 'a4', unit: 'mm' });
  let cursorY = 0;

  pdf.setProperties({
    title: 'CV - Miguel Ángel Silva Mejía',
    subject: 'Desarrollador Full Stack | Backend | Automatización',
    author: 'Miguel Ángel Silva Mejía',
  });

  const ensureSpace = (height) => {
    if (cursorY + height > pageHeight - margin) {
      pdf.addPage();
      cursorY = margin;
    }
  };

  const addSection = (title) => {
    ensureSpace(12);
    cursorY += 3;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(221, 102, 76);
    pdf.text(title.toUpperCase(), margin, cursorY);
    cursorY += 2;
    pdf.setDrawColor(222, 226, 223);
    pdf.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 5;
  };

  const addParagraph = (text, { fontSize = 8.7, color = [65, 73, 70], indent = 0 } = {}) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(text, contentWidth - indent);
    const lineHeight = fontSize * 0.48;
    ensureSpace(lines.length * lineHeight + 1);
    pdf.text(lines, margin + indent, cursorY);
    cursorY += lines.length * lineHeight + 1;
  };

  const addBullet = (text) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(65, 73, 70);
    const indent = 4;
    const lines = pdf.splitTextToSize(text, contentWidth - indent - 2);
    const lineHeight = 4.15;
    ensureSpace(lines.length * lineHeight + 1);
    pdf.setFillColor(221, 102, 76);
    pdf.circle(margin + 1, cursorY - 0.8, 0.65, 'F');
    pdf.text(lines, margin + indent, cursorY);
    cursorY += lines.length * lineHeight + 1;
  };

  pdf.setFillColor(20, 31, 34);
  pdf.rect(0, 0, pageWidth, 49, 'F');
  pdf.setFillColor(255, 121, 91);
  pdf.rect(0, 47, pageWidth, 2, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  pdf.text('Miguel Ángel Silva Mejía', margin, 17);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(190, 210, 202);
  pdf.text('Desarrollador Full Stack | Backend | Automatización', margin, 25);
  pdf.setFontSize(8.2);
  pdf.setTextColor(239, 243, 240);
  pdf.text('Medellín, Antioquia  |  +57 301 243 9472', margin, 34);
  pdf.text('angelsilvamejia@gmail.com', margin, 41);
  pdf.setTextColor(169, 223, 198);
  pdf.text('linkedin.com/in/miguel-angel-silva-mejia-623663259', 94, 41);
  cursorY = 57;

  addSection('Perfil profesional');
  addParagraph(
    'Desarrollador Full Stack con experiencia en desarrollo backend, frontend, automatización de procesos y gestión de bases de datos relacionales y no relacionales. Enfocado en la resolución de problemas, corrección de errores complejos y optimización de procesos internos mediante scripts en Python. Experiencia colaborando con equipos de desarrollo en entornos de producción, mejorando la eficiencia operativa y la calidad del software.',
  );

  addSection('Experiencia laboral');
  ensureSpace(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(29, 38, 37);
  pdf.text('Smartlinks', margin, cursorY);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.2);
  pdf.setTextColor(104, 115, 109);
  pdf.text('Oct 2023 - Ago 2025  |  Medellín, Antioquia', pageWidth - margin, cursorY, { align: 'right' });
  cursorY += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(221, 102, 76);
  pdf.text('Analista de Servicio Nivel 3 / Desarrollador Full Stack', margin, cursorY);
  cursorY += 5;
  [
    'Desarrollé scripts en Python para automatizar procesos internos y optimizar flujos de facturación.',
    'Implementé mejoras de backend para procesos internos y soporte operativo.',
    'Diseñé y desarrollé interfaces para la intranet corporativa utilizando JavaScript, CSS y React.',
    'Administré y optimicé bases de datos SQL y NoSQL para operaciones empresariales.',
    'Realicé QA, debugging y corrección de bugs en entornos de producción.',
    'Colaboré con líderes de desarrollo en análisis de código y despliegue de soluciones.',
  ].forEach(addBullet);

  addSection('Educación');
  addParagraph('Ingeniería de Sistemas (en curso) - Uniminuto | Ene 2024 - Dic 2028', { fontSize: 8.5 });
  addParagraph('Bachiller Académico - Instituto Educativo Ferrini | Graduado: Dic 2019', { fontSize: 8.5 });

  addSection('Habilidades técnicas');
  addParagraph('Lenguajes: JavaScript, Python, PHP, Java, C#.', { fontSize: 8.5 });
  addParagraph('Frontend: React, CSS, Tailwind.  |  Backend: Node.js, .NET, Meteor.', { fontSize: 8.5 });
  addParagraph('Bases de datos: SQL, NoSQL, relacionales y no relacionales.', { fontSize: 8.5 });
  addParagraph('Cloud & DevOps: AWS, Azure, Git.  |  Otros: Automatización, debugging, soporte nivel 3, QA.', { fontSize: 8.5 });

  addSection('Logros relevantes');
  [
    'Automatización de procesos internos que mejoraron la eficiencia operativa.',
    'Resolución de incidencias críticas en producción.',
    'Desarrollo de soluciones internas orientadas a optimizar tiempos.',
  ].forEach(addBullet);

  pdf.save('Miguel_Angel_Silva_Mejia_CV.pdf');
}