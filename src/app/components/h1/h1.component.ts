import { BaseComponent } from 'src/app/base.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h1',
  template: `<div class="h1-image-container"
                  [ngClass]="titleChild === 'A propos...' ? 'thumbnail-h1-home' : ''">
                <img src="{{ backgroundImageChild }}"
                  alt="Image de fond pour la page {{ titleChild }}"/>
                <div class="filter-color"></div>
                <h1 class="flex center"> {{ titleChild }} </h1>
              </div>`,
  styleUrls: ['./h1.component.scss']
})
export class H1Component {
  @Input() titleChild! : string
  @Input() backgroundImageChild! : string

}
