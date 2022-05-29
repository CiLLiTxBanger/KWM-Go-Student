import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListItemComponent } from './offer-list-item/offer-list-item.component';
import { KwmGoStudentService } from "./shared/kwm-go-student.service";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { AccountComponent } from './account/account.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { OfferFormComponent } from './offer-form/offer-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { JsonPipe } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    OfferListComponent,
    OfferListItemComponent,
    HomeComponent,
    OfferDetailsComponent,
    AccountComponent,
    OfferFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [KwmGoStudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
