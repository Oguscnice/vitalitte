import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { ShoppingCart } from 'src/app/shared/interfaces/ShoppingCart';
import { ShoppingCartNotebookService } from '../../shared/services/shopping-cart-notebook.service';

@Component({
  standalone: true,
  imports: [ TitleCasePipe, DecimalPipe ],
  selector: 'app-shopping-notebooks-list',
  template: ` <div class="shopping-notebooks-list">
                @for (notebook of notebooksListChild; track notebook) {
                  <div class="shopping-notebooks-container flex">
                    <img src="{{notebook.mainPicture}}" alt="Image du Carnet {{notebook.name}}">
                    <div class="title-and-price flex column center">
                      <h4>{{notebook.name | titlecase }}</h4>
                      <p>{{notebook.price | number: '0.2'}} €</p>
                      <div class="shopping-cart-gestion flex">
                        <button (click)="subtractNotebookToShoppingCart(notebook.slug)">-</button>
                        <p>{{ shoppingCartService.counterQuantityBySlug(notebook.slug) }}</p>
                        <button (click)="addNotebookToShoppingCart(notebook.slug)">+</button>
                      </div>
                    </div>
                  </div>
                }
                </div>
                `,
  styles: [`
            @import "../../scss/variables.scss";
            @import "../../scss/buttons.scss";
            @import "../../../styles.scss";

            .shopping-notebooks-list{
              .shopping-notebooks-container{
                width: calc(100vw - ($fourth-padding * 2));
                min-height: calc((100vw - ($fourth-padding * 2)) / 4);
                img{
                  width: calc((100vw - ($fourth-padding * 2)) / 2);
                }
                .title-and-price{
                  width: calc((100vw - ($fourth-padding * 2)) / 2);
                }
              }
            }
          `]
})
export class ShoppingNotebooksListComponent {

  @Input() notebooksListChild! : NotebookDto[];

  protected shoppingCartService = inject(ShoppingCartNotebookService)

  addNotebookToShoppingCart(itemSlug : string) : void{  
    this.shoppingCartService.addItem(itemSlug)
    this.shoppingCartService.counterQuantityBySlug(itemSlug);
  }

  subtractNotebookToShoppingCart(itemSlug : string) : void{
    this.shoppingCartService.subtractItemToShoppingCart(itemSlug)
    this.shoppingCartService.counterQuantityBySlug(itemSlug);
  }

}
