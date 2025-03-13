import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ RouterLink ],
  selector: 'app-return-admin-home',
  template: `<button routerLink="/admin" class="btn-medium-admin">Accueil Admin</button>`,
  styles: [`
    @use "../../scss/admin-button.scss";
    @use "../../../../scss/variables.scss" as variablesScss;

    button {
      margin-top: variablesScss.$half-margin;
    }
  `]
})
export class ReturnAdminHomeComponent {

}
