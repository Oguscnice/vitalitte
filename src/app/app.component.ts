import {Component, inject, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivePageService } from './shared/services/active-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

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
