import { Component } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-proyectos',
  imports: [],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})

export class Proyectos {

  constructor(public languageService: LanguageService) {}

  get textos() {
    return this.languageService.t('proyectos');
  }

}