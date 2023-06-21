import { NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions} from '@angular/router'

// Components
import { LoginComponent } from "./components/login/login.component";
import { RedirectComponent } from "./components/redirect/redirect.component";
import { HomeComponent } from "./components/home/home.component";

// Guards
import { AuthGuardService } from "./services/auth-guard";

const RootRouter: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'redirect', component: RedirectComponent},
    {
        path: 'home', 
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {    
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
]

const RouterConfig: ExtraOptions = {useHash: false}

@NgModule({
    imports: [RouterModule.forRoot(RootRouter, RouterConfig)],
    exports: [RouterModule]
})
export class AppRoutingModule{}