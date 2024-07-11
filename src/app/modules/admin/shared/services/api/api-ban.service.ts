import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseComponent} from "../../../../../base.component";
import {AnguilleSignalService} from "../../../../../shared/services/anguille-signal.service";

@Injectable({
  providedIn: 'root'
})
export class ApiBanService extends BaseComponent {

  private http = inject(HttpClient);
  private anguilleSignal = inject(AnguilleSignalService);
  private addressRequest : string = 'https://api-adresse.data.gouv.fr/search/?q=';
  public isDropdownBanOpen : boolean = false;
  public addressList!: any;

  toggleDropdown(boolean : boolean): void {
    this.isDropdownBanOpen = boolean
  }

  searchAddress(event: KeyboardEvent): void {
    const INPUT_ELEMENT: HTMLInputElement = event.target as HTMLInputElement;
    if (INPUT_ELEMENT.value.length > 3) {
      this.subscriptions.push(
        this.getAddress(INPUT_ELEMENT.value).subscribe({
          next: (address): void => this.addressList = address.features,
          error: (err): void => this.anguilleSignal.changeMessage(err.error.message)
        })
      )
    }
  }

  getAddress(address: string): Observable<any> {
    return this.http.get<any>(`${this.addressRequest}${address}&limit=4`);
  }
}


