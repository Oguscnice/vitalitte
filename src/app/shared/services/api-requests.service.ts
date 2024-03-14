import { Injectable } from '@angular/core';
// import { URLAPI } from '../variables/navbar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MaterialDto } from '../interfaces/Material';
import { URLAPI } from '../variables/others';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private http: HttpClient) {}

  getAllMaterialsAvailable(): Observable<MaterialDto[]>{
    return this.http.get<MaterialDto[]>(URLAPI + "/materials/available")
  }
  
}
