import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { URLAPI } from '../variables/others';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private http: HttpClient) {}

  geAllMaterials(): Observable<MaterialDto[]>{
    return this.http.get<MaterialDto[]>(URLAPI + "/materials")
  }

  getAllMaterialsTypes(): Observable<string[]>{
    return this.http.get<string[]>(URLAPI + "/materials/types")
  }
  
}
