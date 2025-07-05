import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { ProductsComponent } from './pages/products-pages/products/products.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { BooktiqueComponent } from './pages/booktique/booktique.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormSendComponent } from './pages/form-send/form-send.component';
import { ProductSelectedComponent } from './pages/products-pages/product-selected/product-selected.component';
import { CreateProductComponent } from './pages/products-pages/create-product/create-product.component';
import { WorkshopsComponent } from './pages/workshops-pages/workshop/workshops.component';
import { PublicationsComponent } from './pages/publications-pages/publications/publications.component';
import { PublicationSelectedComponent } from './pages/publications-pages/publication-selected/publication-selected.component';
import { WorkshopSelectedComponent } from './pages/workshops-pages/workshop-selected/workshop-selected.component';
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {UserGuard} from "./shared/guards/user.guard";
import {TermsAndConditionsComponent} from "./pages/policies/terms-and-conditions/terms-and-conditions.component";
import {PrivacyPolicyComponent} from "./pages/policies/privacy-policy/privacy-policy.component";
import {LegalNoticeComponent} from "./pages/policies/legal-notice/legal-notice.component";
import {TermsOfServiceComponent} from "./pages/policies/terms-of-service/terms-of-service.component";
import {RefundPolicyComponent} from "./pages/policies/refund-policy/refund-policy.component";
import {ShippingPolicyComponent} from "./pages/policies/shipping-policy/shipping-policy.component";

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [UserGuard]
  },
  { path: 'connexion', component: LoginComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'qui-suis-je', component: BiographyComponent },
  { path: 'booktique', component: BooktiqueComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'actualites/:publicationSlug', component : PublicationSelectedComponent},
  { path: 'actualites', component: PublicationsComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'imaginer', component: CreateProductComponent },
  { path: 'ateliers/:workshopSlug', component : WorkshopSelectedComponent},
  { path: 'ateliers', component : WorkshopsComponent},
  { path: 'formulaire-envoye', component : FormSendComponent},
  { path: 'panier', component: CheckoutComponent },
  { path: 'produits/type/:productType', component: ProductsComponent },
  { path: 'produits/:productSlug', component: ProductSelectedComponent },
  { path: 'conditions-generales-vente', component: TermsAndConditionsComponent },
  { path: 'politique-confidentialite', component: PrivacyPolicyComponent },
  { path: 'mentions-legales', component: LegalNoticeComponent },
  { path: 'conditions-utilisation', component: TermsOfServiceComponent },
  { path: 'politique-remboursement', component: RefundPolicyComponent },
  { path: 'politique-expedition', component: ShippingPolicyComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'page-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
