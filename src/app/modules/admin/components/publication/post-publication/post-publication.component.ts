import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CreatePublication } from '../../../interfaces/Publication';
import { FileUploadService } from '../../../services/file-upload.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransformApiService } from '../../../services/transform-api.service';
import { urlValidator } from '../../../validators/urlValidators';
import { FileInfo } from '../../../interfaces/FileInfo';
import { NgClass } from '@angular/common';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../variables/Other';

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, CounterZeroIfEmpty, EditorModule ],
  selector: 'app-post-publication',
  templateUrl: './post-publication.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostPublicationComponent {

  protected fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private transformApiService = inject(TransformApiService);

  @Output() newPublication: EventEmitter<CreatePublication> = new EventEmitter();

  protected isFormVisible : boolean = false;
  protected isFormSubmit : boolean = false;

  protected fileSize!: number;

  protected toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  newPublicationForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    picture: ['', [Validators.required, urlValidator()]]
  });

  ngOnInit(): void {
    this.updateImageValue(this.fileUploadService.imagePublicationDefault);
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      if (selectedFile.size < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.newPublicationForm.get('picture')!.setValue(fileInfo.data.thumb.url);
      };
    }
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.updateImageValue(inputElement.value)
    }
  }

  updateImageValue(value: string): void {
    this.newPublicationForm.get('picture')!.setValue(value);
  }

  submitNewPublicationForm(): void {

    this.isFormSubmit = true;

    if(this.newPublicationForm.valid){
      let createdPublication : CreatePublication = this.transformApiService.postPublication(this.newPublicationForm)
      this.newPublication.emit(createdPublication);
      this.isFormVisible = false;
      this.isFormSubmit = true;
      this.newPublicationForm.get('title')!.setValue('');
      this.newPublicationForm.get('description')!.setValue('');
      this.newPublicationForm.get('picture')!.setValue(this.fileUploadService.imagePublicationDefault);
    }
  }
}
