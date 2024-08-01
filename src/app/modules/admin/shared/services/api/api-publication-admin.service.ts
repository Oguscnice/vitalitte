import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreatePublication } from '../../interfaces/CreatePublication';
import { Observable } from 'rxjs';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { PublicationDto } from '../../../../../shared/interfaces/Publication';

@Injectable({
  providedIn: 'root'
})
export class ApiPublicationAdminService {

  private http = inject(HttpClient);

  post(publication : CreatePublication): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/publications", publication)
  }

  put(publication : PublicationDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/publications/" + publication.slug, publication)
  }

  changeSpotlighted(publication : PublicationDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/publications/spotlighted", publication)
  }

  delete(publicationSlug : PublicationDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/publications/" + publicationSlug)
  }
}
