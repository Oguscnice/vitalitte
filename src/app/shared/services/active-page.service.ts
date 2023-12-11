import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ActivePageService {

  activePage: string = '';

  changeActivePage(newRouterLinkClicked: string) {
    this.activePage = newRouterLinkClicked;
  }
}
