import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateGiftCard } from '../../interfaces/GiftCard';
import { Observable } from 'rxjs';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { URLAPI } from '../../../../../shared/variables/Others';
import { GiftCardDto } from '../../../../../shared/interfaces/GiftCard';

@Injectable({
  providedIn: 'root'
})
export class ApiGiftcardService {

  private http = inject(HttpClient);

  post(giftCard : CreateGiftCard): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/giftCards", giftCard)
  }

  getAll(): Observable<GiftCardDto[]>{
    return this.http.get<GiftCardDto[]>(URLAPI + "/giftCards")
  }

  getByCode(code : string): Observable<GiftCardDto>{
    return this.http.get<GiftCardDto>(URLAPI + "/giftCards/" + code)
  }

  delete(giftCardSlug : GiftCardDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/giftCards/" + giftCardSlug)
  }

}
