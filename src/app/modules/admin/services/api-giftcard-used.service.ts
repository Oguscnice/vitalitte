import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftCardUsedDto } from '../interfaces/GiftCardUsed';
import { URLAPI } from 'src/app/shared/variables/Others';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';

@Injectable({
  providedIn: 'root'
})
export class ApiGiftcardUsedService {

  private http = inject(HttpClient);

  getUsersByGiftcardCode(giftCardCode : GiftCardDto['code']): Observable<GiftCardUsedDto[]>{
    return this.http.get<GiftCardUsedDto[]>(URLAPI + "/giftCardsUsed/giftCard/" + giftCardCode)
  }
}
