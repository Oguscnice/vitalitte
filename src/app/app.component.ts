import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivePageService } from './shared/services/active-page.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private activePageService: ActivePageService,
    public shoppingCartService : ShoppingCartService
  ) {}

  title = 'Vitalitté';

  ngOnInit() : void {
    this.checkCurrentUrl();
    this.shoppingCartService.haveCartInLocalStorage()
  }

  checkCurrentUrl() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.activePageService.changeActivePage(currentUrl);
      });
  }

}
