import {Component, inject, OnInit} from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import {DataSignalService} from "../../../shared/services/data-signal.service";

@Component({
  standalone: false,
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styles: [`
            @import "src/app/scss/variables.scss";

            .publications {

              .publications-section {
                flex-direction: column;

                app-publication-thumbnail {
                  width: 100%;
                  margin-top: $half-margin;
                }
              }
            }

            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              .publications {

                .publications-section {
                  flex-direction: row;

                  app-publication-thumbnail {
                    width: 50%;
                  }
                }
              }
            }
          `]
})
export class PublicationsComponent extends BaseComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  publications$ = this.dataSignal.$publications;
  publicationsSpotlighted$ = this.dataSignal.$publicationsSpotlighted;

  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';

  ngOnInit(): void {
    this.dataSignal.getPublicationsPaginated();
    this.dataSignal.getPublicationsSpotlighted();
  }

  onValuePageChange(event : string): void {
    this.dataSignal.getPublicationsPaginated();
  }
}
