import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { urlValidator } from '../../../validators/urlValidators';
import { priceValidator } from '../../../validators/priceValidators';
import { FileInfo } from '../../../interfaces/FileInfo';
import { CreateMaterial } from '../../../interfaces/Material';
import { NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { TransformApiService } from '../../../services/transform-api.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../variables/Other';

@Component({
  standalone: true,
  imports: [ NgClass, NgIf, ReactiveFormsModule, TitleCasePipe, NgFor, EditorModule, CounterZeroIfEmpty ],
  selector: 'app-post-material',
  templateUrl: './post-material.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostMaterialComponent {

  protected fileUploadService = inject(FileUploadService)
  private formBuilder = inject(FormBuilder)
  private transformApiService = inject(TransformApiService);

  @Input() materialTypes! : string[];
  @Output() newMaterial: EventEmitter<CreateMaterial> = new EventEmitter();

  isFormVisible : boolean = false;
  isDropdownCategoryOpen : boolean = false;
  isFormSubmit : boolean = false;

  fileSize!: number;

  public toolBarConfig = TOOLS_BAR_CONFIG_EDITOR
  
  newMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    materialType : ['', [Validators.required]],
    price: ['', [priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    picture: ['', [Validators.required, urlValidator()]]
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
      this.newMaterialForm.get('picture')!.setValue(inputElement.value);
    }
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      this.fileSize = selectedFile.size;

      if (this.fileSize < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.newMaterialForm.get('picture')!.setValue(fileInfo.data.thumb.url);
      };
    } else {
      this.newMaterialForm.get('picture')!.setValue(this.fileUploadService.imageMaterialDefault);
    }
  }

  submitNewMaterialForm(): void {

    this.isFormSubmit = true
    
    if(this.newMaterialForm.valid){
      let createMaterial : CreateMaterial = this.transformApiService.postMaterielType(this.newMaterialForm)
      this.newMaterial.emit(createMaterial);
      // Après avoir envoyé, on remet les variables à zéro
      this.isFormSubmit = false;
      this.newMaterialForm.reset()
      this.newMaterialForm.get('picture')!.setValue(this.fileUploadService.imageMaterialDefault);
    }
  }
}
