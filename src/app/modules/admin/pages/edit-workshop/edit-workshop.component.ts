import { ApiRequestsService } from 'src/app/shared/services/api-requests.service';
import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TransformApiService } from '../../services/transform-api.service';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { priceValidator } from '../../validators/priceValidators';
import { urlValidator } from '../../validators/urlValidators';
import { ApiWorkshopAdminService } from '../../services/api-workshop-admin.service';
import { ApiBanService } from '../../services/api-ban.service';
import { FileInfo } from '../../interfaces/FileInfo';

@Component({
  selector: 'app-edit-workshop',
  standalone: false,
  templateUrl: './edit-workshop.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]})
export class EditWorkshopComponent extends BaseComponent {

  public route = inject(ActivatedRoute);
  public fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private router  = inject(Router);
  private transformApiService = inject(TransformApiService);
  public apiBanService = inject(ApiBanService);
  private apiRequestsService = inject(ApiRequestsService);
  private apiWorkshopAdminService = inject(ApiWorkshopAdminService);

  workshopSlug! : WorkshopDto['slug'];
  workshopSelected! : WorkshopDto;

  isFormSubmit : boolean = false;
  modalVisible : boolean = false;
  modalText! : string;

  fileSize!: number;


  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };

  editWorkshopForm  = this.formBuilder.group({
    slug: [this.workshopSlug, [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    date: ['', [Validators.required]],
    address: ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator]],
    picture: ['', [Validators.required, urlValidator]],
    registrations: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.workshopSlug = params['workshopSlug'];
      this.getWorkshop();
    });
  }

  getWorkshop(): void {
    this.subscriptions.push(
      this.apiRequestsService.getWorkshopBySlug(this.workshopSlug).subscribe({
        next: (workshop) =>{
          this.workshopSelected = workshop;
          this.updateEditFormValue();
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  updateEditFormValue(): void {
    this.editWorkshopForm.get('slug')!.setValue(this.workshopSelected.slug);
    this.editWorkshopForm.get('title')!.setValue(this.workshopSelected.title);
    this.editWorkshopForm.get('description')!.setValue(this.workshopSelected.description);
    this.editWorkshopForm.get('date')!.setValue((this.workshopSelected.date).toString());
    this.editWorkshopForm.get('address')!.setValue(this.workshopSelected.address);
    this.editWorkshopForm.get('price')!.setValue(this.workshopSelected.price.toString());
    this.editWorkshopForm.get('picture')!.setValue(this.workshopSelected.picture);
    this.editWorkshopForm.get('registrations')!.setValue((this.workshopSelected.registrations).toString());
  }

  searchAdress(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement.value.length > 3){
      this.apiBanService.getAdress(inputElement.value).subscribe((adress) => {
        this.apiBanService.adressList = adress.features;
      });
    }
  }

  adressSelected(adsressClicked: string): void {
    this.editWorkshopForm.get('address')!.setValue(adsressClicked);
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      if (selectedFile.size < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.editWorkshopForm.get('picture')!.setValue(fileInfo.data.thumb.url);
      };
    }
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.editWorkshopForm.get('picture')!.setValue(inputElement.value);
    }
  }

  submitEditWorkshopForm(): void{

    this.isFormSubmit = true
    
    if(this.editWorkshopForm.valid){
      let editedWorkshop : WorkshopDto = this.transformApiService.putWorkshop(this.editWorkshopForm)
      this.put(editedWorkshop);
    }
  }

  put(editedWorkshop : WorkshopDto): void {
    this.subscriptions.push(
      this.apiWorkshopAdminService.put(editedWorkshop).subscribe({
        next: (res) => {
          this.modalText = res.message;
          this.modalVisible = true;
          this.isFormSubmit = false;
        },
        error: (err) => (this.changeMessage(err.error.message))
      })
    )
  }

  responseForModal(response : boolean): void {
    this.router.navigate(['/admin/gestion-des-ateliers']);
  }
}
