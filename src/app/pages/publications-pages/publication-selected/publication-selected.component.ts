import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import {FileService} from "../../../shared/services/file.service";

@Component({
  standalone: false,
  selector: 'app-publication-selected',
  templateUrl: './publication-selected.component.html',
  styles: [`

    @use "../../../scss/variables.scss" as variablesScss;

    .actuality-date {
      font-size: variablesScss.$normal-font-size;
      margin-bottom: variablesScss.$normal-margin;
    }

  `]
})
export class PublicationSelectedComponent extends BaseComponent {

  private route = inject(ActivatedRoute);
  private apiRequestsService = inject(ApiRequestsService);
  fileService = inject(FileService);

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
        next: (publication) => {
          this.publicationSelected = publication
          console.log(publication)
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

}
