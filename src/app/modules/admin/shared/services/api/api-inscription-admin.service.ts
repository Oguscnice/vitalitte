import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InscriptionDto } from '../../interfaces/Inscription';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { WorkshopDto } from '../../../../../shared/interfaces/Workshop';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiInscriptionAdminService {

  private http = inject(HttpClient);

  getAll(): Observable<InscriptionDto[]>{
    return this.http.get<InscriptionDto[]>(VITALITTE_PROJECT.back.url + "/inscriptions")
  }

  getInscriptionsByWorkshop(workshopSlug : WorkshopDto['slug']): Observable<InscriptionDto[]>{
    return this.http.get<InscriptionDto[]>(VITALITTE_PROJECT.back.url + "/inscriptions/workshop/" + workshopSlug)
  }

  getBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<InscriptionDto>{
    return this.http.get<InscriptionDto>(VITALITTE_PROJECT.back.url + "/inscriptions/" + inscriptionSlug)
  }

}
