import {Component, inject, OnInit} from '@angular/core';
import {DataSignalService} from "../../../../../shared/services/data-signal.service";
import {AdminCategorySignalService} from "../../../shared/services/admin-category-signal.service";
import {NgClass} from "@angular/common";
import {CategoryDto} from "../../../../../shared/interfaces/Category";
import { FileService } from 'src/app/shared/services/file.service';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormHelperService} from "../../../shared/services/form-helper.service";
import {EditorComponent} from "@tinymce/tinymce-angular";
import {TOOLS_BAR_CONFIG_EDITOR} from "../../../shared/variables/Other";
import {CounterZeroIfEmpty} from "../../../../../shared/services/pipes/counter-zero-if-empty.pipe";

@Component({
  selector: 'app-edit-delete-category',

  imports: [
    NgClass,
    ReactiveFormsModule,
    EditorComponent,
    CounterZeroIfEmpty
  ],
  templateUrl: './edit-delete-category.component.html',
  styleUrl: './edit-delete-category.component.scss'
})
export class EditDeleteCategoryComponent implements OnInit {

  private dataSignal = inject(DataSignalService);
  private adminCategorySignal = inject(AdminCategorySignalService);
  private formBuilder  = inject(FormBuilder);
  protected readonly toolBarConfig = TOOLS_BAR_CONFIG_EDITOR;
  fileService = inject(FileService);
  formHelper = inject(FormHelperService);
  categories$ = this.dataSignal.$categories;

  editCategoryForm = this.formBuilder.group({
    slug: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(65534)]],
    pictureDto: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.dataSignal.getAllCategories();
  }

  editCategory(categoryDto: CategoryDto): void {
    this.editCategoryForm.get('slug')!.setValue(categoryDto.slug);
    this.editCategoryForm.get('name')!.setValue(categoryDto.name);
    this.editCategoryForm.get('description')!.setValue(categoryDto.description);
    this.editCategoryForm.get('pictureDto')!.setValue(categoryDto.pictureDto.fileName);
    this.fileService.picture = categoryDto.pictureDto;
    setTimeout(() =>
        document.getElementById('editCategory')!.scrollIntoView()
      , 20)
  }

  cancelEditCategory(): void {
    this.formHelper.resetAllValues(this.editCategoryForm);
    this.fileService.resetAllValues();
  }

  confirmationModalForDeleteCategory(category: CategoryDto): void {
    this.adminCategorySignal.confirmationModalForDeleteCategory(category);
  }

  submitEditCategoryForm(): void {
    this.formHelper.isFormSubmit = true
    if (this.editCategoryForm.valid) {
      const EDITED_CATEGORY = this.formHelper.formatFormWithMainPicture<CategoryDto>(this.editCategoryForm, this.fileService.picture!);
      this.adminCategorySignal.putCategory(EDITED_CATEGORY);
      this.cancelEditCategory();
    }
  }
}
