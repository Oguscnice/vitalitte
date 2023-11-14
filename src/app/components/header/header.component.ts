import { Component, ElementRef, ViewChild } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { NAVBAR_USER } from 'src/app/shared/variables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @ViewChild('navBar') navBar!: ElementRef;

  navbarUser: Menu[] = NAVBAR_USER;
  isMenuBurgerChecked: boolean = false;
  initialLoad: boolean = true;

  ngAfterViewInit() {
    document.documentElement.style.setProperty(
      '--height-header',
      this.navBar.nativeElement.offsetHeight + 'px'
    );
  }

  changeMenuBurgerVisibility() {
    this.isMenuBurgerChecked = !this.isMenuBurgerChecked;
    this.initialLoad = false;
  }
}
