import { NgModule } from '@angular/core';

// Services 
import { AuthGuardService } from './auth-guard';
import { AuthService } from './auth.service';
import { OauthService } from './oauth.service';
import { LocalStorageService } from './storage.service';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        AuthGuardService,
        AuthService,
        OauthService,
        LocalStorageService
    ],
})
export class ServiceModule {}