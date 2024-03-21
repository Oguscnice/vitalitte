import { Component } from '@angular/core';

@Component({
  selector: 'app-return-admin-home',
  template: `<button routerLink="/admin" class="btn-direction">Accueil Admin</button>`,
  styles: [`
            @import "../../scss/admin-general.scss";

            button{
              margin-top: $half-margin;
            }

            // Breackpoint list
            // Mobiles vers Tablettes :
            @media screen and (min-width: 768px) {
            }
            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
            }
            // Ordinateurs portables vers ordinateurs de bureau :
            @media screen and (min-width: 1235px) {
            }
          `]
})
export class ReturnAdminHomeComponent {

}
