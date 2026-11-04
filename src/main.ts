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

// Mantiene la página arriba mientras carga (hasta 2 s), por si el navegador
// intenta restaurar el scroll tarde. Se detiene apenas el usuario interactúa.
const fijarArriba = (): void => {

  const html = document.documentElement;
  const fin = Date.now() + 2000;
  let activo = true;

  const eventos = ['wheel', 'touchstart', 'mousedown', 'keydown'];

  const parar = (): void => {
    if (!activo) return;
    activo = false;
    html.style.scrollBehavior = '';
    eventos.forEach(e => window.removeEventListener(e, parar));
  };

  html.style.scrollBehavior = 'auto';
  eventos.forEach(e => window.addEventListener(e, parar, { passive: true }));

  const tick = (): void => {
    if (!activo) return;

    if (window.scrollY !== 0) {
      window.scrollTo(0, 0);
    }

    if (Date.now() < fin) {
      requestAnimationFrame(tick);
    } else {
      parar();
    }
  };

  tick();
};

// Al cargar
irAlInicio();
fijarArriba();

// Justo antes de recargar o salir (F5, Ctrl+Shift+R, botón recargar, celular)
window.addEventListener('beforeunload', irAlInicio);
window.addEventListener('pagehide', irAlInicio);

// Si el navegador recupera la página desde su memoria (botón atrás)
window.addEventListener('pageshow', (e: PageTransitionEvent) => {
  if (e.persisted) {
    irAlInicio();
    fijarArriba();
  }
});

animarFavicon();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));