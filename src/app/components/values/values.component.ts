import { Component } from '@angular/core';
import { Value } from 'src/app/shared/interfaces/Value';

@Component({
  standalone: true,
  imports: [ ],
  selector: 'app-values',
  template: `<div class="values-container flex">
              @for (value of valuesList; track value) {
                <div class="value-icone-and-name flex column center">
                  @if (value.source === 'fonts.google') {
                    <span class="material-symbols-outlined flex center">
                        {{ value.icone }}
                    </span>
                  }
                  @if (value.source === 'fontawesome') {
                    <i class="{{ value.icone }} flex center"></i>
                  }
                  <p>{{ value.name }}</p>
                </div>
              }
            </div>
            `,
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
      name: 'FourthValue',
      icone: 'psychology_alt',
      source: 'fonts.google',
    },
  ];
}
