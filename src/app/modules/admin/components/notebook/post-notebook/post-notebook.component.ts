import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { TransformApiPostService } from '../../../services/transform-api-post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { CreateNotebook } from '../../../interfaces/Notebook';
import { priceValidator } from '../../../validators/priceValidators';
import { urlValidator } from '../../../validators/urlValidators';
import { FileInfo } from '../../../interfaces/FileInfo';

@Component({
  selector: 'app-post-notebook',
  templateUrl: './post-notebook.component.html',
  styles: [`
            @import "../../../scss/admin-general.scss";
          `]
})
export class PostNotebookComponent {

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private transformApiPostService : TransformApiPostService
  ){}

  @Input() materialTypes! : string[];
  @Input() materials! : MaterialDto[];
  @Input() categories! : CategoryDto[];

  @Output() newNotebook: EventEmitter<CreateNotebook> = new EventEmitter();

  isFormVisible : boolean = false;
  imageToDisplay : string = this.fileUploadService.imageNotebookDefault
  isDropdownOpen : boolean = false;
  isFormSubmit : boolean = false;

  secondaryPicturesForNewNotebook : CreateNotebook['secondaryPictures'] = [];
  materialsDtoForNewNotebook : CreateNotebook['materialsDto'] = []; 
  categoryDtoForNewNotebook : CategoryDto | null = null; 

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;

  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };
  
  newNotebookForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    mainPicture: ['', [Validators.required, urlValidator]],
    introduction: ['', [Validators.required, Validators.maxLength(500)]],
    price: ['', [priceValidator]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  toogleDropdown(): void{
    this.isDropdownOpen = !this.isDropdownOpen
  }

  materialTypeClicked(valueClicked : string){
    // this.newNotebookForm.controls['materialType'].setValue(valueClicked);
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.imageToDisplay = inputElement.value;
      this.newNotebookForm.get('mainPicture')!.setValue(inputElement.value);
    }
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      this.fileSize = selectedFile.size;

      if (this.fileSize < this.fileSizeMax) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.imageToDisplay = fileInfo.data.thumb.url;
        this.newNotebookForm.get('mainPicture')!.setValue(this.imageToDisplay);
      };
    } else {
      this.imageToDisplay = this.fileUploadService.imageMaterialDefault;
    }
  }

  submitNewNotebookForm(): void{

    this.newNotebookForm.get('mainPicture')!.setValue(this.imageToDisplay);
    this.isFormSubmit = true
    
    if(this.newNotebookForm.valid
      && this.categoryDtoForNewNotebook !== null){
      let createdNotebook : CreateNotebook = this.transformApiPostService.postNotebookComponent(this.newNotebookForm, this.materialsDtoForNewNotebook, this.categoryDtoForNewNotebook, this.secondaryPicturesForNewNotebook)
      this.newNotebook.emit(createdNotebook);
      // Après avoir envoyé, on remet les variables à zéro
      this.isFormSubmit = false;
      this.newNotebookForm.reset()
      this.imageToDisplay = this.fileUploadService.imageMaterialDefault;
    }
  }
}
