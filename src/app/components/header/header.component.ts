import { ActivePageService } from '../../shared/services/active-page.service';
import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  inject,
  OnInit,
  OnDestroy, AfterViewChecked
} from '@angular/core';
import { Menu } from 'src/app/shared/interfaces/Menu';
import { BaseComponent } from 'src/app/base.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {NgClass, TitleCasePipe} from '@angular/common';
import { Subject, filter } from 'rxjs';
import { NAVBAR_USER } from 'src/app/shared/variables/navbar';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ModalShoppingCartListComponent} from "../modal-shopping-cart-list/modal-shopping-cart-list.component";
import {environment} from "../../../environments/environment";
import {EnvironmentType} from "../../../environments/EnvironmentType";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {toTitleCase} from "../../shared/function/string-to-title-case";

@Component({
  standalone: true,
  imports: [RouterLink, NgClass, ModalShoppingCartListComponent, TitleCasePipe],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit, AfterViewChecked, OnDestroy {

  private router = inject(Router);
  private dataSignal = inject(DataSignalService);
  private activePageService = inject(ActivePageService);

  shoppingCart = inject(ShoppingCartService);
  isShoppingCartListOpen: boolean = false;
  environment: EnvironmentType = "dev";
  env = environment;

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
    this.activePageService.getAllPaths();
    this.dataSignal.verifyShoppingCartValidity();
    this.shoppingCart.setShoppingCart();
    this.environment = environment.production ? "prod" : environment.staging ? "staging" : "dev";
    this.createMenu();
  }

  ngAfterViewChecked(): void {
    this.checkValueResize();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Retirer la classe 'no-scroll' du body quand la modale est fermée
    document.body.classList.remove('no-scroll');
  }

  isActualPage(url: string): boolean {
    const urlSegments = url.split('/'); // Divise l'URL en segments
    return this.activePageService.adaptUrlSegmentsArray(urlSegments)[0] === this.activePageService.activePage;
  }

  private createMenu(): void {
    this.subscriptions.push(
      this.dataSignal.getProductTypes().subscribe({
        next: (productTypes) => {
          let NEW_ITEM_MENU = {
            name: "Papeterie",
            routerLink: "produits/type/",
            submenu: { isOpen: false, items: [] }
          };
          for (const PRODUCT_TYPE of productTypes) {
            const NEW_ITEM_SUBMENU = {
              name: toTitleCase(PRODUCT_TYPE.replace('_', ' ')),
              routerLink: PRODUCT_TYPE.toLowerCase()
            };
            // @ts-ignore
            NEW_ITEM_MENU.submenu.items.push(NEW_ITEM_SUBMENU);
          }
          this.navbarUser.splice(1, 0, NEW_ITEM_MENU);
        },
        error: (err) => console.error(err)
      })
    );
  }

  private checkValueResize(): void {
    document.documentElement.style.setProperty(
      '--height-header',
      this.navBar.nativeElement.offsetHeight + 'px'
    );
  }

  changeMenuBurgerVisibility(): void {
    this.isMenuBurgerChecked = !this.isMenuBurgerChecked;
    this.initialLoad = false;
    this.isShoppingCartListOpen = false;

    if (this.isMenuBurgerChecked) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  openSubmenu(itemClicked : Menu): void {
    const actualState = itemClicked.submenu?.isOpen;
    this.closeSubmenu()
    if (itemClicked.submenu) {
      itemClicked.submenu.isOpen = !actualState;
    }
  }

  closeMenuBurger(event: Event): void {

    if (this.menuCheckbox && this.menuCheckbox.nativeElement) {
      this.menuCheckbox.nativeElement.checked = false;
    }

    event.stopPropagation();
    this.isMenuBurgerChecked = false;
    this.isShoppingCartListOpen = false;
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
