import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-manage-publications',
  template: `
              <app-return-admin-home/>
              <h2>Gestion des Publications</h2>
              <app-post-publication/>
              <app-edit-delete-publication/>
  `,
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManagePublicationsComponent {

}
