import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CreatePublication } from '../../../interfaces/Publication';
import { FileUploadService } from '../../../services/file-upload.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransformApiService } from '../../../services/transform-api.service';
import { urlValidator } from '../../../validators/urlValidators';
import { FileInfo } from '../../../interfaces/FileInfo';
import { NgClass, NgIf } from '@angular/common';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-post-publication',
  standalone: true,
  imports: [ NgClass, NgIf, ReactiveFormsModule, CounterZeroIfEmpty, EditorModule ],
  templateUrl: './post-publication.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostPublicationComponent {

  public fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private transformApiService = inject(TransformApiService);

  @Output() newPublication: EventEmitter<CreatePublication> = new EventEmitter();

  isFormVisible : boolean = false;
  isFormSubmit : boolean = false;

  fileSize!: number;

  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };

  newPublicationForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    picture: ['', [Validators.required, urlValidator]]
  });

  ngOnInit(): void {
    this.newPublicationForm.get('picture')!.setValue(this.fileUploadService.imagePublicationDefault);
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
      this.newPublicationForm.get('picture')!.setValue(inputElement.value);
    }
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
