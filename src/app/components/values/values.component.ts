import { Component } from '@angular/core';
import { Value } from 'src/app/shared/interfaces/Value';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss'],
})
export class ValuesComponent {
  valuesList: Value[] = [
    { name: 'Ecofriendly', icone: 'compost', source: 'fonts.google' },
    {
      name: 'Handmade',
      icone: 'fa-solid fa-hand-sparkles',
      source: 'fontawesome',
    },
    {
      name: 'Bienveillance',
      icone: 'fa-solid fa-hand-holding-heart',
      source: 'fontawesome',
    },
    {
      name: 'FourthValue To Find',
      icone: 'psychology_alt',
      source: 'fonts.google',
    },
  ];
}
