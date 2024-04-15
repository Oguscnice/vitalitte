import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransformApiService } from '../../../services/transform-api.service';
import { CreateWorkshop } from '../../../interfaces/Workshop';
import { DecimalPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { urlValidator } from '../../../validators/urlValidators';
import { priceValidator } from '../../../validators/priceValidators';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { ApiBanService } from '../../../services/api-ban.service';
import { FileInfo } from '../../../interfaces/FileInfo';

@Component({
  selector: 'app-post-workshop',
  standalone: true,
  imports: [ NgClass, NgIf, NgFor, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty ],
  templateUrl: './post-workshop.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})

export class PostWorkshopComponent {

  public fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private transformApiService = inject(TransformApiService);
  private apiBan = inject(ApiBanService)

  @Output() newWorkshop: EventEmitter<CreateWorkshop> = new EventEmitter();

  isFormVisible : boolean = false;
  isFormSubmit : boolean = false;
  isDropdownBanOpen : boolean = false;
  adressList!: any;

  fileSize!: number;

  public toolBarConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins : 'lists',
    menubar: false,
    toolbar: 'undo redo cut copy paste bold italic strikethrough numlist bullist styles alignleft aligncenter alignright alignjustify ',
  };

  ngOnInit(): void {
    this.newWorkshopForm.get('picture')!.setValue(this.fileUploadService.imageActivityDefault);
  }

  newWorkshopForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    date: ['', [Validators.required]],
    adress: ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator]],
    picture: ['', [Validators.required, urlValidator]],
    registrations: ['', [Validators.required]],
  });

  toggleDropdown(boolean : boolean): void {
    this.isDropdownBanOpen = boolean
  }

  searchAdress(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement.value.length > 3){
      this.apiBan.getAdress(inputElement.value).subscribe((adress) => {
        this.adressList = adress.features;
      });
    }
  }

  adressSelected(adressClicked: string): void {
    this.newWorkshopForm.get('adress')!.setValue(adressClicked);
  }

  async onFileSelected(event: Event): Promise<void> {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files?.[0];
    let fileInfo: FileInfo | null = null;

    if (selectedFile) {
      if (selectedFile.size < this.fileUploadService.SIZE_MAX) {
        fileInfo = await this.fileUploadService.fileUpload(event);
        this.newWorkshopForm.get('picture')!.setValue(fileInfo.data.thumb.url);
      };
    }
  }

  changeImageValue(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if(inputElement){
      this.newWorkshopForm.get('picture')!.setValue(inputElement.value);
    }
  }

  submitNewWorkshopForm(): void{

    this.isFormSubmit = true
    if(this.newWorkshopForm.valid){
      let createdWorkshop : CreateWorkshop = this.transformApiService.postWorkshop(this.newWorkshopForm)
      console.log(createdWorkshop);
      this.newWorkshop.emit(createdWorkshop);
    }
  }
}
