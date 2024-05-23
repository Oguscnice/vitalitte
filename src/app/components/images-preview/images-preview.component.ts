import { Component, Input } from '@angular/core';
import { ImagesPreview } from 'src/app/shared/interfaces/ImagesPreview';

@Component({
  standalone: true,
  imports: [  ],
  selector: 'app-images-preview',
  template: `<div class="images-preview flex space-around">
                @for (item of picturesArray; track item) {
                  <div class="image-and-filter-color">
                    <img src="{{item.imgSrc}}" alt="{{item.imgAlt}}" />
                    <div class="filter-color"></div>
                  </div>
                }
              </div>`,
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent {

  @Input() picturesArray! : ImagesPreview[];
  @Input() classOptional : string = '';

}
