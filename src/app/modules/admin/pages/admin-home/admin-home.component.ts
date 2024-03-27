import { Component } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { NAVBAR_ADMIN } from '../../variables/Navbar';

@Component({
  selector: 'app-admin-home',
  template: ` <h1>Acceuil Admin</h1>
              <h2>Votre tableau de bord pour la gestion</h2>
              <div class="btns-admin-home flex wrap center">
                <div class="btn-medium-admin flex center pointer"
                    *ngFor="let item of navbarAdmin" [routerLink]="[item.routerLink]">
                  {{ item.name }}
                </div>
              </div>`,
  styles: [`
            @import "../../scss/admin-general.scss";

            // .admin-home-page{
              h1 {
                color: $lilac-dark;
                margin-top: $normal-margin;
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
