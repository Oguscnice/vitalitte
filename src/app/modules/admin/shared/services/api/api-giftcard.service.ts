import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateGiftCard } from '../../interfaces/CreateGiftCard';
import { Observable } from 'rxjs';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { GiftCardDto } from '../../../../../shared/interfaces/GiftCard';

@Injectable({
  providedIn: 'root'
})
export class ApiGiftcardService {

  private http = inject(HttpClient);

  post(giftCard : CreateGiftCard): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/giftCards", giftCard)
  }

  getAll(): Observable<GiftCardDto[]> {
    return this.http.get<GiftCardDto[]>(VITALITTE_PROJECT.back.url + "/giftCards")
  }

  getByCode(code : string): Observable<GiftCardDto> {
    return this.http.get<GiftCardDto>(VITALITTE_PROJECT.back.url + "/giftCards/" + code)
  }

  delete(code : GiftCardDto['code']): Observable<ResponseEntity> {
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/giftCards/" + code)
  }

}
