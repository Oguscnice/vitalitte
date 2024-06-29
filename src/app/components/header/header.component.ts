import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ActivePageService } from '../../shared/services/active-page.service';
import {Component, ElementRef, ViewChild, Renderer2, HostListener, inject, OnInit, AfterViewInit} from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { BaseComponent } from 'src/app/base.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, filter } from 'rxjs';
import { NAVBAR_USER } from 'src/app/shared/variables/navbar';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";

@Component({
  standalone: true,
  imports: [ RouterLink, NgClass ],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit, AfterViewInit {

  private router = inject(Router);
  private renderer = inject(Renderer2);
  private apiRequestsService = inject(ApiRequestsService);
  shoppingCart = inject(ShoppingCartService);
  activePageService = inject(ActivePageService);

  windowSize$ = new Subject<[number, number]>();

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.checkValueResize();
  }

  @ViewChild('navBar') navBar!: ElementRef;

  navbarUser: Menu[] = NAVBAR_USER;
  isMenuBurgerChecked: boolean = false;
  initialLoad: boolean = true;

  ngOnInit(): void {
    this.getAllNotebooks();
    this.shoppingCart.setShoppingCart();
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
        next: (notebooks) => {
          // this.shoppingCart.items = notebooks,
        },
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
