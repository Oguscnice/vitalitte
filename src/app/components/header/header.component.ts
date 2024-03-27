import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ActivePageService } from './../../shared/services/active-page.service';
import { Component, ElementRef, ViewChild, Renderer2  } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { NAVBAR_USER } from 'src/app/shared/variables/Navbar';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {

  constructor(
    public activePageService: ActivePageService,
    private renderer: Renderer2,
    public shoppingCartService : ShoppingCartService,
    private apiRequestsService : ApiRequestsService
    ) {
      super()
    }

  @ViewChild('navBar') navBar!: ElementRef;

  navbarUser: Menu[] = NAVBAR_USER;
  isMenuBurgerChecked: boolean = false;
  initialLoad: boolean = true;
  activePage = this.activePageService.activePage

  ngOnInit(): void{
    this.getAllNotebooks();
  }

  ngAfterViewInit(): void {
    document.documentElement.style.setProperty(
      '--height-header',
      this.navBar.nativeElement.offsetHeight + 'px'
    );
  }

  getAllNotebooks(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllNotebooks().subscribe({
        next: (notebooks) => this.shoppingCartService.notebooks = notebooks,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
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

  closeMenuBurger(menuCheckbox : HTMLInputElement, routerLinkClicked: string, event : Event): void {

    if (menuCheckbox.checked) {
      this.renderer.setProperty(menuCheckbox, 'checked', false);
    }
    event.stopPropagation()
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
