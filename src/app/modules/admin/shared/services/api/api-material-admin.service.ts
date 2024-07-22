import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialDto } from '../../../../../shared/interfaces/Material';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { CreateMaterial } from '../../interfaces/Material';
import {Page, PaginationWithSearchValue} from "../../../../../shared/interfaces/Page";

@Injectable({
  providedIn: 'root'
})
export class ApiMaterialAdminService {

  private http = inject(HttpClient)

  getMaterialsPaginatedBySearchValue(paginationWithSearchValue: PaginationWithSearchValue): Observable<Page<MaterialDto>>{
    return this.http.post<Page<MaterialDto>>(VITALITTE_PROJECT.back.url + "/materials/paginated", paginationWithSearchValue)
  }

  post(material : CreateMaterial): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/materials", material)
  }

  put(material : MaterialDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/materials/" + material.slug, material)
  }

  changeAvailability(material : MaterialDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/materials/availability", material)
  }

  changeAvailabilityForCustomization(material : MaterialDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/materials/availability-for-customization", material)
  }

  delete(materialSlug : MaterialDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/materials/" + materialSlug)
  }
}
