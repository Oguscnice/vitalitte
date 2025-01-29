import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import {Component, inject, OnInit, Signal} from '@angular/core';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';
import {AdminGiftCardSignalService} from "../../../shared/services/admin-giftcard-signal.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-delete-giftCard',
  standalone: true,
  imports: [NgClass, DatePipe, DecimalPipe, ReactiveFormsModule],
  templateUrl: 'edit-delete-giftCard.component.html',
  styles: [`
    @import "../../../scss/admin-general.scss";

    .toggle-switch {
      .toggle-label {
        cursor: not-allowed;
      }
    }
  `]
})
export class EditDeleteGiftCardComponent implements OnInit {

  private adminGiftCardsSignal = inject(AdminGiftCardSignalService);

  giftCards: Signal<GiftCardDto[]> = this.adminGiftCardsSignal.$giftCards;

  isTableVisible: boolean = true;

  ngOnInit(): void {
    this.adminGiftCardsSignal.getAllGiftCards();
  }

  delete = (giftCard : GiftCardDto) => this.adminGiftCardsSignal.confirmationModalForDeleteGiftCard(giftCard);
}
