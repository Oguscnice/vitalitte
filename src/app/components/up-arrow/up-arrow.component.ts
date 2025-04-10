import { NgClass } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  imports: [ NgClass ],
  selector: 'app-up-arrow',
  template: `<i class="fa-regular fa-circle-up up-arrow"
                (click)="scrollToTop(400)"
                [ngClass]="arrowVisible ? 'visible-linear' : 'invisible-linear'"></i>`,
  styles: [`
            @use "../../scss/variables.scss" as variablesScss;
            @use "../../../styles.scss";

            .up-arrow {
              position: fixed;
              bottom: 16px;
              right: 16px;
              color: variablesScss.$lilac;
              font-size: variablesScss.$max-font-size;
              z-index: variablesScss.$z-index - 1;
              opacity: 0;
              background-color: variablesScss.$white;
              border-radius: 50%;
              transition: opacity;
            }
          `]
})
export class UpArrowComponent implements OnInit {

  protected arrowVisible : boolean = false;

  ngOnInit(): void {
    window.onload = () => {
      this.scrollToTop();
    };
  }

  @HostListener('window:scroll', [])
  private onWindowScroll(): void {
    this.arrowVisible = window.scrollY !== 0 ? true : false
  }

  protected scrollToTop(duration: number = 1): void {
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
