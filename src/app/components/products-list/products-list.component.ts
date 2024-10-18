import { TitleCasePipe } from '@angular/common';
import {Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import {DataSignalService} from "../../shared/services/data-signal.service";

@Component({
  standalone: true,
  imports: [ TitleCasePipe, RouterLink ],
  selector: 'app-products-list',
  template: `
    @for (product of products$(); track product; let index = $index) {
      <div class="product-list flex column center">
        <h5> {{ product.name | titlecase }} </h5>
        <div class="image-and-filter-color flex column pointer"
             [routerLink]="['/produits', product.slug]">
          <img src="{{ product.picture }}" alt="Photo d'un carnet"/>
          <div class="filter-color"></div>
        </div>
        <div class="product-introduction" [innerHTML]="product.introduction"></div>
        @if (index < products$().length - 1) {
          <hr>
        }
      </div>
    }
  `,
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  private dataSignal = inject(DataSignalService);
  products$ = this.dataSignal.$productsDto;

}
