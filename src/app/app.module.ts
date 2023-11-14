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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AuthGuard, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
