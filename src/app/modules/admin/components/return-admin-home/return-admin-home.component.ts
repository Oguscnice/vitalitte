import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [ RouterLink ],
  selector: 'app-return-admin-home',
  template: `<button routerLink="/admin" class="btn-medium-admin">Accueil Admin</button>`,
  styles: [`
            @import "../../scss/admin-general.scss";

            button {
              margin-top: $half-margin;
            }
          `]
})
export class ReturnAdminHomeComponent {

}
