import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateDeliveryOption} from "../../interfaces/DeliveryOption";
import {Observable} from "rxjs";
import {ResponseEntity} from "../../../../../shared/interfaces/ResponseEntity";
import {URLAPI} from "../../../../../shared/variables/Others";
import {DeliveryOptionDto} from "../../../../../shared/interfaces/DeliveryOptionDto";

@Injectable({
  providedIn: 'root'
})
export class ApiDeliveryOptionAdminService {

  private http = inject(HttpClient)

  post(newDeliveryOption: CreateDeliveryOption): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(URLAPI + "/delivery-option", newDeliveryOption)
  }

  getAll(): Observable<DeliveryOptionDto[]> {
    return this.http.get<DeliveryOptionDto[]>(URLAPI + "/delivery-option")
  }

  changeAvailability(deliveryOption : DeliveryOptionDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/delivery-option/change-availability", deliveryOption)
  }

  changeExpress(deliveryOption : DeliveryOptionDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/delivery-option/change-express", deliveryOption)
  }

  put(deliveryOptionUpdated: DeliveryOptionDto): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(URLAPI + "/delivery-option", deliveryOptionUpdated)
  }

  delete(deliveryOptionToDelete: DeliveryOptionDto): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/delivery-option/" + deliveryOptionToDelete.slug)
  }
}
