import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { URLAPI } from 'src/app/shared/variables/Others';
import { CreateWorkshop } from '../interfaces/Workshop';
import { ResponseEntity } from 'src/app/shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiWorkshopAdminService {

  private http = inject(HttpClient);

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
