import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftCardUsedDto } from '../../interfaces/GiftCardUsed';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { GiftCardDto } from '../../../../../shared/interfaces/GiftCard';

@Injectable({
  providedIn: 'root'
})
export class ApiGiftcardUsedService {

  private http = inject(HttpClient);

  getUsersByGiftcardCode(giftCardCode : GiftCardDto['code']): Observable<GiftCardUsedDto[]>{
    return this.http.get<GiftCardUsedDto[]>(VITALITTE_PROJECT.back.url + "/giftCardsUsed/giftCard/" + giftCardCode)
  }
}
