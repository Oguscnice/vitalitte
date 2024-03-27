import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { ResponseEntity } from 'src/app/shared/interfaces/ResponseEntity';
import { URLAPI } from 'src/app/shared/variables/Others';
import { CreateMaterial } from '../interfaces/Material';

@Injectable({
  providedIn: 'root'
})
export class ApiMaterialAdminService {

  constructor(private http: HttpClient) {}

  getBySlug(materialSlug : MaterialDto['slug']): Observable<MaterialDto>{
    return this.http.get<MaterialDto>(URLAPI + "/materials/" + materialSlug)
  }

  post(material : CreateMaterial): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/materials", material)
  }

  put(material : MaterialDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/materials/" + material.slug, material)
  }
  
  delete(materialSlug : MaterialDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/materials/" + materialSlug)
  }
}
