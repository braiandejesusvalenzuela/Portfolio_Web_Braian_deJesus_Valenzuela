import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  signal
} from '@angular/core';
import emailjs from '@emailjs/browser';
import { LanguageService } from '../../services/language';

type TipoAviso = 'exito' | 'error';

@Component({
  selector: 'app-contacto',
  imports: [],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto implements OnDestroy {

  currentYear = new Date().getFullYear();

  // ==========================
  // AVISO (ÉXITO / ERROR)
  // ==========================

  // Tiempo hasta que el aviso se cierra solo (en milisegundos).
  // La barra de progreso del CSS usa este mismo valor.
  readonly autocierreMs = 10000;

  enviando = signal(false);
  avisoVisible = signal(false);
  avisoTipo = signal<TipoAviso>('exito');

  @ViewChild('btnCerrar') private btnCerrar?: ElementRef<HTMLButtonElement>;

  private temporizador?: ReturnType<typeof setTimeout>;
  private elementoPrevio: HTMLElement | null = null;

  // Momento del último envío exitoso (para limitar envíos seguidos)
  private ultimoEnvio = 0;
  private readonly esperaMinimaMs = 30000;   // 30 segundos entre mensajes

  constructor(public languageService: LanguageService) {}

  get textos() {
    return this.languageService.t('contacto');
  }

  // ==========================
  // ENVÍO DEL FORMULARIO
  // ==========================

  enviarFormulario(event: Event): void {

    event.preventDefault();

    // Evita mensajes duplicados si se hace click varias veces
    if (this.enviando()) return;

    const formulario = event.target as HTMLFormElement;

    // HONEYPOT: si el campo trampa tiene texto, es un bot.
    // Se simula un éxito para que no sepa que fue detectado.
    const trampa = formulario.elements.namedItem('website') as HTMLInputElement | null;
    if (trampa && trampa.value.trim() !== '') {
      formulario.reset();
      this.mostrarAviso('exito');
      return;
    }

    // LÍMITE: no más de un mensaje cada 30 segundos
    if (Date.now() - this.ultimoEnvio < this.esperaMinimaMs) {
      this.mostrarAviso('error');
      return;
    }

    this.enviando.set(true);

    emailjs.sendForm(
      'service_yl9w1yp',
      'template_gezkwq8',
      formulario,
      'KKIoycDkIcUSy5A1B'
    )
    .then(() => {

      this.ultimoEnvio = Date.now();
      formulario.reset();
      this.mostrarAviso('exito');

    })
    .catch((error) => {

      console.error('Error al enviar el mensaje:', error);
      this.mostrarAviso('error');

    })
    .finally(() => {

      this.enviando.set(false);

    });

  }

  // ==========================
  // ABRIR / CERRAR AVISO
  // ==========================

  private mostrarAviso(tipo: TipoAviso): void {

    this.limpiarTemporizador();

    this.elementoPrevio = document.activeElement as HTMLElement | null;

    this.avisoTipo.set(tipo);
    this.avisoVisible.set(true);

    // Bloquea el scroll del fondo mientras el aviso está abierto
    document.body.style.overflow = 'hidden';

    // Cierre automático
    this.temporizador = setTimeout(
      () => this.cerrarAviso(),
      this.autocierreMs
    );

    // Foco en el botón de cerrar (accesibilidad)
    setTimeout(() => this.btnCerrar?.nativeElement.focus(), 60);
  }

  cerrarAviso(): void {

    if (!this.avisoVisible()) return;

    this.limpiarTemporizador();
    this.avisoVisible.set(false);

    document.body.style.overflow = '';

    // Devuelve el foco a donde estaba el usuario
    this.elementoPrevio?.focus?.();
    this.elementoPrevio = null;
  }

  private limpiarTemporizador(): void {

    if (this.temporizador) {
      clearTimeout(this.temporizador);
      this.temporizador = undefined;
    }
  }

  // ==========================
  // CERRAR CON ESC
  // ==========================

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.cerrarAviso();
  }

  // ==========================
  // LIMPIEZA
  // ==========================

  ngOnDestroy(): void {

    this.limpiarTemporizador();

    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

}