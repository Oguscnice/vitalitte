import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [ NgClass ],
  selector: 'app-h1',
  template: `<div class="h1-image-container"
                  [ngClass]="titleChild === 'A propos...' ? 'thumbnail-h1-home' : ''">
                <img src="{{ backgroundImageChild }}"
                     alt="Image de fond pour la page {{ titleChild }}"/>
                <div class="filter-color"></div>
                <h1 class="flex center"> {{ titleChild }} </h1>
              </div>`,
  styles: [`
            @import "src/app/scss/variables.scss";
            @import "src/styles.scss";

            .h1-image-container,
            img,
            .filter-color,
            h1 {
              height: 50vh;
              width: 100vw;
            }

            .h1-image-container {
              img {
                z-index: $z-index;
                object-position: top;
              }
              .filter-color {
                z-index: $z-index + 1;
                top: calc(-50vh - 4px);
              }
              h1 {
                z-index: $z-index + 2;
                top: calc(-100vh - 4px);
              }
            }

            // Breackpoint list
            // Mobiles vers Tablettes :
            @media screen and (min-width: 768px) {
            }

            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              .h1-image-container,
              img,
              .filter-color,
              h1 {
                height: 80vh;
              }

              .h1-image-container {
                img {
                  z-index: $z-index;
                }
                .filter-color {
                  top: calc(-80vh - 4px);
                }
                h1 {
                  top: calc(-160vh - 4px);
                }
              }
              .thumbnail-h1-home {
                height: 50vh;
                width: calc(100% - ($desktop-padding * 2));

                img,
                .filter-color,
                h1 {
                  line-height: 0;
                  height: 50vh;
                }
                .filter-color {
                  top: -50vh;
                }
                h1 {
                  top: -100vh;
                }
              }
            }

            // Ordinateurs portables vers ordinateurs de bureau :
            @media screen and (min-width: 1400px) {
            }
          `]
})
export class H1Component {
  @Input() titleChild! : string
  @Input() backgroundImageChild! : string

}
