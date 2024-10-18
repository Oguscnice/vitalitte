import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { httpInterceptorProviders } from './shared/interceptors';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/products-pages/products/products.component';
import { BiographyComponent } from './pages/biography/biography.component';
import { BooktiqueComponent } from './pages/booktique/booktique.component';
import { ContactComponent } from './pages/contact/contact.component';
import { H1Component } from './components/h1/h1.component';
import { ValuesComponent } from './components/values/values.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormSendComponent } from './pages/form-send/form-send.component';
import { ProductSelectedComponent } from './pages/products-pages/product-selected/product-selected.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CreateProductComponent } from './pages/products-pages/create-product/create-product.component';
import { ImagesPreviewComponent } from './components/images-preview/images-preview.component';
import { NewsHeadbandComponent } from './components/news-headband/news-headband.component';
import { UpArrowComponent } from './components/up-arrow/up-arrow.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { ShoppingProductsListComponent } from './components/shopping-products-list/shopping-products-list.component';
import { ChoicesPersonalizedCreationComponent } from './components/choices-personalized-creation/choices-personalized-creation.component';
import { WorkshopsComponent } from './pages/workshops-pages/workshop/workshops.component';
import { RouterLink } from '@angular/router';
import { PublicationsComponent } from './pages/publications-pages/publications/publications.component';
import { PublicationThumbnailComponent } from './components/publication-thumbnail/publication-thumbnail.component';
import { PublicationSelectedComponent } from './pages/publications-pages/publication-selected/publication-selected.component';
import { WorkshopThumbnailComponent } from './components/workshop-thumbnail/workshop-thumbnail.component';
import { ModalComponent } from './components/modal/modal.component';
import {CurrencyPipe, DecimalPipe, TitleCasePipe} from '@angular/common';
import { AnguilleComponent } from './components/anguille/anguille.component';
import {
    ChangeSizePaginationAndValueSearchComponent
} from "./components/change-size-pagination-and-value-search/change-size-pagination-and-value-search.component";
import {
  ChangePageButtonsPagination
} from "./components/change-page-buttons-pagination/change-page-buttons-pagination.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {CustomCurrencyPipe} from "./shared/services/pipes/custom-currency.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckoutFormComponent} from "./components/checkout-form/checkout-form.component";
import {
    CartItemQuantityManagerComponent
} from "./components/cart-item-quantity-manager/cart-item-quantity-manager.component";
import {ReviewThumbnailComponent} from "./components/review/review-thumbnail/review-thumbnail.component";
import {PostReviewFormComponent} from "./components/review/post-review-form/post-review-form.component";
import {EnumProductTypeFormatPipe} from "./shared/services/pipes/enum-product-type-format.pipe";
import {CarouselProductComponent} from "./components/carousel-product/carousel-product.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    Page404Component,
    ProductsComponent,
    BiographyComponent,
    BooktiqueComponent,
    ContactComponent,
    FormSendComponent,
    ProductSelectedComponent,
    CreateProductComponent,
    WorkshopsComponent,
    PublicationsComponent,
    PublicationSelectedComponent,
    CheckoutComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterLink,
        TitleCasePipe,

        HeaderComponent,
        NewsHeadbandComponent,
        H1Component,
        FooterComponent,
        UpArrowComponent,
        ImagesPreviewComponent,
        ValuesComponent,
        ShoppingProductsListComponent,
        ChoicesPersonalizedCreationComponent,
        PaypalComponent,
        ContactFormComponent,
        ProductsListComponent,
        PublicationThumbnailComponent,
        WorkshopThumbnailComponent,
        ModalComponent,
        AnguilleComponent,
        ChangeSizePaginationAndValueSearchComponent,
        ChangePageButtonsPagination,
        CustomCurrencyPipe,
        ReactiveFormsModule,
        CheckoutFormComponent,
        CartItemQuantityManagerComponent,
        ReviewThumbnailComponent,
        PostReviewFormComponent,
        EnumProductTypeFormatPipe,
        CarouselProductComponent
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe,
    AuthGuard,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
