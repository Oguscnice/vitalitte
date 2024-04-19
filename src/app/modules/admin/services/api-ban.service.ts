import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBanService {

  private http = inject(HttpClient);

  private adressRequest : string = 'https://api-adresse.data.gouv.fr/search/?q=';
  public isDropdownBanOpen : boolean = false;
  public adressList!: any;

  toggleDropdown(boolean : boolean): void {
    this.isDropdownBanOpen = boolean
  }

  getAdress(adress: string): Observable<any> {
    return this.http.get<any>(`${this.adressRequest}${adress}&limit=4`);
  }
}


