import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  standalone: false,
  selector: 'app-page404',
  template: `
    <app-h1 [titleChild]="'Erreur de direction'"
            [backgroundImageChild]="'../assets/images/notebook/book-dream.jpg'"/>
    <h2>Vous êtes perdu(e) ?</h2>
    <button class="btn-normal" [routerLink]="'/'">Retour page d'accueil</button>
  `,
  styles: [` @import "../../scss/buttons.scss"; `]
})

export class Page404Component extends BaseComponent{

}
