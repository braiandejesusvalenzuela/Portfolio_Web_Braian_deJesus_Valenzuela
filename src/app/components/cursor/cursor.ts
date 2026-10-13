import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * LUZ SOBRE EL CIRCUITO  (versión 2)
 *
 * Un resplandor sigue al mouse e ilumina los trazos del fondo de circuitos.
 * Es una segunda copia de la imagen de fondo, más brillante, visible solo
 * dentro de un círculo difuminado que se mueve con el mouse.
 *
 * Cambios respecto de la versión 1 (para que funcione en cualquier layout):
 *  - La capa se crea por código y se agrega directamente a <body>, igual que
 *    el fondo (body::before). Así no depende de dónde pongas <app-cursor>.
 *  - Todos los estilos son inline: no dependen del CSS del componente.
 *  - Ya no se desactiva por media queries (hover/pointer): se activa con el
 *    primer movimiento de un mouse real (pointerType === 'mouse').
 *  - Con DEBUG = true escribe en la consola qué está pasando.
 */

// ==========================
// AJUSTES
// ==========================

// Muestra mensajes en la consola del navegador (F12). Ponelo en false al terminar.
const DEBUG = true;

// Misma imagen que usás de fondo en styles.css (body::before)
const IMAGEN = '/img/fondo-circuito-dorado.png';

// Radio de la luz en píxeles (el círculo completo mide RADIO * 2)
const RADIO = 260;

// Qué tan pegada sigue al mouse: 0.05 muy lenta ... 1 exacta
const SUAVIDAD = 0.18;

// Color del resplandor
const COLOR_RESPLANDOR = 'rgba(56, 189, 248, .22)';

// Intensidad de los trazos iluminados
const FILTRO_OSCURO = 'brightness(1.5) saturate(1.5) contrast(1.15)';
const FILTRO_CLARO = 'invert(1) hue-rotate(180deg) saturate(1.7) contrast(1.3)';

// Elementos sobre los que la luz se intensifica
const INTERACTIVOS =
  'a, button, [role="button"], input, textarea, select, label, .tecnologia, .tecnologia-item';

const MASCARA =
  'radial-gradient(circle closest-side, #000 0%, rgba(0,0,0,.6) 40%, transparent 100%)';


@Component({
  selector: 'app-cursor',
  imports: [],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css',
  host: { 'aria-hidden': 'true', 'style': 'display: none' }
})
export class Cursor implements AfterViewInit, OnDestroy {

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);

  private capa!: HTMLElement;
  private halo!: HTMLElement;
  private trazos!: HTMLElement;
  private observador?: MutationObserver;

  // posición actual (con suavizado) y posición objetivo (el mouse)
  private x = 0;
  private y = 0;
  private tx = 0;
  private ty = 0;

  private raf = 0;
  private visible = false;
  private escala = 1;
  private reducirMovimiento = false;

  // tamaño real de la imagen y cómo queda "cover" en la pantalla
  private anchoImg = 1536;
  private altoImg = 1024;
  private ox = 0;
  private oy = 0;


  // ==========================
  // INICIO
  // ==========================

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) return;

    this.reducirMovimiento =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.crearCapa();
    this.aplicarTema();
    this.medir();

    // Toma el tamaño real de la imagen para alinearla con el fondo
    const img = new Image();
    img.onload = () => {
      this.anchoImg = img.naturalWidth;
      this.altoImg = img.naturalHeight;
      this.medir();
      this.pintar();
      this.log(`imagen cargada (${img.naturalWidth}x${img.naturalHeight})`);
    };
    img.onerror = () => {
      console.warn(`[luz] No se pudo cargar la imagen: ${IMAGEN}. Revisá la ruta en cursor.ts`);
    };
    img.src = IMAGEN;

    // Los eventos corren fuera de Angular para no disparar detección de cambios
    this.zone.runOutsideAngular(() => {
      window.addEventListener('pointermove', this.onMover, { passive: true });
      window.addEventListener('pointerdown', this.onPulsar, { passive: true });
      window.addEventListener('resize', this.onRedimensionar, { passive: true });
      document.addEventListener('pointerover', this.onSobre, { passive: true });
      document.documentElement.addEventListener('mouseleave', this.onSalir);

      // Si cambia el tema (data-theme), se actualiza la luz
      this.observador = new MutationObserver(() => this.aplicarTema());
      this.observador.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
      });
    });

    this.log('iniciada. Mové el mouse para ver la luz.');
  }


  // ==========================
  // CREAR LA CAPA (todo inline, se agrega a <body>)
  // ==========================

  private crearCapa(): void {

    this.capa = document.createElement('div');
    this.capa.setAttribute('aria-hidden', 'true');
    this.capa.setAttribute('data-luz-circuito', '');
    this.estilo(this.capa, {
      'position': 'fixed',
      'inset': '0',
      'z-index': '-1',
      'pointer-events': 'none',
      'overflow': 'hidden',
      'opacity': '0',
      'transition': this.reducirMovimiento ? 'none' : 'opacity .45s ease'
    });

    const lado = `${RADIO * 2}px`;
    const comun = {
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': lado,
      'height': lado,
      'will-change': 'transform',
      'mask-image': MASCARA,
      '-webkit-mask-image': MASCARA,
      'scale': '1',
      'transition': this.reducirMovimiento ? 'none' : 'scale .4s cubic-bezier(.2,.8,.2,1)'
    };

    this.halo = document.createElement('div');
    this.estilo(this.halo, {
      ...comun,
      'background': `radial-gradient(circle closest-side, ${COLOR_RESPLANDOR}, transparent)`
    });

    this.trazos = document.createElement('div');
    this.estilo(this.trazos, {
      ...comun,
      'background-image': `url('${IMAGEN}')`,
      'background-repeat': 'no-repeat'
    });

    this.capa.append(this.halo, this.trazos);
    document.body.appendChild(this.capa);
  }

  private estilo(el: HTMLElement, props: Record<string, string>): void {
    for (const [nombre, valor] of Object.entries(props)) {
      el.style.setProperty(nombre, valor);
    }
  }

  // Tema claro: se multiplica (oscurece los trazos). Tema oscuro: se suma luz.
  private aplicarTema(): void {

    const html = document.documentElement;
    const claro =
      html.getAttribute('data-theme') === 'light' ||
      html.classList.contains('light-theme');

    this.capa.style.setProperty('mix-blend-mode', claro ? 'multiply' : 'screen');
    this.trazos.style.setProperty('filter', claro ? FILTRO_CLARO : FILTRO_OSCURO);
  }


  // ==========================
  // EVENTOS
  // ==========================

  private onMover = (e: PointerEvent): void => {

    if (e.pointerType !== 'mouse') return;

    this.tx = e.clientX;
    this.ty = e.clientY;

    // Primer movimiento: aparece justo bajo el mouse, sin "viajar" desde (0,0)
    if (!this.visible) {
      this.x = this.tx;
      this.y = this.ty;
      this.visible = true;
      this.capa.style.setProperty('opacity', '1');
      this.pintar();
      this.log('primer movimiento detectado: la luz debería verse ahora.');
    }

    this.animar();
  };

  private onSalir = (): void => {
    this.visible = false;
    this.capa.style.setProperty('opacity', '0');
  };

  // La luz se intensifica sobre links, botones, campos, etc.
  private onSobre = (e: PointerEvent): void => {

    if (e.pointerType !== 'mouse') return;

    const destino = e.target as Element | null;
    const interactivo = !!destino?.closest?.(INTERACTIVOS);

    this.escala = interactivo ? 1.3 : 1;
    this.halo.style.setProperty('scale', String(this.escala));
    this.trazos.style.setProperty('scale', String(this.escala));
  };

  // Pulso corto al hacer click
  private onPulsar = (e: PointerEvent): void => {

    if (e.pointerType !== 'mouse' || this.reducirMovimiento) return;
    if (typeof this.halo.animate !== 'function') return;

    const base = this.escala;
    const pulso = [
      { scale: String(base) },
      { scale: String(base * 1.5), offset: 0.4 },
      { scale: String(base) }
    ];
    const opciones = { duration: 550, easing: 'ease-out' };

    this.halo.animate(pulso, opciones);
    this.trazos.animate(pulso, opciones);
  };

  private onRedimensionar = (): void => {
    this.medir();
    this.pintar();
  };


  // ==========================
  // ANIMACIÓN
  // ==========================

  private animar(): void {
    if (!this.raf) {
      this.raf = requestAnimationFrame(this.cuadro);
    }
  }

  private cuadro = (): void => {

    const k = this.reducirMovimiento ? 1 : SUAVIDAD;

    this.x += (this.tx - this.x) * k;
    this.y += (this.ty - this.y) * k;

    this.pintar();

    // Sigue solo mientras falte llegar; si no, descansa (no gasta CPU)
    const falta = Math.abs(this.tx - this.x) > 0.1 || Math.abs(this.ty - this.y) > 0.1;
    this.raf = falta ? requestAnimationFrame(this.cuadro) : 0;
  };

  private pintar(): void {

    // posición de la esquina superior izquierda de la luz
    const px = this.x - RADIO;
    const py = this.y - RADIO;

    const mover = `translate3d(${px}px, ${py}px, 0)`;

    this.halo.style.setProperty('transform', mover);
    this.trazos.style.setProperty('transform', mover);

    // La imagen se desplaza al revés para quedar clavada al fondo de la página
    this.trazos.style.setProperty('background-position', `${this.ox - px}px ${this.oy - py}px`);
  }

  // Calcula cómo se ve el fondo con "cover" y centrado, igual que body::before
  private medir(): void {

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const escala = Math.max(vw / this.anchoImg, vh / this.altoImg);
    const ancho = this.anchoImg * escala;
    const alto = this.altoImg * escala;

    this.ox = (vw - ancho) / 2;
    this.oy = (vh - alto) / 2;

    this.trazos.style.setProperty('background-size', `${ancho}px ${alto}px`);
  }

  private log(mensaje: string): void {
    if (DEBUG) console.log(`[luz] ${mensaje}`);
  }


  // ==========================
  // LIMPIEZA
  // ==========================

  ngOnDestroy(): void {

    if (this.raf) cancelAnimationFrame(this.raf);

    if (typeof window === 'undefined') return;

    window.removeEventListener('pointermove', this.onMover);
    window.removeEventListener('pointerdown', this.onPulsar);
    window.removeEventListener('resize', this.onRedimensionar);
    document.removeEventListener('pointerover', this.onSobre);
    document.documentElement.removeEventListener('mouseleave', this.onSalir);

    this.observador?.disconnect();
    this.capa?.remove();
  }

}