import { Component, HostListener } from '@angular/core';

import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-certificaciones',
  imports: [],
  templateUrl: './certificaciones.html',
  styleUrl: './certificaciones.css',
})

export class Certificaciones {

  certificadoAbierto = false;

  constructor(public languageService: LanguageService) {}

  get textos() {
    return this.languageService.t('certificaciones');
  }

  abrirCertificado(): void {
    this.certificadoAbierto = true;
  }

  cerrarCertificado(): void {
    this.certificadoAbierto = false;
  }

  // ==========================
  // CERRAR CERTIFICADO CON ESC
  // ==========================

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.certificadoAbierto) {
      this.cerrarCertificado();
    }

  }

}