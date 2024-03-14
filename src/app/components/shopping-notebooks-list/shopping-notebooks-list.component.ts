import { Component, Input } from '@angular/core';
import { Notebook } from 'src/app/shared/interfaces/Notebook';
import { ShoppingCart } from 'src/app/shared/interfaces/ShoppingCart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-notebooks-list',
  template: `<div class="shopping-notebooks-list">
              <div *ngFor="let notebook of notebooksListChild"
                  class="shopping-notebooks-container flex">
                <img src="{{notebook.mainPicture}}"
                    alt="Image du Carnet {{notebook.title}}">
                <div class="title-and-price flex column center">
                  <h4>{{notebook.title | titlecase }}</h4>
                  <p>{{notebook.price | number: '0.2'}} €</p>
                  <div class="shopping-cart-gestion flex">
                    <button (click)="subtractNotebookToShoppingCart(notebook.slug)">-</button>
                    <p>{{ shoppingCartService.counterQuantityBySlug(notebook.slug) }}</p>
                    <button (click)="addNotebookToShoppingCart(notebook.slug)">+</button>
                  </div>
                </div>
              </div>
            </div>`,
  styleUrls: ['./shopping-notebooks-list.component.scss']
})
export class ShoppingNotebooksListComponent {

  @Input() notebooksListChild! : Notebook[];

  constructor(
    public shoppingCartService : ShoppingCartService
    ){}


  addNotebookToShoppingCart(itemSlug : string) : void{  
    this.shoppingCartService.addNotebook(itemSlug)
    this.shoppingCartService.counterQuantityBySlug(itemSlug);
  }

  subtractNotebookToShoppingCart(itemSlug : string) : void{
    this.shoppingCartService.subtractNotebookToShoppingCart(itemSlug)
    this.shoppingCartService.counterQuantityBySlug(itemSlug);
  }

}
