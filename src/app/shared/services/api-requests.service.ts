import { Injectable } from '@angular/core';
import { URLAPI } from '../variables';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  constructor(private http: HttpClient) {}
}
