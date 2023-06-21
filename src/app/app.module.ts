import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';

// Modules
import { AppRoutingModule } from './app.router';
import { RedirectComponent } from './components/redirect/redirect.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

// JWT
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { token_getter } from './services/token-getter';

// Services
import { ServiceModule } from './services';

const JWTConfig: JwtModuleOptions = {
  config: {
    tokenGetter: token_getter,
  }
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RedirectComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceModule,
    JwtModule.forRoot(JWTConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
