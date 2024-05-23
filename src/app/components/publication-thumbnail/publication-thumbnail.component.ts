import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';

@Component({
  selector: 'app-publication-thumbnail',
  standalone: true,
  imports: [ RouterLink ],
  template: `
              <div class="actuality-container flex pointer" [routerLink]="'/actualites/' + publication.slug">
                <img [src]="publication.picture" alt="Image de l'article : {{publication.title}}">
                <div class="actuality-description">
                  <h4>{{ publication.title }}</h4>
                  <div class="actuality-text" [innerHTML]="publication.description"></div>
                </div>
              </div>
            `,
  styles: [`
            @import "../../scss/variables.scss";

            .actuality-container {
              @include outline-picture;
              overflow: hidden;
              height: 160px;


              img {
                object-fit: cover;
                width: 160px;
                height: 160px;
              }

              .actuality-description {
                padding: $double-padding;

                h4 {
                  height: 80%;
                  text-align: center;
                  font-weight: bolder;
                  height: 20%;
                  overflow: hidden;
                }
                .actuality-text {
                  height: 80%;
                  padding-top: $double-padding;
                }
              }
            }

            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              .actuality-container {
                height: 120px;
                width: 380px;

                img {
                  width: 120px;
                  height: 120px;
                }
              }
            }

            // Ordinateurs portables vers ordinateurs de bureau :
            @media screen and (min-width: 1400px) {
              .actuality-container {
                width: 440px;
              }
            }
          `]
})
export class PublicationThumbnailComponent {

  @Input() publication! : PublicationDto;

}
