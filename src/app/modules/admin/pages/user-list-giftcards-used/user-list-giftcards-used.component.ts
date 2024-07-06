import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';
import { ApiGiftcardUsedService } from '../../shared/services/api/api-giftcard-used.service';
import { BaseComponent } from 'src/app/base.component';
import { GiftCardUsedDto } from '../../shared/interfaces/GiftCardUsed';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ApiGiftcardService } from '../../shared/services/api/api-giftcard.service';

@Component({
  standalone: true,
  imports: [ NgClass, DatePipe ],
  selector: 'app-user-list-giftcards-used',
  templateUrl: './user-list-giftcards-used.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class UserListGiftcardsUsedComponent extends BaseComponent {

  private route = inject(ActivatedRoute);
  private apiGiftcardUsedService = inject(ApiGiftcardUsedService);
  private apiGiftcardService = inject(ApiGiftcardService);

  giftcardCode! : GiftCardDto['code'];
  giftcard! : GiftCardDto;
  users! : GiftCardUsedDto[];
  usersToDisplay! : GiftCardUsedDto[];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.giftcardCode = params['giftcardCode'];
      this.getUsersGiftcardUsed(this.giftcardCode);
      this.getGiftcardByCode(this.giftcardCode);
    });
  }

  getUsersGiftcardUsed(code : GiftCardDto['code']): void {
    this.subscriptions.push(
      this.apiGiftcardUsedService.getUsersByGiftcardCode(code).subscribe({
        next: (users) => {
          this.users = users;
          this.usersToDisplay = users;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getGiftcardByCode(code : GiftCardDto['code']): void {
    this.subscriptions.push(
      this.apiGiftcardService.getByCode(code).subscribe({
        next: (giftcard) => this.giftcard = giftcard,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  searchValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();

    if (inputElement.value) {
     this.usersToDisplay = this.users.filter(user =>
        user.firstname.toLowerCase().includes(filterValue) ||
        user.lastname.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue) ||
        user.phone.toLowerCase().includes(filterValue) ||
        user.createdAt.toString().toLowerCase().includes(filterValue)
      )
    } else {
      this.usersToDisplay = this.users;
    }
  }
}
