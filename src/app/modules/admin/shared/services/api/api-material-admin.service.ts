import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MaterialDto } from '../../../../../shared/interfaces/Material';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { CreateMaterial } from '../../interfaces/Material';
import {PaginationWithSearchValue} from "../../../../../shared/interfaces/Pagination";

@Injectable({
  providedIn: 'root'
})
export class ApiMaterialAdminService {

  private http = inject(HttpClient)

  getBySlug(materialSlug : MaterialDto['slug']): Observable<MaterialDto>{
    return this.http.get<MaterialDto>(VITALITTE_PROJECT.back.url + "/materials/" + materialSlug)
  }

  getCounterMaterialsBySearchValue(paginationWithSearchValue: PaginationWithSearchValue): Observable<number>{
    return this.http.post<number>(VITALITTE_PROJECT.back.url + "/materials/counter", paginationWithSearchValue)
  }

  getMaterialsPaginatedBySearchValue(paginationWithSearchValue: PaginationWithSearchValue): Observable<MaterialDto[]>{
    return this.http.post<MaterialDto[]>(VITALITTE_PROJECT.back.url + "/materials/paginated", paginationWithSearchValue)
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
