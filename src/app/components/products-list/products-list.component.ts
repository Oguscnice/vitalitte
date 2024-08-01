import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductDto } from '../../shared/interfaces/Product';

@Component({
  standalone: true,
  imports: [ TitleCasePipe, RouterLink ],
  selector: 'app-products-list',
  template: `
    @for (product of productsListChild; track product) {
      <div class="products-list flex column center">
        <h5> {{ product.name | titlecase }} </h5>
        <div class="image-and-filter-color flex column pointer"
             [routerLink]="['/produits', product.slug]">
          <img src="{{ product.picture }}" alt="Photo d'un carnet"/>
          <div class="filter-color"></div>
        </div>
        <div [innerHTML]="product.introduction"></div>
      </div>
    }
  `,
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  @Input() productsListChild! : ProductDto[]

}
