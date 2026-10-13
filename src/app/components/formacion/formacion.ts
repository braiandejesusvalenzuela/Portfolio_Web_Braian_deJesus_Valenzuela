import { Component } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-formacion',
  imports: [],
  templateUrl: './formacion.html',
  styleUrl: './formacion.css',
})
export class Formacion {
  constructor(public languageService: LanguageService) {}

get textos() {
  return this.languageService.t('formacion');
}
}
