import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';

@Component({
  selector: 'app-publication-selected',
  templateUrl: './publication-selected.component.html',
  styleUrl: './publication-selected.component.scss'
})
export class PublicationSelectedComponent extends BaseComponent {

  public route = inject(ActivatedRoute);
  public apiRequestsService = inject(ApiRequestsService);

  publicationSlug! : string;
  publicationSelected! : PublicationDto;

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.publicationSlug = params['publicationSlug'];
      this.findPublication()
    });
  }

  findPublication(): void {
    this.subscriptions.push(
      this.apiRequestsService.getPublicationBySlug(this.publicationSlug).subscribe({
        next: (publication) => this.publicationSelected = publication,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

}
