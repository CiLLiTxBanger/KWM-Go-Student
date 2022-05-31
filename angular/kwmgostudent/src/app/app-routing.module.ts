import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { OfferListComponent } from "./offer-list/offer-list.component";
import { OfferDetailsComponent } from "./offer-details/offer-details.component";
import { AccountComponent } from "./account/account.component";
import { OfferFormComponent } from "./offer-form/offer-form.component";
import { UsercommentFormComponent } from "./usercomment-form/usercomment-form.component";
import { LoginComponent } from "./login/login.component";

//variablen die varieren immer mit :
const routes:Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'offers', component:OfferListComponent},
  {path:'offers/:id', component:OfferDetailsComponent},
  {path:'account', component:AccountComponent},
  {path:'offer/create', component:OfferFormComponent},
  {path:'offer/update/:id', component:OfferFormComponent},
  {path:'offers/:id/usercomment/create', component:UsercommentFormComponent},
  {path: 'login', component: LoginComponent}
  // {path:'admin', component:BookFormComponent, canActivate:[CanNavigateToAdminGuard]},
  // {path:'admin/:isbn', component:BookFormComponent, canActivate:[CanNavigateToAdminGuard]},
  // {path:'login', component:LoginComponent},
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule],
  providers: []
  // providers: [CanNavigateToAdminGuard]
})
export class AppRoutingModule{}
