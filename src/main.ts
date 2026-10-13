import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Al recargar (F5), el navegador no restaura la posición anterior
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Si la URL quedó con #contacto, #proyectos, etc., se limpia
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

window.scrollTo(0, 0);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));