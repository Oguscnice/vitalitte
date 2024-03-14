import { Component, HostListener } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-up-arrow',
  template: `<i class="fa-regular fa-circle-up up-arrow"
                (click)="scrollToTop()"
                [ngClass]="arrowVisible ? 'visible-linear' : 'invisible-linear'"></i>`,
  styleUrls: ['./up-arrow.component.scss']
})
export class UpArrowComponent extends BaseComponent{

  arrowVisible: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.arrowVisible = window.scrollY > 0 ? true : false
  }
}
