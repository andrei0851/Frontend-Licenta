import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { TokenInterceptorService} from "./interceptors/token-interceptor.service";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { AdvancedSComponent } from './advanced-s/advanced-s.component';
import { MatRadioModule} from "@angular/material/radio";
import { MatCardModule} from "@angular/material/card";
import { MatDividerModule} from "@angular/material/divider";
import { AddListingComponent } from './add-listing/add-listing.component';
import { VechileCardComponent } from './vechile-card/vechile-card.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DetailsComponent } from './details/details.component';
import { ResultsComponent } from './results/results.component';
import {MatSelectModule} from "@angular/material/select";
import { BuyComponent } from './buy/buy.component';
import {NgxPayPalModule} from "ngx-paypal";
import { EditComponent } from './edit/edit.component';
import { CompanyComponent } from './company-panel/company.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ResetComponent } from './reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    MyaccountComponent,
    AdminComponent,
    OwnerComponent,
    AdvancedSComponent,
    AddListingComponent,
    VechileCardComponent,
    MyListingsComponent,
    FavoritesComponent,
    DetailsComponent,
    ResultsComponent,
    BuyComponent,
    EditComponent,
    CompanyComponent,
    ConfirmComponent,
    BranchDetailComponent,
    ResetComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatCardModule,
        MatDividerModule,
        FormsModule,
        MatSelectModule,
        NgxPayPalModule,
      MatDialogModule
    ],
  providers: [AuthGuardService ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
