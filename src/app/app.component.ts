import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivePageService } from './shared/services/active-page.service';
import { ShoppingCartNotebookService } from './shared/services/shopping-cart-notebook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private router = inject(Router);
  private activePageService = inject(ActivePageService);

  ngOnInit() : void {
    this.checkCurrentUrl();
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
