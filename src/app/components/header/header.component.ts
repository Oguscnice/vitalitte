import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ActivePageService } from './../../shared/services/active-page.service';
import { Component, ElementRef, ViewChild, Renderer2, HostListener, inject  } from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { ShoppingCartNotebookService } from '../../shared/services/shopping-cart-notebook.service';
import { BaseComponent } from 'src/app/base.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, filter } from 'rxjs';
import { NAVBAR_USER } from 'src/app/shared/variables/navbar';

@Component({
  standalone: true,
  imports: [ RouterLink, NgClass ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {

  protected activePageService = inject(ActivePageService);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  protected shoppingCartNotebookService = inject(ShoppingCartNotebookService);
  private apiRequestsService = inject(ApiRequestsService);

  protected windowSize$ = new Subject<[number, number]>();

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.checkValueResize();
  }

  @ViewChild('navBar') navBar!: ElementRef;

  protected navbarUser: Menu[] = NAVBAR_USER;
  protected isMenuBurgerChecked: boolean = false;
  protected initialLoad: boolean = true;

  ngOnInit(): void {
    this.getAllNotebooks();
  }

  ngAfterViewInit(): void {
    this.checkValueResize();
  }

  checkValueResize(): void {
    document.documentElement.style.setProperty(
      '--height-header',
      this.navBar.nativeElement.offsetHeight + 'px'
    );
  }

  getAllNotebooks(): void {
    this.subscriptions.push(
      this.apiRequestsService.getAllNotebooks().subscribe({
        next: (notebooks) => this.shoppingCartNotebookService.items = notebooks,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  changeMenuBurgerVisibility(): void {
    this.isMenuBurgerChecked = !this.isMenuBurgerChecked;
    this.initialLoad = false;
  }

  openSubmenu(itemClicked : Menu): void {
    const actualState = itemClicked.submenu?.isOpen;
    this.closeSubmenu()
    if(itemClicked.submenu) {
      itemClicked.submenu.isOpen = !actualState;
    }
  }

  closeMenuBurger(menuCheckbox : HTMLInputElement, routerLinkClicked: string, event : Event): void {

    if (menuCheckbox.checked) {
      this.renderer.setProperty(menuCheckbox, 'checked', false);
    }

    event.stopPropagation();
    this.isMenuBurgerChecked = false;
    this.activePageService.changeActivePage(routerLinkClicked);
    this.scrollTopAfterNavigate();
    this.closeSubmenu();
  }

  closeSubmenu(): void {
    for(let item of this.navbarUser){
      if(item.submenu) {
        item.submenu.isOpen = false;
      };
    };
  }

  scrollTopAfterNavigate(): void {
    this.subscriptions.push(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      })
    );
  }
}
