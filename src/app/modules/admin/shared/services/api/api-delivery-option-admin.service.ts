import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateDeliveryOption} from "../../interfaces/CreateDeliveryOption";
import {Observable} from "rxjs";
import {ResponseEntity} from "../../../../../shared/interfaces/ResponseEntity";
import { VITALITTE_PROJECT } from "../../../../../shared/variables/AppConfig";
import {DeliveryOptionDto} from "../../../../../shared/interfaces/DeliveryOptionDto";

@Injectable({
  providedIn: 'root'
})
export class ApiDeliveryOptionAdminService {

  private http = inject(HttpClient)

  post(newDeliveryOption: CreateDeliveryOption): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/delivery-option", newDeliveryOption)
  }

  getAll(): Observable<DeliveryOptionDto[]> {
    return this.http.get<DeliveryOptionDto[]>(VITALITTE_PROJECT.back.url + "/delivery-option")
  }

  changeAvailability(deliveryOption : DeliveryOptionDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/delivery-option/change-availability", deliveryOption)
  }

  changeExpress(deliveryOption : DeliveryOptionDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/delivery-option/change-express", deliveryOption)
  }

  put(deliveryOptionUpdated: DeliveryOptionDto): Observable<ResponseEntity> {
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/delivery-option", deliveryOptionUpdated)
  }

  delete(deliveryOptionToDelete: DeliveryOptionDto): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/delivery-option/" + deliveryOptionToDelete.slug)
  }
}
