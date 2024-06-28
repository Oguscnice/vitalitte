import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreatePublication } from '../../interfaces/Publication';
import { Observable } from 'rxjs';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { URLAPI } from '../../../../../shared/variables/Others';
import { PublicationDto } from '../../../../../shared/interfaces/Publication';

@Injectable({
  providedIn: 'root'
})
export class ApiPublicationAdminService {

  private http = inject(HttpClient);

  post(publication : CreatePublication): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/publications", publication)
  }

  put(publication : PublicationDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/publications/" + publication.slug, publication)
  }

  changeSpotlighted(publication : PublicationDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/publications/spotlighted", publication)
  }

  delete(publicationSlug : PublicationDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/publications/" + publicationSlug)
  }
}
