import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../../../../../shared/interfaces/Product';
import { VITALITTE_PROJECT } from '../../../../../shared/variables/AppConfig';
import { CreateProduct } from '../../interfaces/CreateProduct';
import { ResponseEntity } from '../../../../../shared/interfaces/ResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class ApiProductAdminService {

  private http = inject(HttpClient);

  getAll(): Observable<ProductDto[]>{
    return this.http.get<ProductDto[]>(VITALITTE_PROJECT.back.url + "/products")
  }

  post(product : CreateProduct): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(VITALITTE_PROJECT.back.url + "/products", product)
  }

  put(productDto : ProductDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/products", productDto)
  }

  changeAvailability(productDto : ProductDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(VITALITTE_PROJECT.back.url + "/products/availability", productDto)
  }

  delete(productSlug : ProductDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(VITALITTE_PROJECT.back.url + "/products/" + productSlug)
  }
}
