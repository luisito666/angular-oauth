import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
         RouterStateSnapshot,
         CanActivate,
         CanLoad
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
    constructor(
        private auth: AuthService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.auth.isAuthenticated();
    }

    canLoad(): boolean {
        return this.auth.isAuthenticated();
    }
}
