import { NgClass, TitleCasePipe } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {
  ChangeSizePaginationAndValueSearchComponent
} from "../../../../../components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {
  ChangePageButtonsPagination
} from "../../../../../components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {BaseComponent} from "../../../../../base.component";
import {ModalSignalService} from "../../../../../shared/services/modal-signal.service";
import {AdminPublicationSignalService} from "../../../shared/services/admin-publication-signal.service";
import {FileService} from "../../../../../shared/services/file.service";

@Component({
  imports: [NgClass, TitleCasePipe, ReactiveFormsModule, EditorModule, CounterZeroIfEmpty, ChangeSizePaginationAndValueSearchComponent, ChangePageButtonsPagination ],
  selector: 'app-edit-delete-publication',
  templateUrl: './edit-delete-publication.component.html',
  styles: [`
    @use "../../../scss/admin-general.scss";
    @use "../../../scss/admin-form.scss";
    @use "../../../scss/admin-button.scss";
    @use "../../../scss/admin-toggle.scss";
    @use "../../../scss/admin-table.scss";
    @use "../../../../../scss/forms.scss";
    @use "../../../../../scss/dropdowns.scss";
    @use "../../../../../scss/buttons.scss";
    @use "../../../../../scss/table.scss";
  `]
})
export class EditDeletePublicationComponent extends BaseComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private modalSignal = inject(ModalSignalService);
  private adminPublicationSignal = inject(AdminPublicationSignalService);
  private dataSignal = inject(DataSignalService);
  formHelper = inject(FormHelperService);
  fileService = inject(FileService);

  publications$ = this.dataSignal.$publications;

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  editPublicationForm = this.formBuilder.group({
    slug: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    pictureDto: ['', [Validators.required]],
    spotlighted: [ true ],
    createdAt: [ new Date() ]
  });

  ngOnInit(): void {
    this.dataSignal.getPublicationsPaginated();
    this.subscribeToPublicationBySlugSignal();
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
    this.dataSignal.getPublicationsPaginated();
  }

  openModalWithDescription(publicationDescription : PublicationDto['description']): void{
    this.modalSignal.showModal(publicationDescription, false);
  }

  patchFormValue(publication : PublicationDto | null): void {
    if (publication) {
      this.editPublicationForm.get('slug')!.setValue(publication.slug);
      this.editPublicationForm.get('title')!.setValue(publication.title);
      this.editPublicationForm.get('description')!.setValue(publication.description);
      this.editPublicationForm.get('pictureDto')!.setValue(publication.pictureDto.fileName);
      this.editPublicationForm.get('spotlighted')!.setValue(publication.spotlighted);
      this.editPublicationForm.get('createdAt')!.setValue(publication.createdAt);
      this.fileService.picture = publication.pictureDto;
      setTimeout(() =>
          document.getElementById('editPublication')!.scrollIntoView()
        , 20)
    } else {
      this.editPublicationForm.reset();
      setTimeout(() =>
          document.getElementById('title')!.scrollIntoView()
        , 20)
    }
  }

  submitEditPublicationForm(): void {

    this.formHelper.isFormSubmit = true

    if (this.editPublicationForm.valid) {
      const EDITED_PUBLICATION: PublicationDto = this.formHelper.formatFormWithMainPicture<PublicationDto>(this.editPublicationForm, this.fileService.picture!);
      this.adminPublicationSignal.put(EDITED_PUBLICATION);
      this.formHelper.resetAllValues(this.editPublicationForm);
    }
  }

  changeSpotlight = (publication : PublicationDto) => this.adminPublicationSignal.changeSpotlight(publication);
  delete = (publicationSelected : PublicationDto) => this.adminPublicationSignal.confirmationModalForDeletePublication(publicationSelected);
}
