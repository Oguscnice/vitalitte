import {Component, inject, OnInit} from '@angular/core';
import { CreatePublication } from '../../../shared/interfaces/CreatePublication';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { urlValidator } from '../../../shared/validators/urlValidators';
import { NgClass } from '@angular/common';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TOOLS_BAR_CONFIG_EDITOR } from '../../../shared/variables/Other';
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {AdminPublicationSignalService} from "../../../shared/services/admin-publication-signal.service";

@Component({
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, CounterZeroIfEmpty, EditorModule ],
  selector: 'app-post-publication',
  templateUrl: './post-publication.component.html',
  styles: [` @import "../../../scss/admin-general.scss"; `]
})
export class PostPublicationComponent implements OnInit {

  fileUploadService = inject(FileUploadService);
  private formBuilder = inject(FormBuilder);
  private formHelper = inject(FormHelperService);
  private adminPublicationSignal = inject(AdminPublicationSignalService);

  isFormVisible : boolean = false;
  isFormSubmit : boolean = false;

  toolBarConfig = TOOLS_BAR_CONFIG_EDITOR

  newPublicationForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    picture: ['', [Validators.required, urlValidator()]],
    pictureThumbnail: ['', [Validators.required, urlValidator()]]
  });

  ngOnInit(): void {
    this.fileUploadService.patchImage(this.newPublicationForm, this.fileUploadService.imagePublicationDefault, this.fileUploadService.imagePublicationDefaultThumbnail);
  }

  onFileSelected(event: Event): void {
    this.fileUploadService.onFileSelected(event, this.newPublicationForm).subscribe();
  }

  submitNewPublicationForm(): void {
    this.isFormSubmit = true;
    if(this.newPublicationForm.valid){
      const CREATED_PUBLICATION: CreatePublication = this.formHelper.formatFormToDto<CreatePublication>(this.newPublicationForm);
      this.adminPublicationSignal.post(CREATED_PUBLICATION);
      this.resetAllValues();
    }
  }

  resetAllValues(): void {
    this.isFormVisible = false;
    this.isFormSubmit = true;
    this.newPublicationForm.reset();
    this.fileUploadService.patchImage(this.newPublicationForm, this.fileUploadService.imagePublicationDefault, this.fileUploadService.imagePublicationDefaultThumbnail);
  }
}
