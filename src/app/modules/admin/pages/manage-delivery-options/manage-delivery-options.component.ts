import { Component } from '@angular/core';
import {
  PostDeliveryOptionComponent
} from "../../components/delivery-option/post-delivery-option/post-delivery-option.component";
import {
  EditDeleteDeliveryOptionComponent
} from "../../components/delivery-option/edit-delete-delivery-option/edit-delete-delivery-option.component";
import {ReturnAdminHomeComponent} from "../../components/return-admin-home/return-admin-home.component";

@Component({
  selector: 'app-manage-delivery-options',
  standalone: true,
  imports: [PostDeliveryOptionComponent, EditDeleteDeliveryOptionComponent, ReturnAdminHomeComponent],
  template: `
    <app-return-admin-home/>
    <h2>Gestion des Options de Livraison</h2>
    <app-post-delivery-option/>
    <app-edit-delete-delivery-option/>
  `,
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManageDeliveryOptionsComponent {

}
