import {Component, inject, OnInit} from '@angular/core';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CreateWorkshop } from '../../../shared/interfaces/Workshop';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { urlValidator } from '../../../shared/validators/urlValidators';
import { priceValidator } from '../../../shared/validators/priceValidators';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { ApiBanService } from '../../../shared/services/api/api-ban.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {AdminWorkshopSignalService} from "../../../shared/services/admin-workshop-signal.service";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {BaseComponent} from "../../../../../base.component";
import {AnguilleSignalService} from "../../../../../shared/services/anguille-signal.service";

@Component({
  selector: 'app-post-workshop',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, TitleCasePipe, DecimalPipe, EditorModule, CounterZeroIfEmpty ],
  templateUrl: './post-workshop.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})

export class PostWorkshopComponent extends BaseComponent implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private formHelper: FormHelperService = inject(FormHelperService);
  private adminWorkshopSignal: AdminWorkshopSignalService = inject(AdminWorkshopSignalService);
  private anguilleSignal: AnguilleSignalService = inject(AnguilleSignalService);
  apiBanService: ApiBanService = inject(ApiBanService);
  fileUploadService: FileUploadService = inject(FileUploadService);

  isFormVisible: boolean = false;
  isFormSubmit: boolean = false;

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  newWorkshopForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    date: ['', [Validators.required]],
    address: ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator()]],
    picture: ['', [Validators.required, urlValidator()]],
    pictureThumbnail: ['', [Validators.required, urlValidator()]],
    registrations: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.fileUploadService.patchImage(this.newWorkshopForm, this.fileUploadService.imageActivityDefault, this.fileUploadService.imageActivityDefaultThumbnail)
  }

  searchAddress(event: KeyboardEvent): void {
    const INPUT_ELEMENT: HTMLInputElement = event.target as HTMLInputElement;
    if (INPUT_ELEMENT.value.length > 3) {
      this.subscriptions.push(
        this.apiBanService.getAddress(INPUT_ELEMENT.value).subscribe({
          next: (address): void => this.apiBanService.addressList = address.features,
          error: (err): void => this.anguilleSignal.changeMessage(err.error.message)
        })
      )
    }
  }

  onFileSelected(event: Event, form: FormGroup): void {
    this.fileUploadService.onFileSelected(event, form).subscribe();
  }

  onAddressClicked(addressClicked: string): void {
    this.newWorkshopForm.get('address')!.setValue(addressClicked);
  }

  submitNewWorkshopForm(): void {

    this.isFormSubmit = true;

    if (this.newWorkshopForm.valid) {
      const CREATED_WORKSHOP: CreateWorkshop = this.formHelper.formatFormToDto<CreateWorkshop>(this.newWorkshopForm)
      this.adminWorkshopSignal.post(CREATED_WORKSHOP);
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormSubmit = false;
    this.isFormVisible = false;
    this.newWorkshopForm.reset();
    this.fileUploadService.patchImage(this.newWorkshopForm, this.fileUploadService.imageActivityDefault, this.fileUploadService.imageActivityDefaultThumbnail)
  }
}
