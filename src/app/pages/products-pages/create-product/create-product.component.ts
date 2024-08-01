import { Component } from '@angular/core';
import { BaseComponent } from '../../../base.component';

@Component({
  standalone: false,
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent{

  protected backgroundImageParentHome = '../../../assets/images/figma/couverture.jpg';

  isFormClicked: boolean = false;
  hasErrors: boolean = false;
  isLoaderVisible: boolean = false;

  titleValue! : string;
  coverValue! : string;
  bookBindingValue! : string;
  paperValue! : string;

  changeCoverValue(coverClicked: string) {
    this.coverValue = coverClicked;
  }

  changeBookBindingValue(bookBindingClicked: string) {
    this.bookBindingValue = bookBindingClicked;
  }

  changePaperValue(paperClicked: string) {
    this.paperValue = paperClicked;
  }

  changeTitleValue(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.titleValue = inputElement.value;
  }
}
