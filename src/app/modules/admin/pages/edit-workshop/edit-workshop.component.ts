import {Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { priceValidator } from '../../shared/validators/priceValidators';
import { urlValidator } from '../../shared/validators/urlValidators';
import { ApiBanService } from '../../shared/services/api/api-ban.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../shared/variables/Other';
import { futureDateValidator } from '../../shared/validators/pastDate';
import {DataSignalService} from "../../../../shared/services/data-signal.service";
import {Subscription} from "rxjs";
import {FormHelperService} from "../../shared/services/form-helper.service";
import { AdminWorkshopSignalService } from '../../shared/services/admin-workshop-signal.service';

@Component({
  standalone: false,
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styles: [` @import "../../scss/admin-general.scss"; `]
})

export class EditWorkshopComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private dataSignal = inject(DataSignalService);
  private adminWorkshopSignal = inject(AdminWorkshopSignalService);
  formHelper = inject(FormHelperService);
  fileUploadService = inject(FileUploadService);
  apiBanService = inject(ApiBanService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  private subscription!: Subscription;

  editWorkshopForm  = this.formBuilder.group({
    slug: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    date: ['', [Validators.required, futureDateValidator()]],
    address: ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator()]],
    picture: ['', [Validators.required, urlValidator()]],
    pictureThumbnail: ['', [Validators.required, urlValidator()]],
    registrations: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.dataSignal.getWorkshopBySlug(params['workshopSlug']));
    this.subscription = this.dataSignal.$workshopBySlug.subscribe(
      (workshop) => {
        if (workshop) {
          this.patchFormValue(workshop);
        }
      });
  }

  patchFormValue(workshop: WorkshopDto): void {
    this.editWorkshopForm.get('slug')!.setValue(workshop.slug);
    this.editWorkshopForm.get('title')!.setValue(workshop.title);
    this.editWorkshopForm.get('description')!.setValue(workshop.description);
    this.editWorkshopForm.get('date')!.setValue(this.formatDate(this.formHelper.jsonStringify(workshop.date)));
    this.editWorkshopForm.get('address')!.setValue(workshop.address);
    this.editWorkshopForm.get('price')!.setValue(workshop.price.toString());
    this.editWorkshopForm.get('picture')!.setValue(workshop.picture);
    this.editWorkshopForm.get('pictureThumbnail')!.setValue(workshop.pictureThumbnail);
    this.editWorkshopForm.get('registrations')!.setValue((workshop.registrations).toString());
  }

  formatDate(dateString: string): string {
    // Retirer les guillemets de la chaîne JSON et convertir en format acceptable par datetime-local
    return dateString.replace(/"/g, '');
  }

  searchAddress(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.length > 3) {
      this.apiBanService.getAddress(inputElement.value).subscribe((address) => {
        this.apiBanService.addressList = address.features;
      });
    }
  }

  onAddressClicked(addressClicked: string): void {
    this.editWorkshopForm.get('address')!.setValue(addressClicked);
  }

  onFileSelected(event: Event): void {
    this.fileUploadService.onFileSelected(event, this.editWorkshopForm).subscribe();
  }

  submitEditWorkshopForm(): void{
    this.formHelper.isFormSubmit = true
    if (this.editWorkshopForm.valid) {
      const EDITED_WORKSHOP : WorkshopDto = this.formHelper.formatFormToDto(this.editWorkshopForm)
      this.adminWorkshopSignal.put(EDITED_WORKSHOP);
      this.formHelper.resetAllValues(this.editWorkshopForm);
    }
  }
}
