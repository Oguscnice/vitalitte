import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { ApiMaterialAdminService } from '../../services/api-material-admin.service';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { ApiNotebookAdminService } from '../../services/api-notebook-admin.service';
import { NotebookDto } from 'src/app/shared/interfaces/Notebook';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { BaseComponent } from 'src/app/base.component';
import { DecimalPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { urlValidator } from '../../validators/urlValidators';
import { priceValidator } from '../../validators/priceValidators';
import { FileInfo } from '../../interfaces/FileInfo';
import { CategoryDto } from 'src/app/shared/interfaces/Category';
import { CollectionDto } from 'src/app/shared/interfaces/Collection';
import { TransformApiService } from '../../services/transform-api.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../variables/Other';

@Component({
  selector: 'app-edit-notebook',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty, ModalComponent],
  templateUrl: './edit-notebook.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class EditNotebookComponent extends BaseComponent{

  private apiRequestsService = inject(ApiRequestsService);
  private apiMaterialAdminService = inject(ApiMaterialAdminService);
  private apiNotebookAdminService = inject(ApiNotebookAdminService);
  public route = inject(ActivatedRoute);
  protected fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private router  = inject(Router);
  private transformApiService = inject(TransformApiService);

  notebookSlug! : NotebookDto['slug'];
  notebookToEdit! : NotebookDto;
  materialTypes! : string[];
  materials! : MaterialDto[];
  categories! : CategoryDto[];
  collections! : CollectionDto[];

  secondaryPicturesForNotebook: NotebookDto['secondaryPictures'] = [];
  categoryDtoForNotebook : CategoryDto | null = null; 
  collectionDtoForNotebook : CollectionDto | null = null; 
  materialsDtoForNotebook : MaterialDto[] = [];

  isDropdownCategoryOpen : boolean = false;
  isDropdownCollectionOpen : boolean = false;
  isDropdownMaterialsOpen : boolean = false;
  isFormSubmit : boolean = false;

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;

  modalVisible : boolean = false;
  modalText : string = "";

  editNotebookForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', [Validators.required]],
    mainPicture: ['', [Validators.required, urlValidator()]],
    introduction: ['', [Validators.required, Validators.maxLength(500)]],
    price: ['', [priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
  });

  public toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  ngOnInit(): void {
    this.findSlugInUrl();
    this.getAllMaterials();
    this.getAllMaterialsTypes();
    this.getAllCategories();
    this.getAllCollections();
  }

  findSlugInUrl(): void {
    this.route.params.subscribe((params) => {
      this.notebookSlug = params['notebookSlug'];
      this.getNotebookBySlug();
    });
  }

  getNotebookBySlug(): void {
    this.subscriptions.push(
      this.apiRequestsService.getNotebookBySlug(this.notebookSlug).subscribe({
        next: (notebook) => {
          this.notebookToEdit = notebook;
          this.secondaryPicturesForNotebook = notebook.secondaryPictures;
          this.categoryDtoForNotebook = notebook.categoryDto;
          this.materialsDtoForNotebook = notebook.materialsDto;
          this.collectionDtoForNotebook = notebook.collectionDto;
          
          this.updateEditFormValueValue();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterialsTypes(): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.getAllMaterialsTypes().subscribe({
        next: (materialsTypes) => this.materialTypes = materialsTypes,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterials(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterials().subscribe({
        next: (materials) => this.materials = materials,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllCollections(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCollections().subscribe({
        next: (collections) => this.collections = collections,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllCategories(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllCategories().subscribe({
        next: (categories) => this.categories = categories,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  updateEditFormValueValue(): void {
    this.editNotebookForm.get('name')!.setValue(this.notebookToEdit.name);
    this.editNotebookForm.get('slug')!.setValue(this.notebookToEdit.slug);
    this.editNotebookForm.get('price')!.setValue(this.notebookToEdit.price.toString());
    this.editNotebookForm.get('introduction')!.setValue(this.notebookToEdit.introduction);
    this.editNotebookForm.get('description')!.setValue(this.notebookToEdit.description);
    this.editNotebookForm.get('mainPicture')!.setValue(this.notebookToEdit.mainPicture);
  }

  async onFileSelected(event: Event, pictureChanged : 'mainPicture' | 'secondaryPicture'): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {

      if (selectedFile.size < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        if (pictureChanged === 'mainPicture'){
          this.editNotebookForm.get('mainPicture')!.setValue(fileInfo.data.thumb.url);
        } else if (pictureChanged === 'secondaryPicture'){
          this.secondaryPicturesForNotebook.push(fileInfo.data.image.url)
        }
      };
    } else {
      this.editNotebookForm.get('mainPicture')!.setValue(this.fileUploadService.imageMaterialDefault);
    }
  }

  changeImageValue(event: KeyboardEvent, pictureChanged : 'mainPicture' | 'secondaryPicture'): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      if (pictureChanged === 'mainPicture'){
        this.editNotebookForm.get('mainPicture')!.setValue(inputElement.value);
      } else if (pictureChanged === 'secondaryPicture'){
        this.secondaryPicturesForNotebook.push(inputElement.value)
      }
    }
  }

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
    this.categoryDtoForNotebook = categoryClicked;
  }

  collectionClicked(ccollectionClicked : CollectionDto){
    this.collectionDtoForNotebook = ccollectionClicked;
  }

  materialClicked(materialClicked : MaterialDto): void {
    if(!this.materialsDtoForNotebook.includes(materialClicked)){
      this.materialsDtoForNotebook.push(materialClicked)
    }
  }

  deleteMaterialFromList(materialClicked : MaterialDto): void {
    this.materialsDtoForNotebook = this.materialsDtoForNotebook.filter(
      material => material.slug !== materialClicked.slug
    )
  }

  totalPriceMaterials(): number{
    if(this.materialsDtoForNotebook.length > 0){
      let sum = 0;
      for(let material of this.materialsDtoForNotebook){
        sum += material.price
      }
      return sum;
    }
    return 0;
  }

  deleteSecondaryPictureFromList(pictureUrl : string): void {
    this.secondaryPicturesForNotebook = this.secondaryPicturesForNotebook.filter(
      picture => picture !== pictureUrl
    )
  }

  submitEditNotebookForm(): void{

    this.isFormSubmit = true

    if(this.editNotebookForm.valid
      && this.categoryDtoForNotebook
      && this.collectionDtoForNotebook
      && this.materialsDtoForNotebook.length > 0){

      let editedNotebook : NotebookDto = this.transformApiService.putNotebook(
        this.editNotebookForm,
        this.materialsDtoForNotebook,
        this.categoryDtoForNotebook,
        this.collectionDtoForNotebook,
        this.secondaryPicturesForNotebook,
        this.notebookToEdit.available
      )
      
      this.subscriptions.push(
        this.apiNotebookAdminService.put(editedNotebook).subscribe({
          next: (res) => {
            this.modalVisible = true;
            this.modalText = res.message;
          },
          error: (err) => (this.changeMessage(err.error.message))
        })
      )

      // Après avoir envoyé, on remet les variables à zéro
      this.isFormSubmit = false;
    }
  }

  responseForModal(response : boolean): void{
    this.modalVisible = false;
    this.router.navigate(['/admin/gestion-des-carnets']);
  }
}
