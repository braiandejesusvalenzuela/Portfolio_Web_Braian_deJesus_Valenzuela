import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { animarFavicon } from './favicon-animado';

// El navegador no restaura la posición de scroll al recargar
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Si la URL quedó con #contacto, #proyectos, etc., se limpia
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

// Salto instantáneo al tope, ignorando el scroll-behavior: smooth del CSS
const irAlInicio = (): void => {
  const html = document.documentElement;
  const previo = html.style.scrollBehavior;

  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.style.scrollBehavior = previo;
};

// Al cargar
irAlInicio();

// Justo antes de recargar o salir (F5, Ctrl+Shift+R, botón recargar, celular)
window.addEventListener('beforeunload', irAlInicio);
window.addEventListener('pagehide', irAlInicio);

// Si el navegador recupera la página desde su memoria (botón atrás)
window.addEventListener('pageshow', (e: PageTransitionEvent) => {
  if (e.persisted) irAlInicio();
});

animarFavicon();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));