import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-manage-giftCards',
  template:  `
                <app-return-admin-home/>

                <h2>Gestion des Cartes Cadeaux</h2>

                <app-post-giftCard/>
                <app-edit-delete-giftCard/>
                `,
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManageGiftCardsComponent {
}
