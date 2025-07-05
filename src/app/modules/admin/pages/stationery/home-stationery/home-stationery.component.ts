import {Component, inject, OnInit} from '@angular/core';
import {Menu} from "../../../../../shared/interfaces/Menu";
import {NAVBAR_ADMIN_STATIONERY} from "../../../shared/variables/Navbar";
import {RouterLink} from "@angular/router";
import {ReturnAdminHomeComponent} from "../../../components/return-admin-home/return-admin-home.component";
import {toTitleCase} from "../../../../../shared/function/string-to-title-case";
import {AdminDataSignalService} from "../../../shared/services/admin-data-signal.service";
import {BaseComponent} from "../../../../../base.component";

@Component({
  selector: 'app-home-stationery',

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
    @use "../../../scss/admin-button.scss";
    @use "../../../../../scss/variables.scss" as variablesScss;

    h1 {
      color: variablesScss.$lilac-dark;
      margin-top: variablesScss.$normal-margin;
    }

    h2 {
      max-width: var(--max-width);
    }

    .btns-admin-home {
      gap: 24px;
    }
  `]
})
export class HomeStationeryComponent extends BaseComponent implements OnInit {

  private adminDataSignal = inject(AdminDataSignalService);
  navbarAdminStationery : Menu[] = NAVBAR_ADMIN_STATIONERY

  ngOnInit(): void {
    this.createMenu();
  }

  private createMenu(): void {
    this.subscriptions.push(
      this.adminDataSignal.getProductTypes().subscribe({
        next: (productTypes) => {
          for (const PRODUCT_TYPE of productTypes) {
            const PRODUCT_TYPE_NAME = toTitleCase(PRODUCT_TYPE.replace('_', ' '));
            if (!this.navbarAdminStationery.some(item => item.name === PRODUCT_TYPE_NAME)) {
              const NEW_ITEM = {
                name: PRODUCT_TYPE_NAME,
                routerLink: "/admin/gestion/" + PRODUCT_TYPE.replace('_', '-').toLowerCase(),
                submenu: null
              };
              this.navbarAdminStationery.push(NEW_ITEM);
            }
          }
        },
        error: (err) => console.error(err)
      })
    );
  }
}
