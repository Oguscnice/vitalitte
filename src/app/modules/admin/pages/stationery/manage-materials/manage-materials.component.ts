import {Component} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-manage-materials',
  template: `
              <app-return-admin-home/>
              <h2>Gestion des Matériaux</h2>
              <app-post-material/>
              <app-edit-delete-material/>
              `,
  styles: [` @import "../../../scss/admin-general"; `]
})
export class ManageMaterialsComponent {
}
