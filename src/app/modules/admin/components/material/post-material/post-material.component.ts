import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { urlValidator } from '../../../validators/urlValidators';
import { priceValidator } from '../../../validators/priceValidators';
import { FileInfo } from '../../../interfaces/FileInfo';
import { TransformApiPostService } from '../../../services/transform-api-post.service';
import { CreateMaterial } from '../../../interfaces/Material';

@Component({
  selector: 'app-post-material',
  templateUrl: './post-material.component.html',
  styles: [`
            @import "../../../scss/admin-general.scss";
          `]
})
export class PostMaterialComponent {

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private transformApiPostService : TransformApiPostService
  ){}

  @Input() materialTypes! : string[];
  @Output() newMaterial: EventEmitter<CreateMaterial> = new EventEmitter();

  isFormVisible : boolean = false;
  imageToDisplay : string = this.fileUploadService.imageMaterialDefault
  isDropdownCategoryOpen : boolean = false;
  isFormSubmit : boolean = false;

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;

  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };
  
  newMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    materialType : ['', [Validators.required]],
    price: ['', [priceValidator]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    picture: ['', [Validators.required, urlValidator]]
  });

  toggleDropdown(): void{
    this.isDropdownCategoryOpen = !this.isDropdownCategoryOpen
  }

  addEuroSign(event: any) {
    const input = event.target;
    const value = input.value;

    if (!isNaN(value)) {
        input.value = value + " €";
    }
}

  materialTypeClicked(valueClicked : string){
    this.newMaterialForm.controls['materialType'].setValue(valueClicked);
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.imageToDisplay = inputElement.value;
      this.newMaterialForm.get('picture')!.setValue(inputElement.value);
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
        this.newMaterialForm.get('picture')!.setValue(this.imageToDisplay);
      };
    } else {
      this.imageToDisplay = this.fileUploadService.imageMaterialDefault;
    }
  }

  submitNewMaterialForm(): void{

    this.newMaterialForm.get('picture')!.setValue(this.imageToDisplay);
    this.isFormSubmit = true
    
    if(this.newMaterialForm.valid){
      let createMaterial : CreateMaterial = this.transformApiPostService.postMaterielType(this.newMaterialForm)
      this.newMaterial.emit(createMaterial);
      // Après avoir envoyé, on remet les variables à zéro
      this.isFormSubmit = false;
      this.newMaterialForm.reset()
      this.imageToDisplay = this.fileUploadService.imageMaterialDefault;
    }
  }
}
