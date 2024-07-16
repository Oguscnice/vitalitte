import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ActivePageService } from '../../shared/services/active-page.service';
import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  HostListener,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { BaseComponent } from 'src/app/base.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
<<<<<<< HEAD
import {DatePipe, DecimalPipe, NgClass} from '@angular/common';
=======
import {DatePipe, DecimalPipe, NgClass, TitleCasePipe} from '@angular/common';
>>>>>>> 81198db936d308cd74d8ee97d95fa45e3fa9568c
import { Subject, filter } from 'rxjs';
import { NAVBAR_USER } from 'src/app/shared/variables/navbar';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ModalShoppingCartListComponent} from "../modal-shopping-cart-list/modal-shopping-cart-list.component";
<<<<<<< HEAD

@Component({
  standalone: true,
  imports: [RouterLink, NgClass, DecimalPipe, DatePipe, ModalShoppingCartListComponent],
=======
import {environment} from "../../../environments/environment";
import {EnvironmentType} from "../../../environments/EnvironmentType";

@Component({
  standalone: true,
  imports: [RouterLink, NgClass, DecimalPipe, DatePipe, ModalShoppingCartListComponent, TitleCasePipe],
>>>>>>> 81198db936d308cd74d8ee97d95fa45e3fa9568c
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  private router = inject(Router);
  private renderer = inject(Renderer2);
  private apiRequestsService = inject(ApiRequestsService);
  shoppingCart = inject(ShoppingCartService);
  activePageService = inject(ActivePageService);
  isShoppingCartListOpen: boolean = false;
<<<<<<< HEAD
=======
  environment: EnvironmentType = "dev";
  env = environment;
>>>>>>> 81198db936d308cd74d8ee97d95fa45e3fa9568c

  windowSize$ = new Subject<[number, number]>();

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.windowSize$.next([window.innerWidth, window.innerHeight]);
    this.checkValueResize();
  }

  @ViewChild('navBar') navBar!: ElementRef;
  @ViewChild('menuCheckbox') menuCheckbox!: ElementRef;

  navbarUser: Menu[] = NAVBAR_USER;
  isMenuBurgerChecked: boolean = false;
  initialLoad: boolean = true;

  ngOnInit(): void {
    this.getAllNotebooks();
    this.shoppingCart.setShoppingCart();
    this.environment = environment.production ? "prod" : environment.staging ? "staging" : "dev";
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Retirer la classe 'no-scroll' du body quand la modale est fermée
    document.body.classList.remove('no-scroll');
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
    this.isShoppingCartListOpen = false;
<<<<<<< HEAD
=======

    if (this.isMenuBurgerChecked) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
>>>>>>> 81198db936d308cd74d8ee97d95fa45e3fa9568c
  }

  openSubmenu(itemClicked : Menu): void {
    const actualState = itemClicked.submenu?.isOpen;
    this.closeSubmenu()
    if(itemClicked.submenu) {
      itemClicked.submenu.isOpen = !actualState;
    }
  }

  closeMenuBurger(routerLinkClicked: string, event: Event): void {

    if (this.menuCheckbox && this.menuCheckbox.nativeElement) {
      this.menuCheckbox.nativeElement.checked = false;
    }

    event.stopPropagation();
    this.isMenuBurgerChecked = false;
    this.isShoppingCartListOpen = false;
    this.activePageService.changeActivePage(routerLinkClicked);
    this.scrollTopAfterNavigate();
    this.closeSubmenu();
    document.body.classList.remove('no-scroll');
  }

  closeSubmenu(): void {
    for(let item of this.navbarUser){
      if(item.submenu) {
        item.submenu.isOpen = false;
      }
    }
  }

  changeModalShoppingCartVisibility(value: boolean): void {
    this.isShoppingCartListOpen = value;

    this.isMenuBurgerChecked = false;
    if (this.menuCheckbox && this.menuCheckbox.nativeElement) {
      this.menuCheckbox.nativeElement.checked = false;
    }

    if (this.isShoppingCartListOpen) {
      // Ajouter la classe 'no-scroll' au body quand la modale est ouverte
      document.body.classList.add('no-scroll');
    } else {
      // Retirer la classe 'no-scroll' du body quand la modale est fermée
      document.body.classList.remove('no-scroll');
    }
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
