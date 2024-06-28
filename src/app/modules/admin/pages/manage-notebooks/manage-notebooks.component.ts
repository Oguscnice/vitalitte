import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-manage-notebooks',
  template: `
              <app-return-admin-home/>
              <h2>Gestion des Carnets</h2>
              <app-post-notebook/>
              <app-edit-delete-notebook/>
            `,
  styles: [``]
})
export class ManageNotebooksComponent {
}
