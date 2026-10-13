import { Component } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-tecnologias',
  imports: [],
  templateUrl: './tecnologias.html',
  styleUrl: './tecnologias.css',
})

export class Tecnologias {

  constructor(public languageService: LanguageService) {}

  get textos() {
    return this.languageService.t('tecnologias');
  }

}