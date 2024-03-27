import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-create-notebook',
  templateUrl: './create-notebook.component.html',
  styleUrls: ['./create-notebook.component.scss']
})
export class CreateNotebookComponent extends BaseComponent{

  titleParentHome = 'Imaginer mon carnet';
  backgroundImageParentHome = '../../../assets/images/figma/couverture.jpg';

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
    let date = new Date("23/23/23")


  }

  changeTitleValue(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.titleValue = inputElement.value;
  }
}
