import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.html',
  styleUrl: './logo.css'
})
export class LogoComponent {

  isClicked = false;

  activateLogo() {

    this.isClicked = true;

    setTimeout(() => {

      document.getElementById('inicio')?.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

      });

    }, 180);

    setTimeout(() => {

      this.isClicked = false;

    }, 450);

  }

}