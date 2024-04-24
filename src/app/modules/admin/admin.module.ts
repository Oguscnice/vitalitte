import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ManageMaterialsComponent } from './pages/manage-materials/manage-materials.component';
import { ManageNotebooksComponent } from './pages/manage-notebooks/manage-notebooks.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
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
import { ManageCategoriesComponent } from './components/category/manage-categories/manage-categories.component';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/manage-categories-collections/manage-categories-collections.component';
import { ManageCollectionsComponent } from './components/collection/manage-collections/manage-collections.component';
import { PostActivityComponent } from './components/activity/post-activity/post-activity.component';
import { EditDeleteActivityComponent } from './components/activity/edit-delete-activity/edit-delete-activity.component';
import { ManageWorkshopsComponent } from './pages/manage-workshops/manage-workshops.component';
import { PostWorkshopComponent } from './components/workshop/post-workshop/post-workshop.component';
import { EditDeleteWorkshopComponent } from './components/workshop/edit-delete-workshop/edit-delete-workshop.component';
import { EditWorkshopComponent } from './pages/edit-workshop/edit-workshop.component';
import { PostPublicationComponent } from './components/publication/post-publication/post-publication.component';
import { EditDeletePublicationComponent } from './components/publication/edit-delete-publication/edit-delete-publication.component';
import { PostGiftcardComponent } from './components/giftcard/post-giftcard/post-giftcard.component';
import { EditDeleteGiftcardComponent } from './components/giftcard/edit-delete-giftcard/edit-delete-giftcard.component';
import { ManageGiftcardsComponent } from './pages/manage-giftcards/manage-giftcards.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    ManageMaterialsComponent,
    ManageNotebooksComponent,
    ManagePublicationsComponent,
    EditMaterialComponent,
    EditWorkshopComponent,
    EditDeleteNotebookComponent,
    ManageContactsComponent,
    ManageGiftcardsComponent,
    ManageCategoriesCollectionsComponent,
    ManageWorkshopsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    AnguilleComponent,
    ModalComponent,
    ManageCategoriesComponent,
    ManageCollectionsComponent,
    ReturnAdminHomeComponent,
    EditDeleteMaterialComponent,
    AddEuroCurrencyPipe,
    PostMaterialComponent,
    CounterZeroIfEmpty,
    PostNotebookComponent,
    PostWorkshopComponent,
    EditDeleteWorkshopComponent,
    PostPublicationComponent,
    EditDeletePublicationComponent,
    PostGiftcardComponent,
    EditDeleteGiftcardComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AdminModule { }
