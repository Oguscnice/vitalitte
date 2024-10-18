import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ManageMaterialsComponent } from './pages/stationery/material/manage-materials/manage-materials.component';
import { ManageProductsComponent } from './pages/stationery/product/manage-products/manage-products.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { PostMaterialComponent } from './components/stationery/material/post-material/post-material.component';
import { EditDeleteMaterialComponent } from './components/stationery/material/edit-delete-material/edit-delete-material.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { AnguilleComponent } from 'src/app/components/anguille/anguille.component';
import { EditMaterialComponent } from './pages/stationery/material/edit-material/edit-material.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ReturnAdminHomeComponent } from './components/return-admin-home/return-admin-home.component';
import { PostProductComponent } from './components/stationery/product/post-product/post-product.component';
import { EditDeleteProductComponent } from './components/stationery/product/edit-delete-product/edit-delete-product.component';
import { ManageCategoriesComponent } from './components/stationery/category/manage-categories/manage-categories.component';
import { CounterZeroIfEmpty } from 'src/app/shared/services/pipes/counter-zero-if-empty.pipe';
import { AddEuroCurrencyPipe } from 'src/app/shared/services/pipes/add-euro-currency.pipe';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/stationery/manage-categories-collections/manage-categories-collections.component';
import { ManageCollectionsComponent } from './components/stationery/collection/manage-collections/manage-collections.component';
import { ManageWorkshopsComponent } from './pages/manage-workshops/manage-workshops.component';
import { PostWorkshopComponent } from './components/workshop/post-workshop/post-workshop.component';
import { EditDeleteWorkshopComponent } from './components/workshop/edit-delete-workshop/edit-delete-workshop.component';
import { EditWorkshopComponent } from './pages/edit-workshop/edit-workshop.component';
import { PostPublicationComponent } from './components/publication/post-publication/post-publication.component';
import { EditDeletePublicationComponent } from './components/publication/edit-delete-publication/edit-delete-publication.component';
import { EditProductComponent } from './pages/stationery/product/edit-product/edit-product.component';
import {ManageGiftCardsComponent} from "./pages/manage-giftcards/manage-giftcards.component";
import {EditDeleteGiftCardComponent} from "./components/giftcard/edit-delete-giftcard/edit-delete-giftcard.component";
import {PostGiftCardComponent} from "./components/giftcard/post-giftcard/post-giftcard.component";
import {EnumProductTypeFormatPipe} from "../../shared/services/pipes/enum-product-type-format.pipe";

@NgModule({
  declarations: [
    AdminHomeComponent,
    ManageMaterialsComponent,
    ManageProductsComponent,
    ManagePublicationsComponent,
    EditMaterialComponent,
    EditWorkshopComponent,
    EditProductComponent,
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
        PostProductComponent,
        EditDeleteProductComponent,
        PostWorkshopComponent,
        EditDeleteWorkshopComponent,
        PostPublicationComponent,
        EditDeletePublicationComponent,
        PostGiftCardComponent,
        EditDeleteGiftCardComponent,
        EnumProductTypeFormatPipe,
    ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class AdminModule { }
