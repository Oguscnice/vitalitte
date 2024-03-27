import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { httpInterceptorProviders } from './shared/interceptors';
import { HttpClientModule } from '@angular/common/http';
import { NotebooksComponent } from './pages/notebooks-pages/notebooks/notebooks.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { BooktiqueComponent } from './pages/booktique/booktique.component';
import { ContactComponent } from './pages/contact/contact.component';
import { H1Component } from './components/h1/h1.component';
import { ValuesComponent } from './components/values/values.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { NgIf } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { FormulaireEnvoyeComponent } from './pages/formulaire-envoye/formulaire-envoye.component';
import { NotebooksPreparedComponent } from './pages/notebooks-pages/notebooks-prepared/notebooks-prepared.component';
import { NotebookSelectedComponent } from './pages/notebooks-pages/notebook-selected/notebook-selected.component';
import { NotebooksListComponent } from './components/notebooks-list/notebooks-list.component';
import { CreateNotebookComponent } from './pages/notebooks-pages/create-notebook/create-notebook.component';
import { ImagesPreviewComponent } from './components/images-preview/images-preview.component';
import { NewsHeadbandComponent } from './components/news-headband/news-headband.component';
import { UpArrowComponent } from './components/up-arrow/up-arrow.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { ShoppingNotebooksListComponent } from './components/shopping-notebooks-list/shopping-notebooks-list.component';
import { ChoicesPersonalizedCreationComponent } from './components/choices-personalized-creation/choices-personalized-creation.component';
import { AnguilleComponent } from './shared/components/anguille/anguille.component';
import { WorkshopComponent } from './pages/workshop/workshop.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    Page404Component,
    NotebooksComponent,
    BiographyComponent,
    BooktiqueComponent,
    ContactComponent,
    H1Component,
    ValuesComponent,
    ContactFormComponent,
    LoaderComponent,
    FormulaireEnvoyeComponent,
    NotebooksPreparedComponent,
    NotebookSelectedComponent,
    NotebooksListComponent,
    CreateNotebookComponent,
    ImagesPreviewComponent,
    NewsHeadbandComponent,
    UpArrowComponent,
    PaypalComponent,
    ShoppingNotebooksListComponent,
    ChoicesPersonalizedCreationComponent,
    WorkshopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgIf,
    NgxPayPalModule,
    AnguilleComponent,
    ModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthGuard,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
