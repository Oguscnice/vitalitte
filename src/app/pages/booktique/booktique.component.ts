import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-booktique',
  templateUrl: './booktique.component.html',
  styleUrls: ['./booktique.component.scss']
})
export class BooktiqueComponent extends BaseComponent{

  constructor(
    private apiRequestsService : ApiRequestsService,
    public shoppingCartService: ShoppingCartService
  ){
    super()
  }

  notebooks! : NotebookDto[];

  titleParentBooktique: string = 'Booktique';
  backgroundImageParentHome : string = '../../../assets/images/figma/booktique.jpg';
  userChoice : 'classic' | 'personnalised' = 'classic';

  ngOnInit(): void {
    this.getAllNotebooks();
  }

  getAllNotebooks(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllNotebooks().subscribe({
        next: (notebooks) => {
          this.notebooks = notebooks;
          this.shoppingCartService.notebooks = notebooks
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  userChoiceSelected(choice : 'classic' | 'personnalised') : void{
    this.userChoice = choice;
  }
}
