import { Component, inject } from '@angular/core';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ApiPublicationAdminService } from '../../services/api-publication-admin.service';
import { BaseComponent } from 'src/app/base.component';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { CreatePublication } from '../../interfaces/Publication';

@Component({
  standalone: false,
  selector: 'app-manage-publications',
  templateUrl: './manage-publications.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class ManagePublicationsComponent extends BaseComponent {

  private apiRequestsService = inject(ApiRequestsService);
  private apiPublicationAdminService = inject(ApiPublicationAdminService);

  modalVisible : boolean = false;
  multipleChoice! : boolean;
  modalText! : string;

  publications! : PublicationDto[];
  publicationToDelete! : PublicationDto;

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications(): void {
    this.subscriptions.push(
      this.apiRequestsService.getAllPublications().subscribe({
        next: (publications) => this.publications = publications,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  showModal(publicationToDelete : PublicationDto): void {
    this.publicationToDelete = publicationToDelete;
    this.modalText = `Confirmer vouloir supprimer la publication : ${publicationToDelete.title}`
    this.modalVisible = true;
  }

  responseForModal(response : boolean): void {
    this.modalVisible = false;
    if(response){
      this.deletePublication(this.publicationToDelete.slug);
    }
  }

  post(newPublication : CreatePublication): void {
    this.subscriptions.push(
      this.apiPublicationAdminService.post(newPublication).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllPublications();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  put(publication : PublicationDto): void {
    this.subscriptions.push(
      this.apiPublicationAdminService.put(publication).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.getAllPublications();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  changeSpotlight(publicationToChangeAvaibility : PublicationDto): void {
    this.subscriptions.push(
      this.apiPublicationAdminService.changeSpotlighted(publicationToChangeAvaibility).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          for(let publication of this.publications){
            if(publication.slug === publicationToChangeAvaibility.slug){
              publication.spotlighted = !publication.spotlighted
            }
          }
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  deletePublication(publicationSlug : PublicationDto['slug']): void {
    this.subscriptions.push(
      this.apiPublicationAdminService.delete(publicationSlug).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          this.publications = this.publications.filter(publication => publication.slug !== publicationSlug)
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
