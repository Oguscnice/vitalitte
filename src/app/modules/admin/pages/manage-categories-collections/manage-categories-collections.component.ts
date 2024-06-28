import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-manage-categories-collections',
  template: `
              <app-return-admin-home/>

              <h2>Gestion des Catégories et des Collections</h2>
              <div class="flex space-between">
                <app-manage-categories/>
                <app-manage-collections/>
              </div>
              `,
    styles: [`
      div {
        flex-direction: column;
        width: 100%;
      }

      // Breackpoint list
      // Mobiles vers Tablettes :
      @media screen and (min-width: 768px) {
        div {
          flex-direction: row;
        }
      }
    `]
})
export class ManageCategoriesCollectionsComponent {
}
