import {Component, inject, OnInit, Signal} from '@angular/core';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {ShoppingCart} from "../../shared/interfaces/ShoppingCart";

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private shoppingCart = inject(ShoppingCartService);
  cart: Signal<ShoppingCart> = this.shoppingCart.$userShoppingCart;

  backgroundImageParentCreations = '../../../assets/images/figma/booktique.jpg';

  ngOnInit(): void {
    this.shoppingCart.getValueLocalStorage();
  }
}
