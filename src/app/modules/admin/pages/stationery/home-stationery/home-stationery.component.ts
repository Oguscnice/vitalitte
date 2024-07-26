import { Component } from '@angular/core';
import {Menu} from "../../../../../shared/interfaces/Menu";
import {NAVBAR_ADMIN_STATIONERY} from "../../../shared/variables/Navbar";
import {RouterLink} from "@angular/router";
import {ReturnAdminHomeComponent} from "../../../components/return-admin-home/return-admin-home.component";

@Component({
  selector: 'app-home-stationery',
  standalone: true,
  imports: [
    RouterLink,
    ReturnAdminHomeComponent
  ],
  template: ` <app-return-admin-home/>
              <h1>Gestion de la Papeterie</h1>
              <div class="btns-admin-home flex wrap center">
                @for (item of navbarAdminStationery; track item) {
                  <div class="btn-medium-admin flex center pointer" [routerLink]="[item.routerLink]">
                    {{ item.name }}
                  </div>
                }
              </div>`,
  styles: [`
            @import "../../../scss/admin-general.scss";

            h1 {
              color: $lilac-dark;
              margin-top: $normal-margin;
            }
            h2 {
              max-width: $max-width-mobile;
            }
            .btns-admin-home {
              gap: 24px;
            }
          `]
})
export class HomeStationeryComponent {
  navbarAdminStationery : Menu[] = NAVBAR_ADMIN_STATIONERY
}
