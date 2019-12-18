import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule , HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ShopComponent } from './components/shop/shop.component';
import { AuthGuard} from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { FontAwesomeModule , FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faSignOutAlt, faCircle } from "@fortawesome/free-solid-svg-icons";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FilterPipe } from './pipes/filter.pipe';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ShopComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { 
  constructor( library : FaIconLibrary){
    library.addIcons(faShoppingCart,faSignOutAlt, faCircle)
  }
}
