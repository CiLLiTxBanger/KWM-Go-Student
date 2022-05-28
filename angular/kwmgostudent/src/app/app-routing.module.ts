import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { OfferListComponent } from "./offer-list/offer-list.component";
import { OfferDetailsComponent } from "./offer-details/offer-details.component";
import { AccountComponent } from "./account/account.component";

//variablen die varieren immer mit :
const routes:Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'offers', component:OfferListComponent},
  {path:'offers/:id', component:OfferDetailsComponent},
  {path:'account', component:AccountComponent},
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
