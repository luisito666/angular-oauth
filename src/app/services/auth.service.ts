import { Injectable } from '@angular/core';

// Helper de autenticacion
import { JwtHelperService } from '@auth0/angular-jwt';

// Local Storage Service
import { LocalStorageService } from './storage.service';


@Injectable()
export class AuthService {
    constructor(
        private decoder: JwtHelperService,
        private stg: LocalStorageService
    ) {}

    isAuthenticated(): boolean {
        const token = this.stg.get_token();
        const isTokenExpired = this.decoder.isTokenExpired(token);
        return !isTokenExpired;
    }

    logOut(): void {
        this.stg.delete_token();
        this.stg.delete_item('id_token');
    }
}
