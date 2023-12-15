import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivePageService {

  activePage: string = '';

  changeActivePage(newRouterLinkClicked: string) {
    this.activePage = newRouterLinkClicked;
  }
}
