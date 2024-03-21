import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-arrow',
  template: `<i class="fa-regular fa-circle-up up-arrow"
                (click)="scrollToTop()"
                [ngClass]="arrowVisible ? 'visible-linear' : 'invisible-linear'"></i>`,
  styles: [`
            @import "../../scss/variables.scss";
            @import "../../../styles.scss";

            .up-arrow {
              position: fixed;
              bottom: 16px;
              right: 16px;
              color: $lilac;
              font-size: $max-font-size;
              z-index: $z-index - 1;
              opacity: 0;
              background-color: $white;
              border-radius: 50%;
              transition: opacity;
            }
          `]
})
export class UpArrowComponent implements OnInit{

  arrowVisible : boolean = false;

  ngOnInit(): void{
    window.onload = () => {
      this.scrollToTop();
    };
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void{
    this.arrowVisible = window.scrollY !== 0 ? true : false
  }

  scrollToTop(): void{
    const duration = 400; // Durée de l'animation en millisecondes
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
