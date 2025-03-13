import {Component, inject, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import {FileService} from "../../shared/services/file.service";

@Component({
  selector: 'app-publication-thumbnail',
  imports: [RouterLink],
  template: `
    <div class="actuality-container flex pointer" [routerLink]="'/actualites/' + publication.slug">
      <img [src]="fileService.getDataForImageSrc(publication.pictureDto)"
           alt="Image de l'article : {{ publication.title }}">
      <div class="actuality-description">
        <h4>{{ publication.title }}</h4>
        <div class="actuality-text" [innerHTML]="publication.description"></div>
      </div>
    </div>
  `,
  standalone: true,
  styles: [`
    @use "../../scss/variables.scss" as variablesScss;

    .actuality-container {
      @include variablesScss.outline-picture;
      overflow: hidden;
      height: 160px;


      img {
        object-fit: cover;
        width: 160px;
        height: 160px;
      }

      .actuality-description {
        padding: variablesScss.$double-padding;

        h4 {
          height: 80%;
          text-align: center;
          font-weight: bolder;
          height: 20%;
          overflow: hidden;
        }

        .actuality-text {
          height: 80%;
          padding-top: variablesScss.$double-padding;
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

  fileService = inject(FileService);

  @Input() publication! : PublicationDto;

}
