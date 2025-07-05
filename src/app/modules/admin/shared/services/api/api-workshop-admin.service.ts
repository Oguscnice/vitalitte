import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkshopDto } from '../../../../../shared/interfaces/Workshop';
import { UTAIDA_PROJECT } from '../../../../../shared/variables/AppConfig';
import { CreateWorkshop } from '../../interfaces/Workshop';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkshopAdminService {

  private http = inject(HttpClient);

  getAllWorkshops(): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(UTAIDA_PROJECT.back.url + "/workshops")
  }

  post(workshop : CreateWorkshop): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(UTAIDA_PROJECT.back.url + "/workshops", workshop)
  }

  put(workshop : WorkshopDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(UTAIDA_PROJECT.back.url + "/workshops/" + workshop.slug, workshop)
  }

  changeAvailability(workshop : WorkshopDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(UTAIDA_PROJECT.back.url + "/workshops/availability", workshop)
  }

  delete(workshopSlug : WorkshopDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(UTAIDA_PROJECT.back.url + "/workshops/" + workshopSlug)
  }

}
