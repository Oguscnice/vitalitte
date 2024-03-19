import { ApiMaterialAdminService } from './../../services/api-material-admin.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/base.component';
import { MaterialDto } from 'src/app/shared/interfaces/Material';
import { FileUploadService } from '../../services/file-upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { urlValidator } from '../../validators/urlValidators';
import { priceValidator } from '../../validators/priceValidators';
import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { FileInfo } from '../../interfaces/FileInfo';
import { TransformApiPutService } from '../../services/transform-api-put.service';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.scss']
})
export class EditMaterialComponent extends BaseComponent{

  constructor(
    public route: ActivatedRoute,
    private apiMaterialAdminService : ApiMaterialAdminService,
    private apiRequestsService : ApiRequestsService,
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private transformApiPutService : TransformApiPutService
  ){
    super()
  }

  materialSlug! : MaterialDto['slug'];
  materialSelected! : MaterialDto;
  materialTypes : string[] = [];

  imageToDisplay! : string;
  isDropdownOpen : boolean = false;
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

  editMaterialForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    materialType : ['', [Validators.required]],
    price: ['', [priceValidator]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    picture: ['', [Validators.required, urlValidator]]
  });

  override ngOnInit(){
    this.route.params.subscribe((params) => {
      this.materialSlug = params['materielSlug'];
      this.getMaterial();
      this.getAllMaterialsTypes();
    });
    super.ngOnInit();
  }

  getMaterial():void{
    this.subscriptions.push(
      this.apiMaterialAdminService.getBySlug(this.materialSlug).subscribe({
        next: (material) =>{
          this.materialSelected = material;
          this.updateEditFormValueValue();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  getAllMaterialsTypes(): void{
    this.subscriptions.push(
      this.apiRequestsService.getAllMaterialsTypes().subscribe({
        next: (materialsTypes) => {
          this.materialTypes = materialsTypes
          this.updateTypeFormValueValue();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  updateEditFormValueValue(): void {
    this.editMaterialForm.get('name')!.setValue(this.materialSelected.name);
    this.editMaterialForm.get('price')!.setValue(this.materialSelected.price.toString());
    this.editMaterialForm.get('description')!.setValue(this.materialSelected.description);
    this.editMaterialForm.get('picture')!.setValue(this.materialSelected.picture);
    this.imageToDisplay = this.materialSelected.picture;
  }

  updateTypeFormValueValue(): void {
    this.editMaterialForm.get('materialType')!.setValue(this.materialSelected.materialType);
  }

  toogleDropdown(): void{
    this.isDropdownOpen = !this.isDropdownOpen
  }

  materialTypeClicked(valueClicked : string){
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
        this.imageToDisplay = fileInfo.data.thumb.url;
        this.editMaterialForm.get('picture')!.setValue(this.imageToDisplay);
      };
    } else {
      this.imageToDisplay = this.fileUploadService.imageMaterialDefault;
    }
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.imageToDisplay = inputElement.value;
      this.editMaterialForm.get('picture')!.setValue(inputElement.value);
    }
  }

  submitEditMaterialForm(): void{

    this.editMaterialForm.get('picture')!.setValue(this.imageToDisplay);
    this.isFormSubmit = true
    
    if(this.editMaterialForm.valid){
      let materialToEdit : MaterialDto = this.transformApiPutService.putMateriel(this.editMaterialForm, this.materialSlug)
      this.putMaterial(materialToEdit);
    }
  }

  putMaterial(materialToEdit : MaterialDto): void{
    this.subscriptions.push(
      this.apiMaterialAdminService.put(materialToEdit).subscribe({
        next: (res) => {
          this.changeMessage(res.message);
          // Après avoir envoyé, on remet les variables à zéro
          this.isFormSubmit = false;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }
}
