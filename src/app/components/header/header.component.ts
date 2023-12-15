import { ActivePageService } from './../../shared/services/active-page.service';
import { Component, ElementRef, ViewChild, Renderer2  } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { NAVBAR_USER } from 'src/app/shared/variables/navbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('navBar') navBar!: ElementRef;

  constructor(
    public activePageService: ActivePageService,
    private renderer: Renderer2) {}

  navbarUser: Menu[] = NAVBAR_USER;
  isMenuBurgerChecked: boolean = false;
  initialLoad: boolean = true;
  activePage = this.activePageService.activePage

  ngAfterViewInit(): void {
    document.documentElement.style.setProperty(
      '--height-header',
      this.navBar.nativeElement.offsetHeight + 'px'
    );
  }

  changeMenuBurgerVisibility(): void {
    this.isMenuBurgerChecked = !this.isMenuBurgerChecked;
    this.initialLoad = false;
  }

  openSubmenu(itemClicked : Menu){
    const actualState = itemClicked.submenu?.isOpen
    this.closeSubmenu()
    if(itemClicked.submenu){
      itemClicked.submenu.isOpen = !actualState
    }
  }

  closeMenuBurger(menuCheckbox : HTMLInputElement, routerLinkClicked: string): void {
    if (menuCheckbox.checked) {
      this.renderer.setProperty(menuCheckbox, 'checked', false);
    }
    this.isMenuBurgerChecked = false;
    this.activePageService.changeActivePage(routerLinkClicked);
    this.closeSubmenu()
  }


  closeSubmenu(){
    for(let item of this.navbarUser){
      if(item.submenu){
        item.submenu.isOpen = false
      }
    }
  }
}
