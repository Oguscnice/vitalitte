import { GiftCardDto } from './../../../../shared/interfaces/GiftCard';
import { BaseComponent } from 'src/app/base.component';
import { CreateGiftCard } from '../../interfaces/GiftCard';
import { ApiGiftcardService } from './../../services/api-giftcard.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-manage-giftcards',
  standalone: false,
  templateUrl: './manage-giftcards.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManageGiftcardsComponent extends BaseComponent {

  private apiGiftcardService = inject(ApiGiftcardService);

  private giftCardToDelete? : GiftCardDto;
  giftcards!: GiftCardDto[];

  modalVisible : boolean = false;
  modalText! : string;

  ngOnInit(): void {
    this.getAllGiftCards();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }


  getAllGiftCards(): void {
    this.subscriptions.push(
      this.apiGiftcardService.getAll().subscribe({
        next: (giftcards) => this.giftcards = giftcards,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  postGiftCard(newGiftCard : CreateGiftCard): void {
    this.subscriptions.push(
      this.apiGiftcardService.post(newGiftCard).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllGiftCards();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  showModal(giftCardToDelete : GiftCardDto): void {
    this.giftCardToDelete = giftCardToDelete;
    this.modalText = `Confirmer vouloir supprimer la Carte Cadeau : "${giftCardToDelete.code}" d'une réduction ${giftCardToDelete.percentage ? 'de '+ giftCardToDelete.rising + ' %' : "d'un montant de " + giftCardToDelete.rising + " €"} ?`
    this.modalVisible = true;
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    if(response){
      this.deleteGiftCard(this.giftCardToDelete!.code);
    }
  }

  deleteGiftCard(giftCardCodeToDelete : GiftCardDto['code']): void {

  }

}
