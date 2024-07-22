import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ManageMaterialsComponent } from './pages/stationery/manage-materials/manage-materials.component';
import { ManageNotebooksComponent } from './pages/stationery/manage-notebooks/manage-notebooks.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { PostMaterialComponent } from './components/material/post-material/post-material.component';
import { EditDeleteMaterialComponent } from './components/material/edit-delete-material/edit-delete-material.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { AnguilleComponent } from 'src/app/components/anguille/anguille.component';
import { EditMaterialComponent } from './pages/stationery/edit-material/edit-material.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ReturnAdminHomeComponent } from './components/return-admin-home/return-admin-home.component';
import { PostNotebookComponent } from './components/notebook/post-notebook/post-notebook.component';
import { EditDeleteNotebookComponent } from './components/notebook/edit-delete-notebook/edit-delete-notebook.component';
import { ManageCategoriesComponent } from './components/category/manage-categories/manage-categories.component';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/stationery/manage-categories-collections/manage-categories-collections.component';
import { ManageCollectionsComponent } from './components/collection/manage-collections/manage-collections.component';
import { ManageWorkshopsComponent } from './pages/manage-workshops/manage-workshops.component';
import { PostWorkshopComponent } from './components/workshop/post-workshop/post-workshop.component';
import { EditDeleteWorkshopComponent } from './components/workshop/edit-delete-workshop/edit-delete-workshop.component';
import { EditWorkshopComponent } from './pages/edit-workshop/edit-workshop.component';
import { PostPublicationComponent } from './components/publication/post-publication/post-publication.component';
import { EditDeletePublicationComponent } from './components/publication/edit-delete-publication/edit-delete-publication.component';
import { UserListGiftcardsUsedComponent } from './pages/user-list-giftcards-used/user-list-giftcards-used.component';
import { EditNotebookComponent } from './pages/stationery/edit-notebook/edit-notebook.component';
import {ManageGiftCardsComponent} from "./pages/manage-giftcards/manage-giftcards.component";
import {EditDeleteGiftCardComponent} from "./components/giftcard/edit-delete-giftcard/edit-delete-giftcard.component";
import {PostGiftCardComponent} from "./components/giftcard/post-giftcard/post-giftcard.component";

@NgModule({
  declarations: [
    AdminHomeComponent,
    ManageMaterialsComponent,
    ManageNotebooksComponent,
    ManagePublicationsComponent,
    EditMaterialComponent,
    EditWorkshopComponent,
    EditNotebookComponent,
    ManageContactsComponent,
    ManageGiftCardsComponent,
    ManageCategoriesCollectionsComponent,
    ManageWorkshopsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgClass,
    TitleCasePipe,
    DecimalPipe,
    EditorModule,
    CounterZeroIfEmpty,
    ModalComponent,
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
    EditDeleteNotebookComponent,
    PostWorkshopComponent,
    EditDeleteWorkshopComponent,
    PostPublicationComponent,
    EditDeletePublicationComponent,
    PostGiftCardComponent,
    EditDeleteGiftCardComponent,
    UserListGiftcardsUsedComponent,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AdminModule { }
