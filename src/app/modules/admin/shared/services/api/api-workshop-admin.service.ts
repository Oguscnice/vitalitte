import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkshopDto } from '../../../../../shared/interfaces/Workshop';
import { URLAPI } from '../../../../../shared/variables/Others';
import { CreateWorkshop } from '../../interfaces/Workshop';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkshopAdminService {

  private http = inject(HttpClient);

  getAllWorkshops(): Observable<WorkshopDto[]> {
    return this.http.get<WorkshopDto[]>(URLAPI + "/workshops")
  }

  post(workshop : CreateWorkshop): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/workshops", workshop)
  }

  put(workshop : WorkshopDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/workshops/" + workshop.slug, workshop)
  }

  changeAvailability(workshop : WorkshopDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/workshops/availability", workshop)
  }

  delete(workshopSlug : WorkshopDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/workshops/" + workshopSlug)
  }

}
