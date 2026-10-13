import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme: Theme = 'dark';


  constructor(){

    const savedTheme = localStorage.getItem('theme') as Theme;

    if(savedTheme){

      this.setTheme(savedTheme);

    }else{

      this.setTheme('dark');

    }

  }


  setTheme(theme: Theme){

    this.currentTheme = theme;

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );


    localStorage.setItem(
      'theme',
      theme
    );

  }


  getTheme(){

    return this.currentTheme;

  }

}