import { Injectable, signal } from '@angular/core';

interface Translation {

  navbar: {
    language: string;
    spanish: string;
    english: string;
    theme: string;
    light: string;
    dark: string;
    menu: string;
    inicio: string;
    experiencia: string;
    proyectos: string;
    tecnologias: string;
    formacion: string;
    certificaciones: string;
    sobreMi: string;
    contacto: string;
  };

  inicio: {
    saludo: string;
    profesion: string;
    descripcion: string;
    nacionalidad: string;
    verCV: string;
    descargarCV: string;
    linkedin: string;
    github: string;

    // CV según el idioma
    cvImagen: string;
    cvPdf: string;
    cvDescarga: string;
    cvAlt: string;
    cvCerrar: string;
  };

  experiencia: {
    titulo: string;
    tipo: string;
    puesto: string;
    proyecto: string;
    periodo: string;
    descripcion: string;
  };

  proyectos: {
    titulo: string;
    tipo: string;
    descripcion: string;
    boton: string;
  };

  tecnologias: {
    titulo: string;
    frontend: string;
    backend: string;
    frameworks: string;
    basesDatos: string;
    metodologias: string;
    desarrollo: string;
  };

  formacion: {
    titulo: string;
    academica: string;
    complementaria: string;
    carrera: string;
    presente: string;
    segundoAnio: string;
    cursos: string;
    formacionComplementaria: string;
  };

  certificaciones: {
    titulo: string;
    obtenida: string;
    preparacion: string;
    office: string;
    officeDescripcion: string;
    verCertificado: string;
    profesionales: string;
    profesionalesDescripcion: string;
    proximamente: string;
  };

  sobreMi: {
    titulo: string;
    parrafo1: string;
    parrafo2: string;
    parrafo3: string;
  };

  contacto: {
    titulo: string;
    subtitulo: string;
    nombre: string;
    nombrePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    asunto: string;
    asuntoPlaceholder: string;
    mensaje: string;
    mensajePlaceholder: string;
    enviar: string;
    enviando: string;
    gracias: string;
    hecho: string;
    realizado: string;

    // Aviso de envío
    exitoTitulo: string;
    exitoMensaje: string;
    exitoLinea: string;
    errorTitulo: string;
    errorMensaje: string;
    errorLinea: string;
    cerrar: string;
    autocierre: string;
  };

}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage = signal<'es' | 'en'>('es');

  private translations: {
    es: Translation;
    en: Translation;
} = {

    es: {

      // ==========================
      // NAVBAR
      // ==========================

      navbar: {
        language: 'Idioma',
        spanish: 'Español',
        english: 'Inglés',

        theme: 'Tema',
        light: 'Claro',
        dark: 'Oscuro',

        menu: 'Menú',

        inicio: 'Inicio',
        experiencia: 'Experiencia',
        proyectos: 'Proyectos',
        tecnologias: 'Tecnologías',
        formacion: 'Formación',
        certificaciones: 'Certificaciones',
        sobreMi: 'Sobre mí',
        contacto: 'Contacto'
      },


      // ==========================
      // INICIO
      // ==========================

      inicio: {
        saludo: '👋Hola, soy',
        profesion: 'Estudiante en Análisis de Sistemas',

        descripcion:
          'Apasionado por la tecnología, ejecuto el desarrollo de software y busco mi primera inserción profesional en el sector IT.',

        nacionalidad: 'Argentino',
        verCV: 'Ver CV',
        descargarCV: 'Descargar CV',

        linkedin: 'LinkedIn',
        github: 'GitHub',

        // CV según el idioma
        cvImagen: '/cv/cv-braian-es.png',
        cvPdf: '/cv/cv-braian-es.pdf',
        cvDescarga: 'CV-Braian-Valenzuela-ES.pdf',
        cvAlt: 'Currículum Vitae de Braian de Jesús Valenzuela',
        cvCerrar: 'Cerrar CV'
      },


      // ==========================
      // EXPERIENCIA
      // (cada \n es un salto de línea: una oración debajo de otra)
      // ==========================

      experiencia: {

        titulo: 'Experiencia',

        tipo: 'VOLUNTARIADO',

        puesto: 'Desarrollador Full Stack Trainee',

        proyecto: 'Plataforma Web de Impacto Social',

        periodo: 'Enero 2026 — Presente',

        descripcion:
          'Co-desarrollo y mantenimiento evolutivo de una Aplicación Web comunitaria orientada a conectar ciudadanos con servicios de asistencia gratuita (comedores, duchas y refugios, etc.) para ayudar a personas en situación de calle.\nAnálisis grupal de la arquitectura de software existente, codificación conjunta de nuevos componentes funcionales y pruebas de integración de módulos.'

        },


      // ==========================
      // PROYECTOS
      // ==========================

      proyectos: {

        titulo: 'Proyectos',

        tipo: 'PROYECTO GRUPAL ACADÉMICO',

        descripcion:
          'Juego interactivo por consola inspirado en Wordle que utiliza los colores del semáforo para indicar aciertos, aproximaciones o errores directamente en la terminal. El sistema está estructurado de forma que, a mayor dificultad seleccionada por el usuario, mayor será la cantidad de números que se deben adivinar.',

        boton: 'Probar Juego y Ver Código'
      },


      // ==========================
      // TECNOLOGÍAS
      // ==========================

      tecnologias: {

        titulo: 'Tecnologías',

        frontend: 'Frontend',
        backend: 'Backend',
        frameworks: 'Sistemas empresariales (erp)',
        basesDatos: 'Bases de Datos',
        metodologias: 'Gestión de Proyectos',
        desarrollo: 'Entornos'
      },


      // ==========================
      // FORMACIÓN
      // ==========================

      formacion: {

        titulo: 'Formación',

        academica: 'FORMACIÓN ACADÉMICA',

        complementaria: 'FORMACIÓN COMPLEMENTARIA',

        carrera:
          'Tecnicatura Superior en Análisis de Sistemas',

        presente: 'Presente',

        segundoAnio:
          '2.º año de la carrera.',

        cursos:
          'Cursos de formación profesional',

        formacionComplementaria:
          'Módulos de capacitación'
      },


      // ==========================
      // CERTIFICACIONES
      // ==========================

      certificaciones: {

        titulo: 'Certificaciones',

        obtenida: 'CERTIFICACIÓN OBTENIDA',

        preparacion: 'EN PREPARACIÓN',

        office: 'Office Básico',

        officeDescripcion:
          'Certificación obtenida mediante formación en herramientas básicas de Microsoft Office.',

        verCertificado: 'Ver certificado',

        profesionales: 'Certificaciones profesionales',

        profesionalesDescripcion:
          'Actualmente me encuentro realizando cursos de formación profesional orientados a ampliar y fortalecer mis conocimientos en tecnología.',

        proximamente: 'Próximamente'
      },


      // ==========================
      // SOBRE MÍ
      // ==========================

      sobreMi: {

        titulo: 'Sobre mí',

        parrafo1:
          'Mi camino en el mundo de la tecnología comenzó cuando decidí estudiar una carrera de nivel Superior en la Tecnicatura en Análisis de Sistemas (IFTS 21). Acepté el <strong>compromiso</strong> sin imaginar que terminaría descubriendo una profesión que <strong>realmente me apasiona</strong>.',

        parrafo2:
          'Desde entonces, disfruto del <strong>aprendizaje continuo</strong> de nuevas herramientas. Me motiva afrontar <strong>desafíos complejos</strong> que me impulsen a <strong>resolver problemas</strong>, dar lo mejor de mí y seguir potenciando mi <strong>perfil IT</strong>.',

        parrafo3:
          'Fuera del entorno de desarrollo, aplico la misma <strong>disciplina</strong> en la música, ejecutando diferentes instrumentos, y optimizando mi capacidad de <strong>trabajo en equipo</strong> y <strong>foco bajo presión</strong> a través del deporte. También participo en las actividades de mi comunidad religiosa. Considero que la <strong>responsabilidad</strong>, la <strong>honestidad</strong> y la <strong>resiliencia</strong> son los pilares fundamentales tanto en mi vida personal como en el <strong>ámbito profesional</strong>.'
      },


      // ==========================
      // CONTACTO
      // ==========================

      contacto: {

        titulo: 'Contacto',

        subtitulo:
          '¿Tenés una propuesta, proyecto o simplemente querés ponerte en contacto? Escribime.',

        nombre: 'Nombre',
        nombrePlaceholder: 'Tu nombre',

        email: 'Correo electrónico',
        emailPlaceholder: 'tu@email.com',

        asunto: 'Asunto',
        asuntoPlaceholder: '¿En qué puedo ayudarte?',

        mensaje: 'Mensaje',
        mensajePlaceholder: 'Escribí tu mensaje...',

        enviar: 'Enviar mensaje',
        enviando: 'Enviando...',

        gracias: 'Gracias por visitar mi porfolio.',

        hecho: 'Hecho con ❤️, ☕ y muchas ganas de seguir aprendiendo. 💻',

        realizado: 'Desarrollado con',

        // Aviso de envío
        exitoTitulo: '¡Mensaje enviado!',
        exitoMensaje:
          'Gracias por escribirme. Recibí tu mensaje y te responderé a la brevedad.',
        exitoLinea: 'mensaje enviado correctamente',

        errorTitulo: 'No se pudo enviar',
        errorMensaje:
          'Ocurrió un problema al enviar tu mensaje. Revisá tu conexión e intentá nuevamente.',
        errorLinea: 'error al enviar el mensaje',

        cerrar: 'Cerrar',
        autocierre: 'Este aviso se cierra automáticamente'
      }

    },


    // =====================================================
    // INGLÉS
    // =====================================================

    en: {

      navbar: {

        language: 'Language',
        spanish: 'Spanish',
        english: 'English',

        theme: 'Theme',
        light: 'Light',
        dark: 'Dark',

        menu: 'Menu',

        inicio: 'Home',
        experiencia: 'Experience',
        proyectos: 'Projects',
        tecnologias: 'Technologies',
        formacion: 'Education',
        certificaciones: 'Certifications',
        sobreMi: 'About me',
        contacto: 'Contact'
      },


      inicio: {

        saludo: "👋Hi, I'm",

        profesion:
          'Systems Analysis Student',

        descripcion:
          'Passionate about technology, I carry out software development and am seeking my first professional role in the IT sector.',

        nacionalidad: 'Argentinian',

        verCV: 'View CV',
        descargarCV: 'Download CV',

        linkedin: 'LinkedIn',
        github: 'GitHub',

        // CV según el idioma
        cvImagen: '/cv/cv-braian-en.png',
        cvPdf: '/cv/cv-braian-en.pdf',
        cvDescarga: 'CV-Braian-Valenzuela-EN.pdf',
        cvAlt: 'Curriculum Vitae of Braian de Jesús Valenzuela',
        cvCerrar: 'Close CV'
      },


      experiencia: {

        titulo: 'Professional Experience',

        tipo: 'VOLUNTEERING',

        puesto: 'Full Stack Developer Trainee',

        proyecto: 'Social Impact Web Platform',

        periodo: 'January 2026 — Present',

        descripcion:
          'Co-development and evolutionary maintenance of a community-focused web application designed to connect citizens with free assistance services (soup kitchens, showers, shelters, etc.) to help people experiencing homelessness.\nCollaborative analysis of the existing software architecture, joint coding of new functional components, and module integration testing.'
      },


      proyectos: {

        titulo: 'Projects',

        tipo: 'ACADEMIC GROUP PROJECT',

        descripcion:
          'Interactive console game inspired by Wordle that uses traffic light colors to indicate correct, approximate or incorrect answers directly in the terminal. The system is structured so that the higher the difficulty selected by the user, the greater the number of numbers that must be guessed.',

        boton: 'Play Game and View Code'
      },


      tecnologias: {

        titulo: 'Technologies',

        frontend: 'Frontend',
        backend: 'Backend',
        frameworks: 'Enterprise Systems',
        basesDatos: 'Databases',
        metodologias: 'Project Management',
        desarrollo: 'Enviroments'
      },


      formacion: {

        titulo: 'Education',

        academica: 'ACADEMIC EDUCATION',

        complementaria: 'ADDITIONAL EDUCATION',

        carrera:
          'Higher Technical Degree in Systems Analysis',

        presente: 'Present',

        segundoAnio:
          '2nd year of the program.',

        cursos:
          'Professional training courses',

        formacionComplementaria:
          'Training modules'
      },


      certificaciones: {

        titulo: 'Certifications',

        obtenida: 'CERTIFICATION OBTAINED',

        preparacion: 'IN PROGRESS',

        office: 'Basic Office',

        officeDescripcion:
          'Certification obtained through training in basic Microsoft Office tools.',

        verCertificado: 'View certificate',

        profesionales: 'Professional certifications',

        profesionalesDescripcion:
          'I am currently taking professional training courses aimed at expanding and strengthening my knowledge in technology.',

        proximamente: 'Coming soon'
      },


      sobreMi: {

        titulo: 'About me',

        parrafo1:
          'My journey in the world of technology began when I decided to pursue a higher education program in Systems Analysis (IFTS 21). I took on the <strong>challenge</strong> without imagining that I would end up discovering a profession I am <strong>truly passionate about</strong>.',

        parrafo2:
          'Since then, I have enjoyed <strong>continuously learning</strong> new tools. I am motivated by tackling <strong>complex challenges</strong> that drive me to <strong>solve problems</strong>, give my best, and further enhance my <strong>IT profile</strong>.',

        parrafo3:
          'Outside the development environment, I apply the same <strong>discipline</strong> to music playing various instruments and hone my <strong>teamwork skills</strong> and ability to <strong>focus under pressure</strong> through sports. I also participate in activities within my religious community. I consider <strong>responsibility</strong>, <strong>honesty</strong>, and <strong>resilience</strong> to be the fundamental pillars of both my personal and <strong>professional life</strong>.'
      },


      contacto: {

        titulo: 'Contact',

        subtitulo:
          'Do you have a proposal, project or simply want to get in touch? Write to me.',

        nombre: 'Name',
        nombrePlaceholder: 'Your name',

        email: 'Email',
        emailPlaceholder: 'you@email.com',

        asunto: 'Subject',
        asuntoPlaceholder: 'How can I help you?',

        mensaje: 'Message',
        mensajePlaceholder: 'Write your message...',

        enviar: 'Send message',
        enviando: 'Sending...',

        gracias: 'Thank you for visiting my portfolio.',

        hecho: 'Made with ❤️, ☕ and a lot of eagerness to keep learning. 💻',

        realizado: 'Developed with',

        // Aviso de envío
        exitoTitulo: 'Message sent!',
        exitoMensaje:
          'Thanks for reaching out. I received your message and will get back to you shortly.',
        exitoLinea: 'message sent successfully',

        errorTitulo: 'Could not send',
        errorMensaje:
          'There was a problem sending your message. Please check your connection and try again.',
        errorLinea: 'failed to send message',

        cerrar: 'Close',
        autocierre: 'This notice closes automatically'
      }

    }

  };


  setLanguage(language: 'es' | 'en') {

    this.currentLanguage.set(language);

  }


  toggleLanguage() {

    this.currentLanguage.update(
      language => language === 'es' ? 'en' : 'es'
    );

  }


 t<K extends keyof Translation>(section: K): Translation[K] {

  return this.translations[this.currentLanguage()][section];

}

 get texts(): Translation {

    return this.translations[this.currentLanguage()];

  }



}