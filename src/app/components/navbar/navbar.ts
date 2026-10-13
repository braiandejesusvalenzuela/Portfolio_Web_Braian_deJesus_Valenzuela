import { AfterViewInit, Component, HostListener, OnInit, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit, AfterViewInit {

  isScrolled = false;

  menuOpen = false;

  languageOpen = false;

  themeOpen = false;

  navigationOpen = false;

  isDark = false;

  // Última posición de scroll (para ignorar movimientos mínimos)
  private lastScrollY = 0;


  constructor(
    private themeService: ThemeService,
    public languageService: LanguageService,
    private titleService: Title
  ) {

    // Título de la pestaña según el idioma (se actualiza solo al cambiar)
    effect(() => {

      const lang = this.languageService.currentLanguage();

      this.titleService.setTitle(
        lang === 'es'
          ? 'Braian D. Valenzuela | Porfolio'
          : 'Braian D. Valenzuela | Portfolio'
      );

    });

  }


  ngOnInit() {

    // Por si la página se carga (o se recarga) ya scrolleada
    if (typeof window !== 'undefined') {
      this.lastScrollY = window.scrollY;
    }

    this.updateScrollState();

  }


  ngAfterViewInit() {

    // Ilumina la sección activa apenas se dibuja el navbar
    this.updateActiveSection();

  }


  // ==========================
  // TEMA
  // ==========================

  toggleThemeMenu() {

    this.themeOpen = !this.themeOpen;

    this.languageOpen = false;

    this.navigationOpen = false;

  }


  changeTheme(theme: 'light' | 'dark') {

    this.themeService.setTheme(theme);

    this.themeOpen = false;

  }


  // ==========================
  // IDIOMA
  // ==========================

  toggleLanguage() {

    this.languageOpen = !this.languageOpen;

    this.themeOpen = false;

    this.navigationOpen = false;

  }


  changeLanguage(lang: 'es' | 'en') {

    this.languageService.setLanguage(lang);

    this.languageOpen = false;

  }


  // ==========================
  // MENÚ HAMBURGUESA
  // ==========================

  toggleNavigation() {

    this.navigationOpen = !this.navigationOpen;

    this.languageOpen = false;

    this.themeOpen = false;

  }


  closeNavigation() {

    this.navigationOpen = false;

  }


  private closeAllMenus() {

    this.navigationOpen = false;

    this.languageOpen = false;

    this.themeOpen = false;

  }


  // ==========================
  // SCROLL
  // - Navbar más sólido
  // - Cierra hamburguesa, idioma y tema
  // - Ilumina la sección activa
  // ==========================

  @HostListener('window:scroll')
  onWindowScroll() {

    if (typeof window === 'undefined') {
      return;
    }

    const y = window.scrollY;

    // Ignora movimientos mínimos (por ejemplo, cuando el navegador
    // del celular oculta o muestra su barra de direcciones)
    if (Math.abs(y - this.lastScrollY) > 4) {
      this.closeAllMenus();
    }

    this.lastScrollY = y;

    this.updateScrollState();

  }


  // Gesto de scroll con el dedo o la rueda del mouse
  // (también cierra los menús si la página no se mueve)
  @HostListener('window:wheel')
  onWheel() {

    this.closeAllMenus();

  }


  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {

    const target = event.target as Element | null;

    // Si el dedo se mueve dentro del propio menú, no se cierra
    if (target && target.closest && target.closest('.navigation-dropdown')) {
      return;
    }

    this.closeAllMenus();

  }


  private updateScrollState() {

    if (typeof window === 'undefined') {
      return;
    }

    this.isScrolled = window.scrollY > 24;

    this.updateActiveSection();

  }


  // ==========================
  // ILUMINAR EL LINK DE LA SECCIÓN VISIBLE
  // ==========================

  private updateActiveSection() {

    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.navigation-dropdown a[href^="#"]')
    );

    if (!links.length) {
      return;
    }

    // Línea de referencia: 35% desde arriba de la pantalla
    const linea = window.innerHeight * 0.35;

    let actual = '';

    for (const link of links) {

      const id = (link.getAttribute('href') ?? '').slice(1);
      const seccion = document.getElementById(id);

      if (!seccion) continue;

      const rect = seccion.getBoundingClientRect();

      if (rect.top <= linea && rect.bottom > linea) {
        actual = id;
      }

    }

    // Al llegar al final de la página, se ilumina la última sección
    const alFinal =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    if (alFinal) {
      actual = (links[links.length - 1].getAttribute('href') ?? '').slice(1);
    }

    links.forEach(link =>
      link.classList.toggle('active', link.getAttribute('href') === '#' + actual)
    );

links.forEach(link =>
  link.classList.toggle('active', link.getAttribute('href') === '#' + actual)
);

// Marca la sección activa en <html> para poder ajustar el navbar por sección
document.documentElement.setAttribute('data-seccion', actual);

  }


  // ==========================
  // CERRAR MENÚS AL HACER CLICK FUERA DEL NAVBAR
  // ==========================

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const target = event.target as Element | null;

    if (!target || !target.closest) {
      return;
    }

    if (!target.closest('.navbar')) {
      this.closeAllMenus();
    }

  }


  // ==========================
  // CERRAR MENÚS CON ESC
  // ==========================

  @HostListener('document:keydown.escape')
  onEscape() {

    this.closeAllMenus();

  }

}