import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NOTEBOOKS } from 'src/app/shared/variables/notebooks';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-booktique',
  templateUrl: './booktique.component.html',
  styleUrls: ['./booktique.component.scss']
})
export class BooktiqueComponent extends BaseComponent{

  notebooksListParent = NOTEBOOKS;

  titleParentBooktique: string = 'Booktique';
  backgroundImageParentHome : string = '../../../assets/images/figma/booktique.jpg';
  userChoice : 'classic' | 'personnalised' = 'classic';
  
  constructor(public shoppingCartService: ShoppingCartService){
    super()
  }

  userChoiceSelected(choice : 'classic' | 'personnalised') : void{
    this.userChoice = choice;
  }
}
