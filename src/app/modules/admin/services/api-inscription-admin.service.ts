import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { InscriptionDto } from '../interfaces/Inscription';
import { URLAPI } from 'src/app/shared/variables/Others';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { ResponseEntity } from 'src/app/shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiInscriptionAdminService {

  private http = inject(HttpClient);

  getAll(): Observable<InscriptionDto[]>{
    return this.http.get<InscriptionDto[]>(URLAPI + "/inscriptions")
  }

  getInscriptionsByWorkshop(workshopSlug : WorkshopDto['slug']): Observable<InscriptionDto[]>{
    return this.http.get<InscriptionDto[]>(URLAPI + "/inscriptions/workshop/" + workshopSlug)
  }

  getBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<InscriptionDto>{
    return this.http.get<InscriptionDto>(URLAPI + "/inscriptions/" + inscriptionSlug)
  }

  deleteBySlug(inscriptionSlug : InscriptionDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/inscriptions/" + inscriptionSlug)
  }

}
