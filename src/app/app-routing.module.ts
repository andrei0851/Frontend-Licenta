import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import {MyaccountComponent} from "./myaccount/myaccount.component";
import {AdminGuardService} from "./services/admin-guard.service";
import {AdminComponent} from "./admin/admin.component";
import {OwnerComponent} from "./owner/owner.component";
import {OwnerGuardService} from "./services/owner-guard.service";
import {AdvancedSComponent} from "./advanced-s/advanced-s.component";
import {AddListingComponent} from "./add-listing/add-listing.component";
import {MyListingsComponent} from "./my-listings/my-listings.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {DetailsComponent} from "./details/details.component";
import {ResultsComponent} from "./results/results.component";
import {BuyComponent} from "./buy/buy.component";
import {EditComponent} from "./edit/edit.component";
import {CompanyComponent} from "./company-panel/company.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {BranchDetailComponent} from "./branch-detail/branch-detail.component";
import {ResetComponent} from "./reset/reset.component";

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'advanced-s',
    component: AdvancedSComponent,
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
  {
    path: 'reset',
    component: ResetComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'myaccount',
    component: MyaccountComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'buy/:id',
    component: BuyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: 'owner',
    component: OwnerComponent,
    canActivate: [OwnerGuardService],
  },
  {
    path: 'company-panel',
    component: CompanyComponent,
    canActivate: [OwnerGuardService],
  },
  {
    path:'add-listing',
    component: AddListingComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'my-listings',
    component: MyListingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'branch/:id',
    component: BranchDetailComponent,
  },
  {
    path:'edit',
    component: EditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path:'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
