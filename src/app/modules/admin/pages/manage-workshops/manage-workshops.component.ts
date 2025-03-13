import { ApiWorkshopAdminService } from '../../shared/services/api/api-workshop-admin.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { CreateWorkshop } from '../../shared/interfaces/Workshop';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import {AdminWorkshopSignalService} from "../../shared/services/admin-workshop-signal.service";

@Component({
  selector: 'app-manage-workshops',
  standalone: false,
  template: `
              <app-return-admin-home/>
              <h2>Gestion des Ateliers</h2>
              <app-post-workshop/>
              <app-edit-delete-workshop/>
              `,
  styles: [` @use "../../scss/admin-general.scss"; `]
})
export class ManageWorkshopsComponent extends BaseComponent {
}
