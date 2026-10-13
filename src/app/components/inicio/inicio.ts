import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {

  // ==========================
  // MENÚ DEL CV
  // ==========================

  private _cvOpen = false;
  private scrollPrevio = 0;
  private scrolleado = false;

  // Mientras dure un scroll automático (al abrir o cerrar el menú),
  // se ignoran los eventos de scroll; si no, el menú o el visor
  // se cerrarían solos
  private ignorarScrollHasta = 0;

  get cvOpen(): boolean {
    return this._cvOpen;
  }

  // Al abrir baja el scroll; al cerrar (por cualquier vía) vuelve arriba
  set cvOpen(valor: boolean) {

    if (valor === this._cvOpen) {
      return;
    }

    this._cvOpen = valor;

    if (valor) {
      this.scrollAlAbrirCV();
    } else {
      this.scrollAlCerrarCV();
    }

  }

  // ==========================
  // VISOR DEL CV
  // ==========================

  cvVisualizacionAbierta = false;

  constructor(
    public languageService: LanguageService
  ) {}

  // ==========================
  // ABRIR / CERRAR MENÚ CV
  // ==========================

  toggleCV() {
    this.cvOpen = !this.cvOpen;
  }

  // ==========================
  // ABRIR / CERRAR VISOR DEL CV
  // ==========================

  abrirCV() {
    this.cvVisualizacionAbierta = true;
    this.cvOpen = false;
  }

  cerrarCV() {
    this.cvVisualizacionAbierta = false;
  }

  // ==========================
  // SCROLL AUTOMÁTICO DEL MENÚ CV
  // ==========================

  private scrollAlAbrirCV() {

    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    this.scrollPrevio = window.scrollY;
    this.scrolleado = false;

    const dropdown = document.querySelector('.cv-dropdown') as HTMLElement | null;

    if (!dropdown) {
      return;
    }

    // Cuánto falta para que el desplegable entre completo en pantalla
    const falta = dropdown.getBoundingClientRect().bottom + 16 - window.innerHeight;

    if (falta > 0) {
      this.scrolleado = true;
      this.ignorarScrollHasta = Date.now() + 900;
      window.scrollBy({ top: falta, behavior: 'smooth' });
    }

  }

  private scrollAlCerrarCV() {

    if (typeof window === 'undefined') {
      return;
    }

    // Solo vuelve si el menú había hecho scroll al abrirse
    if (!this.scrolleado) {
      return;
    }

    this.scrolleado = false;

    // El scroll de vuelta no debe cerrar el visor que se acaba de abrir
    this.ignorarScrollHasta = Date.now() + 900;

    window.scrollTo({ top: this.scrollPrevio, behavior: 'smooth' });

  }

  // ==========================
  // CERRAR MENÚ Y VISOR AL HACER SCROLL
  // (hacia arriba o hacia abajo)
  // ==========================

  // Scroll de la página
  @HostListener('window:scroll')
  onWindowScroll() {

    // Es un scroll automático (apertura o cierre del menú): no cerrar
    if (Date.now() < this.ignorarScrollHasta) {
      return;
    }

    this.cerrarPorScrollDelUsuario();

  }

  // Rueda del mouse
  @HostListener('window:wheel')
  onWheel() {
    this.cerrarPorScrollDelUsuario();
  }

  // Dedo en el celular
  @HostListener('window:touchmove')
  onTouchMove() {
    this.cerrarPorScrollDelUsuario();
  }

  private cerrarPorScrollDelUsuario() {

    if (this.cvOpen) {
      // Scroll del usuario: se cierra sin volver a la posición anterior
      this.scrolleado = false;
      this.cvOpen = false;
    }

    if (this.cvVisualizacionAbierta) {
      this.cvVisualizacionAbierta = false;
    }

  }

  // ==========================
  // CERRAR AL HACER CLICK
  // AFUERA DEL MENÚ / VISOR
  // ==========================

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const target = event.target as Element | null;

    if (!target || !target.closest) {
      return;
    }

    // Menú CV
    if (!target.closest('.cv-button') && !target.closest('.cv-dropdown')) {
      this.cvOpen = false;
    }

    // Visor del CV: no se cierra al hacer click en la imagen, la X o "Ver CV"
    if (
      !target.closest('.cv-imagen') &&
      !target.closest('.cv-modal-cerrar') &&
      !target.closest('.cv-opcion')
    ) {
      this.cvVisualizacionAbierta = false;
    }

  }

  // ==========================
  // CERRAR CON ESC
  // Primero el visor; si no está abierto, el menú
  // ==========================

  @HostListener('document:keydown.escape')
  onEscape() {

    if (this.cvVisualizacionAbierta) {
      this.cerrarCV();
    } else if (this.cvOpen) {
      this.cvOpen = false;
    }

  }

}