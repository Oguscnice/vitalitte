import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { PublciationPaginated, PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

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
export class PublicationsComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);
  protected publications! : PublicationDto[];
  protected publicationsSpotlightedTrue! : PublicationDto[];

  protected pageNumber: number = 0;
  protected size: number = 10;
  private counterPublications: number = 0;
  private valueSearch : string = "";
  isDropdownOpen: boolean = false;

  backgroundImageParentHome: string =
    '../../../assets/images/figma/school-work.jpg';

  ngOnInit(): void {
    this.getPublicationsAndCounter();
    this.getPublicationsSpotlighted();
  }

  getPublicationsAndCounter(): void {
    this.getPublicationPaginated();
    this.getCounterPublications();
  }

  toggleDropdown(value: boolean): void {
    this.isDropdownOpen = value;
  }

  updateSizeValue(value: number): void {
    this.size = value;
    this.getPublicationsAndCounter();
    this.toggleDropdown(false);
  }

  formatObjectPublicationPaginated(): PublciationPaginated {
    return {
      valueSearch: this.valueSearch,
      pagination: {
        page: this.pageNumber,
        size: this.size,
      }
    }
  }

  getPublicationPaginated(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationPaginated(this.formatObjectPublicationPaginated()).subscribe({
        next: (publications) => this.publications = publications,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getCounterPublications(): void {
    this.subscriptions.push(
      this.apiRequestsService.getAllPublicationsCounter(this.formatObjectPublicationPaginated()).subscribe({
        next: (counter) => this.counterPublications = counter,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getPublicationsSpotlighted(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationsSpotlighted('true').subscribe({
        next: (publications) => this.publicationsSpotlightedTrue = publications,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  calcLastPage(): number {
    return Math.floor(this.counterPublications / this.size) + (this.counterPublications % this.size === 0 ? 0 : 1)
  }

  filteredByValueSearch(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueSearch = inputElement.value;
  }

  changePage(choice : 'first' | 'prev' | 'next' | 'last'): void {
    if(choice === 'first') {
      this.pageNumber = 0;
    } else if (choice === 'last') {
      this.pageNumber = this.calcLastPage();
    } else if (choice === 'prev') {
      this.pageNumber -= this.pageNumber < 1 ? 0 : 1
    } else if (choice === 'next') {
      this.pageNumber += this.pageNumber < this.calcLastPage() ? 1 : 0
    }

    this.getPublicationPaginated();
  }
}
