import { Component } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { NAVBAR_ADMIN } from '../../variables/Navbar';

@Component({
  selector: 'app-admin-home',
  template: ` <div class="admin-home-page flex column space-around">
              <h1>Acceuil Admin</h1>
              <h2>Votre tableau de bord pour la gestion</h2>
              <div class="btns-admin-home flex wrap center">
                <div class="btn-direction flex center pointer"
                    *ngFor="let item of navbarAdmin" [routerLink]="[item.routerLink]">
                  {{ item.name }}
                </div>
              </div>
            </div>`,
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  navbarAdmin : Menu[] = NAVBAR_ADMIN
}
