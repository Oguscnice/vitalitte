import {Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkshopDto } from 'src/app/shared/interfaces/Workshop';
import { priceValidator } from '../../shared/validators/priceValidators';
import { ApiBanService } from '../../shared/services/api/api-ban.service';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../shared/variables/Other';
import { futureDateValidator } from '../../shared/validators/pastDate';
import {DataSignalService} from "../../../../shared/services/data-signal.service";
import {FormHelperService} from "../../shared/services/form-helper.service";
import { AdminWorkshopSignalService } from '../../shared/services/admin-workshop-signal.service';
import {FileService} from "../../../../shared/services/file.service";
import {BaseComponent} from "../../../../base.component";

@Component({
  standalone: false,
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styles: [`
    @use "../../scss/admin-general.scss";
    @use "../../scss/admin-form.scss";
    @use "../../scss/admin-button.scss";
    @use "../../../../scss/forms.scss";
    @use "../../../../scss/dropdowns.scss";
    @use "../../../../scss/buttons.scss";
  `]
})

export class EditWorkshopComponent extends BaseComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private dataSignal = inject(DataSignalService);
  private adminWorkshopSignal = inject(AdminWorkshopSignalService);
  formHelper = inject(FormHelperService);
  fileService = inject(FileService);
  apiBanService = inject(ApiBanService);

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  editWorkshopForm  = this.formBuilder.group({
    slug: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    date: ['', [Validators.required, futureDateValidator()]],
    address: ['', [Validators.required]],
    price: ['', [Validators.required, priceValidator()]],
    pictureDto: ['', [Validators.required]],
    registrations: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.dataSignal.getWorkshopBySlug(params['workshopSlug']));
    this.subscribeToWorkshopBySlugSignal();
  }

  private subscribeToWorkshopBySlugSignal(): void {
    this.subscriptions.push(
      this.dataSignal.$workshopBySlug.subscribe(
      (workshop) => {
        if (workshop) {
          this.patchFormValue(workshop);
        }
      })
    )
  }

  patchFormValue(workshop: WorkshopDto): void {
    this.editWorkshopForm.get('slug')!.setValue(workshop.slug);
    this.editWorkshopForm.get('title')!.setValue(workshop.title);
    this.editWorkshopForm.get('description')!.setValue(workshop.description);
    this.editWorkshopForm.get('date')!.setValue(this.formatDate(this.formHelper.jsonStringify(workshop.date)));
    this.editWorkshopForm.get('address')!.setValue(workshop.address);
    this.editWorkshopForm.get('price')!.setValue(workshop.price.toString());
    this.editWorkshopForm.get('pictureDto')!.setValue(workshop.pictureDto.fileName);
    this.editWorkshopForm.get('registrations')!.setValue((workshop.registrations).toString());
    this.fileService.picture = workshop.pictureDto;
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

  submitEditWorkshopForm(): void {
    this.formHelper.isFormSubmit = true
    if (this.editWorkshopForm.valid) {
      const EDITED_WORKSHOP : WorkshopDto = this.formHelper.formatFormWithMainPicture<WorkshopDto>(this.editWorkshopForm, this.fileService.picture!)
      this.adminWorkshopSignal.put(EDITED_WORKSHOP);
      this.formHelper.resetAllValues(this.editWorkshopForm);
    }
  }
}
