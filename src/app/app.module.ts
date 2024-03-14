import { NgModule } from '@angular/core';
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
import { CreationsComponent } from './pages/creations/creations.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { BooktiqueComponent } from './pages/booktique/booktique.component';
import { ContactComponent } from './pages/contact/contact.component';
import { H1Component } from './components/h1/h1.component';
import { ValuesComponent } from './components/values/values.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoaderComponent } from './components/loader/loader.component';
import { FormulaireEnvoyeComponent } from './pages/formulaire-envoye/formulaire-envoye.component';
import { NotebooksComponent } from './pages/notebooks/notebooks.component';
import { NotebookSelectedComponent } from './pages/notebook-selected/notebook-selected.component';
import { NotebooksListComponent } from './components/notebooks-list/notebooks-list.component';
import { CreateNotebookComponent } from './pages/create-notebook/create-notebook.component';
import { ImagesPreviewComponent } from './components/images-preview/images-preview.component';
import { NewsHeadbandComponent } from './components/news-headband/news-headband.component';
import { UpArrowComponent } from './components/up-arrow/up-arrow.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { ShoppingNotebooksListComponent } from './components/shopping-notebooks-list/shopping-notebooks-list.component';
import { ChoicesPersonalizedCreationComponent } from './components/choices-personalized-creation/choices-personalized-creation.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    HomeComponent,
    LoginComponent,
    Page404Component,
    CreationsComponent,
    BiographyComponent,
    BooktiqueComponent,
    ContactComponent,
    H1Component,
    ValuesComponent,
    ContactFormComponent,
    LoaderComponent,
    FormulaireEnvoyeComponent,
    NotebooksComponent,
    NotebookSelectedComponent,
    NotebooksListComponent,
    CreateNotebookComponent,
    ImagesPreviewComponent,
    NewsHeadbandComponent,
    UpArrowComponent,
    PaypalComponent,
    ShoppingNotebooksListComponent,
    ChoicesPersonalizedCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxPayPalModule,
  ],
  providers: [AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
