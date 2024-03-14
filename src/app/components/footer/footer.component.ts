import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  template: `<footer class="flex space-around center" #footer>
              <i class="fa-brands fa-square-facebook"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-solid fa-envelope"></i>
            </footer>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  
  windowSize$ = new Subject<[number, number]>();

  @ViewChild('footer') footer!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.adaptFooterHeight();
  }

  ngAfterViewInit(): void {
    this.adaptFooterHeight();
  }

  adaptFooterHeight(): void{
    document.documentElement.style.setProperty(
      '--height-footer',
      this.footer.nativeElement.offsetHeight + 'px'
    );
  }
}
