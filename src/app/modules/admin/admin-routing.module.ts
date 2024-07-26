import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { ManageMaterialsComponent } from './pages/stationery/manage-materials/manage-materials.component';
import { ManageNotebooksComponent } from './pages/stationery/manage-notebooks/manage-notebooks.component';
import { ManagePublicationsComponent } from './pages/manage-publications/manage-publications.component';
import { EditMaterialComponent } from './pages/stationery/edit-material/edit-material.component';
import { ManageContactsComponent } from './pages/manage-contacts/manage-contacts.component';
import { ManageCategoriesCollectionsComponent } from './pages/stationery/manage-categories-collections/manage-categories-collections.component';
import { EditNotebookComponent } from './pages/stationery/edit-notebook/edit-notebook.component';
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
  { path: 'gestion-des-materiaux', component: ManageMaterialsComponent },
  { path: 'gestion-des-categories-et-collections', component: ManageCategoriesCollectionsComponent },
  { path: 'gestion-des-carnets', component: ManageNotebooksComponent },
  { path: 'gestion-des-commentaires', component: ManageReviewsComponent },
  { path: 'editer-materiel/:materielSlug', component : EditMaterialComponent},
  { path: 'editer-carnet/:notebookSlug', component : EditNotebookComponent},
  { path: 'gestion-des-ateliers', component: ManageWorkshopsComponent },
  { path: 'editer-atelier/:workshopSlug', component : EditWorkshopComponent},
  { path: 'gestion-des-cartes-cadeaux', component: ManageGiftCardsComponent },
  { path: 'utilisateurs-carte-cadeaux/:giftcardCode', component: UserListGiftcardsUsedComponent },
  { path: 'gestion-des-publications', component: ManagePublicationsComponent },
  { path: 'gestion-des-contacts', component: ManageContactsComponent },
  { path: 'gestion-des-options-de-livraison', component: ManageDeliveryOptionsComponent },
  { path: '', component: AdminHomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
