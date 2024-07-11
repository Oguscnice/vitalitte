import { Injectable } from '@angular/core';
import {NotebookDto} from "../interfaces/Notebook";
import {InscriptionDto} from "../interfaces/Inscription";

@Injectable({
  providedIn: 'root'
})
export class ObjectUtilsService {

  compareNotebook(object1: NotebookDto, object2: NotebookDto): boolean {
    return object1.price === object2.price;
  }

  compareInscription(object1: InscriptionDto, object2: InscriptionDto): boolean {
    return object1.workshopDto.price === object2.workshopDto.price;
  }
}
