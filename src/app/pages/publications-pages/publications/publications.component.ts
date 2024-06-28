import {Component, inject, OnInit, Signal} from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import {PaginationSignalService} from "../../../shared/services/pagination-signal.service";
import {DataSignalService} from "../../../shared/services/data-signal.service";

@Component({
  standalone: false,
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styles: [`
            @import "../../../scss/variables.scss";

            .publications {

              .publications-section {
                flex-direction: column;

                app-publication-thumbnail {
                  width: 100%;
                  margin-top: $half-margin;
                }
              }

              .input-search {
                flex-direction: column;
                width: 100%;

                input {
                  width: 100%;
                }
                .btn-normal {
                  width: 40%;
                  font-size: $double-font-size;
                }
              }

              .dropdown-container {
                .input-and-arrow {
                  .arrow-icone {
                    margin-top : 0px;
                  }
                }
              }
            }

            .choice-page {
              margin-top: $normal-margin;
              width: 400px;
            }

            // Tablettes vers ordinateurs portables :
            @media screen and (min-width: 992px) {
              .publications {
                .input-search {
                  flex-direction: row;
                  input {
                    width: 72%
                  }
                  button {
                    width: 24%;
                  }
                }

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
  private paginationSignal = inject(PaginationSignalService);
  publications: Signal<PublicationDto[]> = this.dataSignal.$publications;
  publicationsSpotlighted: Signal<PublicationDto[]> = this.dataSignal.$publicationsSpotlighted;

  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';

  ngOnInit(): void {
    this.getPublicationsAndCounter();
    this.dataSignal.getPublicationsSpotlighted();
    this.subscribeToPublicationCounterSignal();
  }

  subscribeToPublicationCounterSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$publicationsCounter.subscribe((counter:number): void => this.paginationSignal.setCounterItem(counter))
    )
  }

  onValuePageChange(event : string): void {
    this.getPublicationsAndCounter();
  }

  getPublicationsAndCounter(): void {
    this.dataSignal.getPublicationsPaginated();
    this.dataSignal.getCounterPublications();
  }
}
