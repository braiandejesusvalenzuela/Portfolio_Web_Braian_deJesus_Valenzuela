import { Component } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-experiencia',
  imports: [],
  templateUrl: './experiencia.html',
  styleUrl: './experiencia.css',
})
export class Experiencia {

  constructor(public languageService: LanguageService) {}

  get textos() {
    return this.languageService.t('experiencia');
  }

}

