import {DecimalPipe, NgClass, TitleCasePipe} from '@angular/common';
import {Component, inject, Signal, OnInit} from '@angular/core';
import { ProductDto } from '../../shared/interfaces/Product';
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";
import {DataSignalService} from "../../shared/services/data-signal.service";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CartItemQuantityManagerComponent} from "../cart-item-quantity-manager/cart-item-quantity-manager.component";
import {FileService} from "../../shared/services/file.service";

@Component({
  standalone: true,
  imports: [TitleCasePipe, DecimalPipe, NgClass, RouterLink, ReactiveFormsModule, CartItemQuantityManagerComponent],
  selector: 'app-shopping-products-list',
  templateUrl: './shopping-products-list.component.html',
  styleUrls: ['./shopping-products-list.component.scss']
})
export class ShoppingProductsListComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  fileService = inject(FileService);
  shoppingCartService = inject(ShoppingCartService);

  productsDto$: Signal<ProductDto[]> = this.dataSignal.$productsDto;

  ngOnInit(): void {
    this.dataSignal.getAllCategories();
    this.dataSignal.getAllCollections();
    this.dataSignal.getAllProductsByCategoryAndCollection();
  }
}
