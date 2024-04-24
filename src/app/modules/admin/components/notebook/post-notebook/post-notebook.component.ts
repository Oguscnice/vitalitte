import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadService } from '../../../services/file-upload.service';
import { CreateNotebook } from '../../../interfaces/Notebook';
import { priceValidator } from '../../../validators/priceValidators';
import { urlValidator } from '../../../validators/urlValidators';
import { FileInfo } from '../../../interfaces/FileInfo';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { DecimalPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { TransformApiService } from '../../../services/transform-api.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../variables/Other';

@Component({
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty ],
  selector: 'app-post-notebook',
  templateUrl: './post-notebook.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostNotebookComponent {

  protected fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private transformApiService = inject(TransformApiService);

  @Input() materialTypes! : string[];
  @Input() materials! : MaterialDto[];
  @Input() categories! : CategoryDto[];
  @Input() collections! : CollectionDto[];

  @Output() newNotebook: EventEmitter<CreateNotebook> = new EventEmitter();

  isFormVisible : boolean = true;
  isDropdownCategoryOpen : boolean = false;
  isDropdownCollectionOpen : boolean = false;
  isDropdownMaterialsOpen : boolean = false;
  isFormSubmit : boolean = false;

  categoryDtoForNewNotebook : CategoryDto | null = null; 
  collectionDtoForNewNotebook : CollectionDto | null = null; 
  materialsDtoForNewNotebook : MaterialDto[] = [];
  secondaryPicturesForNewNotebook : CreateNotebook['secondaryPictures'] = [];

  fileSize!: number;

  public toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  ngOnInit(): void {
    this.newNotebookForm.get('mainPicture')!.setValue(this.fileUploadService.imageNotebookDefault);
  }
  
  newNotebookForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    mainPicture: ['', [Validators.required, urlValidator()]],
    introduction: ['', [Validators.required, Validators.maxLength(500)]],
    price: ['', [priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  toggleDropdown(dropdownClicked : 'collectionDropdown' | 'categoryDropdown' | 'materialsDropdown'): void{
    if(dropdownClicked === 'categoryDropdown'){
      this.isDropdownCategoryOpen = !this.isDropdownCategoryOpen;
      this.isDropdownMaterialsOpen = false;
      this.isDropdownCollectionOpen = false;
    }else if(dropdownClicked === 'materialsDropdown'){
      this.isDropdownMaterialsOpen = !this.isDropdownMaterialsOpen;
      this.isDropdownCategoryOpen = false;
      this.isDropdownCollectionOpen = false;
    }else if(dropdownClicked === 'collectionDropdown'){
      this.isDropdownCollectionOpen = !this.isDropdownCollectionOpen;
      this.isDropdownCategoryOpen = false;
      this.isDropdownMaterialsOpen = false;
    }
  }

  categoryClicked(categoryClicked : CategoryDto){
    this.categoryDtoForNewNotebook = categoryClicked;
  }

  collectionClicked(collectionClicked : CollectionDto){
    this.collectionDtoForNewNotebook = collectionClicked;
  }

  materialClicked(materialClicked : MaterialDto): void {
    if(!this.materialsDtoForNewNotebook.includes(materialClicked)){
      this.materialsDtoForNewNotebook.push(materialClicked)
    }
  }

  deleteMaterialFromList(materialClicked : MaterialDto): void {
    this.materialsDtoForNewNotebook = this.materialsDtoForNewNotebook.filter(
      material => material.slug !== materialClicked.slug
    )
  }

  deleteSecondaryPictureFromList(pictureUrl : string): void {
    this.secondaryPicturesForNewNotebook = this.secondaryPicturesForNewNotebook.filter(
      picture => picture !== pictureUrl
    )
  }

  changeImageValue(event: KeyboardEvent, pictureChanged : 'mainPicture' | 'secondaryPicture'): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      if (pictureChanged === 'mainPicture'){
        this.newNotebookForm.get('mainPicture')!.setValue(inputElement.value);
      } else if (pictureChanged === 'secondaryPicture'){
        this.secondaryPicturesForNewNotebook.push(inputElement.value)
      }
    }
  }

  totalPriceMaterials(): number{
    if(this.materialsDtoForNewNotebook.length > 0){
      let sum = 0;
      for(let material of this.materialsDtoForNewNotebook){
        sum += material.price
      }
      return sum;
    }
    return 0;
  }

  async onFileSelected(event: Event, pictureChanged : 'mainPicture' | 'secondaryPicture'): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {

      if (selectedFile.size < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        if (pictureChanged === 'mainPicture'){
          this.newNotebookForm.get('mainPicture')!.setValue(fileInfo.data.thumb.url);
        } else if (pictureChanged === 'secondaryPicture'){
          this.secondaryPicturesForNewNotebook.push(fileInfo.data.image.url)
        }
      };
    }
  }

  submitNewNotebookForm(): void{

    this.isFormSubmit = true
    
    if(this.newNotebookForm.valid
      && this.categoryDtoForNewNotebook
      && this.collectionDtoForNewNotebook
      && this.materialsDtoForNewNotebook.length > 0){

      let createdNotebook : CreateNotebook = this.transformApiService.postNotebook(this.newNotebookForm, this.materialsDtoForNewNotebook, this.categoryDtoForNewNotebook, this.collectionDtoForNewNotebook, this.secondaryPicturesForNewNotebook)
      this.newNotebook.emit(createdNotebook);
      
      // Après avoir envoyé, on remet les variables à zéro
      this.isFormSubmit = false;
      this.categoryDtoForNewNotebook = null;
      this.materialsDtoForNewNotebook = [];
      this.secondaryPicturesForNewNotebook = [];
      this.newNotebookForm.reset();
      this.newNotebookForm.get('mainPicture')!.setValue(this.fileUploadService.imageNotebookDefault);
    }
  }
}
