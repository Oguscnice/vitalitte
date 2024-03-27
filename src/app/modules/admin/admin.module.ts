import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ManageMaterialsComponent } from './pages/manage-materials/manage-materials.component';
import { ManageNotebooksComponent } from './pages/manage-notebooks/manage-notebooks.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { ManageActivitiesComponent } from './pages/manage-activities/manage-activities.component';
import { PostMaterialComponent } from './components/material/post-material/post-material.component';
import { EditDeleteMaterialComponent } from './components/material/edit-delete-material/edit-delete-material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { AnguilleComponent } from 'src/app/shared/components/anguille/anguille.component';
import { EditMaterialComponent } from './pages/edit-material/edit-material.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ReturnAdminHomeComponent } from './components/return-admin-home/return-admin-home.component';
import { PostNotebookComponent } from './components/notebook/post-notebook/post-notebook.component';
import { EditDeleteNotebookComponent } from './components/notebook/edit-delete-notebook/edit-delete-notebook.component';
import { ManageCategoriesComponent } from './pages/manage-categories/manage-categories.component';
import { PostCategoryComponent } from './components/category/post-category/post-category.component';
import { EditDeleteCategoryComponent } from './components/category/edit-delete-category/edit-delete-category.component';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { AddEuroCurrency } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageGiftCardsComponent } from './pages/manage-gift-cards/manage-gift-cards.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    ManageMaterialsComponent,
    ManageNotebooksComponent,
    ManagePublicationsComponent,
    ManageActivitiesComponent,
    PostMaterialComponent,
    EditDeleteMaterialComponent,
    EditMaterialComponent,
    ReturnAdminHomeComponent,
    PostNotebookComponent,
    EditDeleteNotebookComponent,
    ManageCategoriesComponent,
    PostCategoryComponent,
    EditDeleteCategoryComponent,
    CounterZeroIfEmpty,
    AddEuroCurrency,
    ManageContactsComponent,
    ManageGiftCardsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    AnguilleComponent,
    ModalComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AdminModule { }
