import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Inicio } from './components/inicio/inicio';
import { Experiencia } from './components/experiencia/experiencia';
import { Proyectos } from './components/proyectos/proyectos';
import { Tecnologias } from './components/tecnologias/tecnologias';
import { Formacion } from './components/formacion/formacion';
import { Certificaciones } from './components/certificaciones/certificaciones';
import { SobreMi } from './components/sobre-mi/sobre-mi';
import { Contacto } from './components/contacto/contacto';
import { Cursor } from './components/cursor/cursor';

@Component({
  selector: 'app-root',

  imports: [
    RouterOutlet,
    Navbar,
    Inicio,
    Experiencia,
    Proyectos,
    Tecnologias,
    Formacion,
    Certificaciones,
    SobreMi,
    Contacto,
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  protected readonly title = signal('portfolio-web-brai');

  ngAfterViewInit(): void {
    // Una vez pintada la página, se asegura de estar arriba (Inicio)
    window.scrollTo(0, 0);

    // Y otra vez cuando termina de cargar todo (imágenes, fuentes),
    // por si el navegador movió el scroll entre medio
    window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
  }
}