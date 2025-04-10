import {inject, Injectable, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ActivePageService {

  private router = inject(Router);

  activePage: string = '';
  paths: string[] = [];

  getAllPaths(): void {
    const currentRouter = this.router;  // Récupère l'URL actuelle
    for (const config of currentRouter.config) {
      if (config.path) {
        const urlSegments = config.path.split('/'); // Divise l'URL en segments
        if (!this.paths.includes(urlSegments[0])) {
          this.paths.push(urlSegments[0]);
        }
      }
    }
    this.subscribeOnPageChange();
  }

  private subscribeOnPageChange(): void {
    this.router.events.pipe(
      // Filtre seulement les événements NavigationEnd
      filter(event => event instanceof NavigationEnd))
      // Met à jour l'URL après redirection
      .subscribe((event) => {
        let urlSegments = (event as NavigationEnd).urlAfterRedirects.split('/'); // Divise l'URL en segments
        urlSegments = this.adaptUrlSegmentsArray(urlSegments);
        this.activePage = urlSegments[0];
      })
  }

  adaptUrlSegmentsArray(array: string[]): string[] {
    return array.filter(value => value !== null && value !== undefined && value !== "");
  }
}
