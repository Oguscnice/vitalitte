import { NgClass, TitleCasePipe } from '@angular/common';
import {Component, inject, OnInit, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { urlValidator } from '../../../shared/validators/urlValidators';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {
  ChangeSizePaginationAndValueSearchComponent
} from "../../../../../components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {
  ChangePageButtonsPagination
} from "../../../../../components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {Observable} from "rxjs";
import {BaseComponent} from "../../../../../base.component";
import {ModalSignalService} from "../../../../../shared/services/modal-signal.service";
import {AdminPublicationSignalService} from "../../../shared/services/admin-publication-signal.service";
import {PaginationSignalService} from "../../../../../shared/services/pagination-signal.service";

@Component({
  standalone: true,
  imports: [NgClass, TitleCasePipe, AddEuroCurrencyPipe, RouterLink, ReactiveFormsModule, EditorModule, CounterZeroIfEmpty, ModalComponent, ChangeSizePaginationAndValueSearchComponent, ChangePageButtonsPagination ],
  selector: 'app-edit-delete-publication',
  templateUrl: './edit-delete-publication.component.html',
  styles: [ `@import "../../../scss/admin-general.scss"; `]
})
export class EditDeletePublicationComponent extends BaseComponent implements OnInit {

  fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private formHelper = inject(FormHelperService);
  private modalSignal = inject(ModalSignalService);
  private adminPublicationSignal = inject(AdminPublicationSignalService);
  private dataSignal = inject(DataSignalService);
  private paginationSignal = inject(PaginationSignalService);

  publications: Signal<PublicationDto[]> = this.dataSignal.$publications;

  isTableVisible: boolean = false;
  isFormSubmit : boolean = false;

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  editPublicationForm = this.formBuilder.group({
    slug: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    picture: ['', [Validators.required, urlValidator()]],
    pictureThumbnail: ['', [Validators.required, urlValidator()]],
    spotlighted: [ true ],
    createdAt: [ new Date() ]
  });

  ngOnInit(): void {
    this.reloadPaginationValueAndCounter();
    this.subscribeAll();
  }

  private subscribeAll(): void {
    this.subscribeToPublicationBySlugSignal();
    this.subscribeCounterPublicationValueChange();
  }

  private subscribeCounterPublicationValueChange(): void {
    this.subscriptions.push(
      this.dataSignal.$publicationsCounter.subscribe((counter: number) => this.paginationSignal.setCounterItem(counter))
    )
  }

  private subscribeToPublicationBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$publicationBySlug.subscribe(
        (publication) => {
          if (publication) {
            this.patchFormValue(publication);
          }
        })
    )
  }

  onValuePageChange(event : string): void {
    this.reloadPaginationValueAndCounter();
  }

  private reloadPaginationValueAndCounter(): void {
    this.dataSignal.getPublicationsPaginated();
    this.dataSignal.getCounterPublications();
  }

  openModalWithDescription(publicationDescription : PublicationDto['description']): void{
    this.modalSignal.showModal(publicationDescription, false);
  }

  patchFormValue(publication : PublicationDto | null): void {
    if (publication) {
      this.editPublicationForm.get('slug')!.setValue(publication.slug);
      this.editPublicationForm.get('title')!.setValue(publication.title);
      this.editPublicationForm.get('description')!.setValue(publication.description);
      this.editPublicationForm.get('picture')!.setValue(publication.picture);
      this.editPublicationForm.get('pictureThumbnail')!.setValue(publication.pictureThumbnail);
      this.editPublicationForm.get('spotlighted')!.setValue(publication.spotlighted);
      this.editPublicationForm.get('createdAt')!.setValue(publication.createdAt);
    } else {
      this.editPublicationForm.reset();
    }
  }

  onFileSelected(event: Event): void {
    this.fileUploadService.onFileSelected(event, this.editPublicationForm).subscribe();
  }

  submitEditPublicationForm(): void {

    this.isFormSubmit = true

    if (this.editPublicationForm.valid) {
      const EDITED_PUBLICATION: PublicationDto = this.formHelper.formatFormToDto(this.editPublicationForm);
      this.adminPublicationSignal.put(EDITED_PUBLICATION);
    }
  }

  changeSpotlight = (publication : PublicationDto) => this.adminPublicationSignal.changeSpotlight(publication);
  delete = (publicationSelected : PublicationDto) => this.adminPublicationSignal.confirmationModalForDeletePublication(publicationSelected);
}
