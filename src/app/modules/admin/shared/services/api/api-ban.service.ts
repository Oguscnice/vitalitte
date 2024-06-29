import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBanService {

  private http = inject(HttpClient);

  private addressRequest : string = 'https://api-adresse.data.gouv.fr/search/?q=';
  public isDropdownBanOpen : boolean = false;
  public addressList!: any;

  toggleDropdown(boolean : boolean): void {
    this.isDropdownBanOpen = boolean
  }

  getAddress(address: string): Observable<any> {
    return this.http.get<any>(`${this.addressRequest}${address}&limit=4`);
  }
}


