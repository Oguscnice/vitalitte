import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ManageMaterialsComponent } from './pages/stationery/material/manage-materials/manage-materials.component';
import { ManageProductsComponent } from './pages/stationery/product/manage-products/manage-products.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { EditMaterialComponent } from './pages/stationery/material/edit-material/edit-material.component';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/stationery/manage-categories-collections/manage-categories-collections.component';
import { EditProductComponent } from './pages/stationery/product/edit-product/edit-product.component';
import { ManageWorkshopsComponent } from './pages/manage-workshops/manage-workshops.component';
import { EditWorkshopComponent } from './pages/edit-workshop/edit-workshop.component';
import { ManageGiftCardsComponent } from './pages/manage-giftcards/manage-giftcards.component';
import { UserListGiftcardsUsedComponent } from './pages/user-list-giftcards-used/user-list-giftcards-used.component';
import {ManageDeliveryOptionsComponent} from "./pages/manage-delivery-options/manage-delivery-options.component";
import {HomeStationeryComponent} from "./pages/stationery/home-stationery/home-stationery.component";
import {ManageReviewsComponent} from "./pages/stationery/manage-reviews/manage-reviews.component";

const routes: Routes = [
  // { path: '', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: 'accueil', component: AdminHomeComponent },
  { path: 'gestion-papeterie', component: HomeStationeryComponent },
  { path: 'gestion/materiaux', component: ManageMaterialsComponent },
  { path: 'gestion/categories-collections', component: ManageCategoriesCollectionsComponent },
  { path: 'gestion/commentaires', component: ManageReviewsComponent },
  { path: 'editer-materiel/:materielSlug', component : EditMaterialComponent},
  { path: 'gestion/ateliers', component: ManageWorkshopsComponent },
  { path: 'editer-atelier/:workshopSlug', component : EditWorkshopComponent},
  { path: 'gestion/cartes-cadeaux', component: ManageGiftCardsComponent },
  { path: 'utilisateurs-carte-cadeaux/:giftcardCode', component: UserListGiftcardsUsedComponent },
  { path: 'gestion/publications', component: ManagePublicationsComponent },
  { path: 'gestion/contacts', component: ManageContactsComponent },
  { path: 'gestion/options-de-livraison', component: ManageDeliveryOptionsComponent },
  { path: 'gestion/:productType', component: ManageProductsComponent },
  { path: 'editer-produit/:productSlug', component : EditProductComponent},
  { path: '', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
