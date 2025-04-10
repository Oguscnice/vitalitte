import {Component} from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { NAVBAR_ADMIN } from '../../shared/variables/Navbar';

@Component({
  standalone: false,
  selector: 'app-admin-home',
  template: ` <h1>Accueil Admin</h1>
              <h2>Votre tableau de bord pour la gestion</h2>
              <div class="btns-admin-home flex wrap center">
                @for (item of navbarAdmin; track item) {
                  <div class="btn-medium-admin flex center pointer" [routerLink]="[item.routerLink]">
                    {{ item.name }}
                  </div>
                }
              </div>`,
  styles: [`
            @use "../../scss/admin-button.scss";
            @use "../../../../scss/variables.scss" as variablesScss;

            // .admin-home-page{
              h1 {
                color: variablesScss.$lilac-dark;
                margin-top: variablesScss.$normal-margin;
              }
              h2 {
                max-width: 80vw;
              }
              .btns-admin-home {
                gap: 24px;
              // }
            }
          `]
})
export class AdminHomeComponent {

  navbarAdmin : Menu[] = NAVBAR_ADMIN
}
