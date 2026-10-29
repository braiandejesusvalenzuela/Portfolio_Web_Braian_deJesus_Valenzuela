const FORMA_1 = 'm116.028 20.477l-4.19 65.79L71.78 0zm-27.745 85.07l-30.269 17.271l-30.268-17.27l6.156-14.92h48.224zm-30.269-72.8l15.861 38.56H42.153zM4.147 86.267L0 20.477L44.248 0z';
const FORMA_2 = 'm88.283 105.548l-30.269 17.27l-30.268-17.27l6.156-14.92h48.224zM58.014 32.746l15.861 38.56H42.153zM4.147 86.267L0 20.477L44.248 0z';

// Rota el tono (hue) de un color hexadecimal
function girar(hex: string, grados: number): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;

  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }

  h = (h + grados + 360) % 360;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  const [R, G, B] = (
    h < 60 ? [c, x, 0] :
    h < 120 ? [x, c, 0] :
    h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] :
    h < 300 ? [x, 0, c] : [c, 0, x]
  ) as number[];

  const a2 = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return '#' + a2(R) + a2(G) + a2(B);
}

// Arma el escudo con los colores girados `grados`
function crearSvg(grados: number): string {
  const c = (hex: string) => girar(hex, grados);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116 123">
<defs>
<linearGradient id="g1" x1="0%" x2="100%" y1="48.065%" y2="50.391%">
<stop offset="0%" stop-color="${c('#e847a3')}"/>
<stop offset="26%" stop-color="${c('#da5af7')}"/>
<stop offset="56%" stop-color="${c('#b848f4')}"/>
<stop offset="100%" stop-color="${c('#8842f6')}"/>
</linearGradient>
<linearGradient id="g2" x1="36.615%" x2="33.292%" y1="41.656%" y2="100%">
<stop offset="0%" stop-color="${c('#e03440')}" stop-opacity=".2"/>
<stop offset="28%" stop-color="${c('#e03440')}" stop-opacity=".62"/>
<stop offset="100%" stop-color="${c('#e03440')}"/>
</linearGradient>
</defs>
<path fill="url(#g1)" d="${FORMA_1}"/>
<path fill="url(#g2)" d="${FORMA_2}"/>
</svg>`;
}

export function animarFavicon(): void {

  const link = document.getElementById('favicon') as HTMLLinkElement | null;
  if (!link) return;

  // Respeta a quien tiene desactivadas las animaciones
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const PASO_GRADOS = 15;     // cuánto cambia el color en cada cuadro
  const CUADRO_MS = 80;       // velocidad (80 ms = ~12 cuadros por segundo)
  const DESCANSO_MS = 6000;   // pausa entre animaciones

  const pintar = (grados: number) => {
    link.href = 'data:image/svg+xml,' + encodeURIComponent(crearSvg(grados));
  };

  const correr = () => {
    let grados = 0;

    const intervalo = setInterval(() => {
      grados += PASO_GRADOS;

      if (grados >= 360) {
        clearInterval(intervalo);
        pintar(0);                              // vuelve al color original
        setTimeout(correr, DESCANSO_MS);
        return;
      }

      pintar(grados);
    }, CUADRO_MS);
  };

  // Primera animación 1,5 s después de cargar
  setTimeout(correr, 1500);
}