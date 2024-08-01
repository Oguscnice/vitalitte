import { Injectable } from '@angular/core';
import {ProductDto} from "../interfaces/Product";
import {InscriptionDto} from "../interfaces/Inscription";

@Injectable({
  providedIn: 'root'
})
export class ObjectUtilsService {

  compareProduct(object1: ProductDto, object2: ProductDto): boolean {
    return object1.price === object2.price;
  }

  compareInscription(object1: InscriptionDto, object2: InscriptionDto): boolean {
    return object1.workshopDto.price === object2.workshopDto.price;
  }
}
