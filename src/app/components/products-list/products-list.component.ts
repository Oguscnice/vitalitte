import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto } from '../../shared/interfaces/Product';
import {last} from "rxjs";

@Component({
  standalone: true,
  imports: [ TitleCasePipe, RouterLink ],
  selector: 'app-products-list',
  template: `
    @for (product of productsListChild; track product; let index = $index) {
      <div class="product-list flex column center">
        <h5> {{ product.name | titlecase }} </h5>
        <div class="image-and-filter-color flex column pointer"
             [routerLink]="['/produits', product.slug]">
          <img src="{{ product.picture }}" alt="Photo d'un carnet"/>
          <div class="filter-color"></div>
        </div>
        <div class="product-introduction" [innerHTML]="product.introduction"></div>
        @if (index < productsListChild.length - 1) {
          <hr>
        }
      </div>
    }
  `,
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @Input() productsListChild! : ProductDto[];

}
