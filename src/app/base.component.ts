import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'app-base',
  template: `<i class="up-arrow fa-solid fa-square-caret-up"
                (click)="scrollToTop()"
                *ngIf="showDiv"></i>`,
  styles: [``]
})

export class BaseComponent {

  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() : void{
    const duration = 500; // Durée de l'animation en millisecondes
    const scrollStep = -window.scrollY / (duration / 15); // Pas de défilement par étape
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
} 