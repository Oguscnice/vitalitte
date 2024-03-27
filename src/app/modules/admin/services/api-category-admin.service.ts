import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { ResponseEntity } from 'src/app/shared/interfaces/ResponseEntity';
import { URLAPI } from 'src/app/shared/variables/Others';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryAdminService {

  constructor(private http: HttpClient) {}

  post(categoryName : CategoryDto['name']): Observable<ResponseEntity>{
    return this.http.post<ResponseEntity>(URLAPI + "/categories", categoryName)
  }

  put(category : CategoryDto): Observable<ResponseEntity>{
    return this.http.put<ResponseEntity>(URLAPI + "/categories/" + category.slug, category)
  }
  
  delete(categorySlug : CategoryDto['slug']): Observable<ResponseEntity>{
    return this.http.delete<ResponseEntity>(URLAPI + "/categories/" + categorySlug)
  }
}
