import { ApiMaterialAdminService } from './../../services/api-material-admin.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { FileUploadService } from '../../services/file-upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { urlValidator } from '../../validators/urlValidators';
import { priceValidator } from '../../validators/priceValidators';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { FileInfo } from '../../interfaces/FileInfo';
import { TransformApiService } from '../../services/transform-api.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../variables/Other';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})
export class EditMaterialComponent extends BaseComponent{

  private apiRequestsService = inject(ApiRequestsService);
  private  apiMaterialAdminService = inject(ApiMaterialAdminService);
  public route = inject(ActivatedRoute);
  private fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private router  = inject(Router);
  private transformApiService = inject(TransformApiService);

  constructor(){
    super()
  }

  materialSlug! : MaterialDto['slug'];
  materialSelected! : MaterialDto;
  materialTypes : string[] = [];

  isDropdownCategoryOpen : boolean = false;
  isFormSubmit : boolean = false;
  modalVisible : boolean = false;
  modalText! : string;

  fileSizeMax: number = this.fileUploadService.SIZE_MAX;
  fileSize!: number;

  public toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  editMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    materialType : ['', [Validators.required]],
    price: ['', [priceValidator()]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    picture: ['', [Validators.required, urlValidator()]]
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.materialSlug = params['materielSlug'];
      this.getMaterial();
      this.getAllMaterialsTypes();
    });
  }

  getMaterial(): void {
    this.subscriptions.push(
      this.apiMaterialAdminService.getBySlug(this.materialSlug).subscribe({
        next: (material) =>{
          this.materialSelected = material;
          this.updateEditFormValue();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterialsTypes(): void {
    this.subscriptions.push(
      this.apiMaterialAdminService.getAllMaterialsTypes().subscribe({
        next: (materialsTypes) => this.materialTypes = materialsTypes,
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  updateEditFormValue(): void {
    this.editMaterialForm.get('name')!.setValue(this.materialSelected.name);
    this.editMaterialForm.get('price')!.setValue(this.materialSelected.price.toString());
    this.editMaterialForm.get('materialType')!.setValue(this.materialSelected.materialType);
    this.editMaterialForm.get('description')!.setValue(this.materialSelected.description);
    this.editMaterialForm.get('picture')!.setValue(this.materialSelected.picture);
  }

  toggleDropdown(): void{
    this.isDropdownCategoryOpen = !this.isDropdownCategoryOpen
  }

  materialTypeClicked(valueClicked : string): void {
    this.editMaterialForm.controls['materialType'].setValue(valueClicked);
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      this.fileSize = selectedFile.size;

      if (this.fileSize < this.fileSizeMax) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.editMaterialForm.get('picture')!.setValue(fileInfo.data.thumb.url);
      };
    } else {
      this.editMaterialForm.get('picture')!.setValue(this.fileUploadService.imageMaterialDefault);
    }
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.editMaterialForm.get('picture')!.setValue(inputElement.value);
    }
  }

  submitEditMaterialForm(): void {

    this.isFormSubmit = true
    
    if(this.editMaterialForm.valid){
      let materialToEdit : MaterialDto = this.transformApiService.putMateriel(this.editMaterialForm, this.materialSlug)
      this.putMaterial(materialToEdit);
    }
  }

  responseForModal(response : boolean): void {
    this.router.navigate(['/admin/gestion-des-materiaux']);
  }

  putMaterial(materialToEdit : MaterialDto): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.put(materialToEdit).subscribe({
        next: (res) => {
          this.modalText = res.message;
          // Après avoir envoyé, on vérouille le formulaire pour empêcher une nouvelle modif sur un slug non existant
          this.modalVisible = true;
          // Après avoir envoyé, on remet les variables à zéro
          this.isFormSubmit = false;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
