import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PublicationDto } from 'src/app/shared/interfaces/Publication';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { FileUploadService } from '../../../services/file-upload.service';
import { urlValidator } from '../../../validators/urlValidators';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FileInfo } from '../../../interfaces/FileInfo';
import { TransformApiService } from '../../../services/transform-api.service';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../variables/Other';

@Component({
  standalone: true,
  imports: [ NgClass, TitleCasePipe, AddEuroCurrencyPipe, RouterLink, ReactiveFormsModule, EditorModule, CounterZeroIfEmpty, ModalComponent ],
  selector: 'app-edit-delete-publication',
  templateUrl: './edit-delete-publication.component.html',
  styles: [ `@import "../../../scss/admin-general.scss"; `]
})
export class EditDeletePublicationComponent {

  protected fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private transformApiService = inject(TransformApiService);

  @Input() publications! : PublicationDto[];
  @Output() changePublicationSpotlight: EventEmitter<PublicationDto> = new EventEmitter();
  @Output() publicationEdited: EventEmitter<PublicationDto> = new EventEmitter();
  @Output() publicationToDelete: EventEmitter<PublicationDto> = new EventEmitter();

  isTableVisible: boolean = true;

  modalVisible : boolean = false;
  modalText! : string;

  publicationToEdit : PublicationDto | null = null;
  isFormSubmit : boolean = false;

  fileSize!: number;

  editPublicationForm = this.formBuilder.group({
    slug: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    picture: ['', [Validators.required, urlValidator()]]
  });

  protected toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  openModalWithDescription(publicationDescription : PublicationDto['description']): void{
    this.modalVisible = true;
    this.modalText = publicationDescription;
  }

  responseForModal(response: boolean): void {
    this.modalVisible = false;
  }

  edit(publication : PublicationDto): void {
    if(this.publicationToEdit) {
      this.publicationToEdit = null;
      this.editPublicationForm.reset();
    } else {
      this.publicationToEdit = publication;
      this.editPublicationForm.get('slug')!.setValue(publication.slug);
      this.editPublicationForm.get('title')!.setValue(publication.title);
      this.editPublicationForm.get('description')!.setValue(publication.description);
      this.editPublicationForm.get('picture')!.setValue(publication.picture);
    }
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      if (selectedFile.size < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.editPublicationForm.get('picture')!.setValue(fileInfo.data.thumb.url);
      };
    }
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.editPublicationForm.get('picture')!.setValue(inputElement.value);
    }
  }

  submitEditPublicationForm(): void {

    this.isFormSubmit = true

    if(this.editPublicationForm.valid){
      let editedPublication : PublicationDto = this.transformApiService.putPublication(this.editPublicationForm, this.publicationToEdit!)
      this.publicationEdited.emit(editedPublication);
      this.publicationToEdit = null;
    }
  }

  changeSpotlight = (publication : PublicationDto) => this.changePublicationSpotlight.emit(publication);
  delete = (publicationSelected : PublicationDto) => this.publicationToDelete.emit(publicationSelected);
}
