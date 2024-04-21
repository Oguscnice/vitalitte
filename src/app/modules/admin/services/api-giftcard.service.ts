import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateGiftCard } from '../interfaces/GiftCard';
import { Observable } from 'rxjs';
import { ResponseEntity } from 'src/app/shared/interfaces/ResponseEntity';
import { URLAPI } from 'src/app/shared/variables/Others';
import { GiftCardDto } from 'src/app/shared/interfaces/GiftCard';

@Injectable({
  providedIn: 'root'
})
export class ApiGiftcardService {

  private http = inject(HttpClient)

  post(giftCard : CreateGiftCard): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/giftCards", giftCard)
  }

  getAll(): Observable<GiftCardDto[]>{
    return this.http.get<GiftCardDto[]>(URLAPI + "/giftCards")
  }

  put(giftCard : GiftCardDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/giftCards/" + giftCard.slug, giftCard)
  }

  delete(giftCardSlug : GiftCardDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/giftCards/" + giftCardSlug)
  }

}
