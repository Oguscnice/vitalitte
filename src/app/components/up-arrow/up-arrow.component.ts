import { Component, HostListener } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-up-arrow',
  template: `<i class="fa-regular fa-circle-up up-arrow"
                (click)="scrollToTop()"
                [ngClass]="showDiv ? 'arrow-visible' : 'arrow-invisible'"></i>`,
  styleUrls: ['./up-arrow.component.scss']
})
export class UpArrowComponent extends BaseComponent{

  showDiv: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showDiv = window.scrollY > 0 ? true : false
  }
}
