import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionDto } from '../../../../../shared/interfaces/Collection';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { URLAPI } from '../../../../../shared/variables/Others';

@Injectable({
  providedIn: 'root'
})
export class ApiCollectionAdminService {

  private http = inject(HttpClient)

  post(collectionName : CollectionDto['name']): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/collections", collectionName)
  }

  put(collection : CollectionDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/collections/" + collection.slug, collection)
  }

  delete(collectionSlug : CollectionDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/collections/" + collectionSlug)
  }
}
