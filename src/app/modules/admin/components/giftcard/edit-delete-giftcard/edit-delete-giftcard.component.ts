import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import {Component, inject, OnInit, Signal} from '@angular/core';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';
import {AdminGiftCardSignalService} from "../../../shared/services/admin-giftcard-signal.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-delete-giftCard',

  imports: [NgClass, DatePipe, DecimalPipe, ReactiveFormsModule],
  templateUrl: 'edit-delete-giftCard.component.html',
  styles: [`
    @use "../../../scss/admin-general.scss";
    @use "../../../scss/admin-table.scss";
    @use "../../../scss/admin-button.scss";
    @use "../../../scss/admin-toggle.scss";
    @use "../../../../../scss/forms.scss";
    @use "../../../../../scss/dropdowns.scss";
    @use "../../../../../scss/buttons.scss";

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
