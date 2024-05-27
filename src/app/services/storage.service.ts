import { Injectable } from '@angular/core';

// JWT
import { JwtHelperService } from '@auth0/angular-jwt';

// Interfaces
import { IDToken } from '../app.interfaces';

@Injectable()
export class LocalStorageService {

    constructor(
        private jwt: JwtHelperService
    ) {}

    set_token(token: string): void {
        localStorage.setItem('token', JSON.stringify(token));
    }

    set_id_token(token: string): void {
        localStorage.setItem('id_token', JSON.stringify(token));
    }

    get_token() {
        if (localStorage.getItem('token') !== null) {
            return JSON.parse(localStorage.getItem('token') || '');
        }
    }

    get_id_token(): IDToken | undefined {
        if (localStorage.getItem('id_token') !== null) {
            const Token: string = JSON.parse(localStorage.getItem('id_token') || '');
            let IdToken: IDToken = {
                given_name: '',
                family_name: '',
                nickname: '',
                name: '',
                picture: '',
                locale: '',
                updated_at: '',
                email: '',
                email_verified: false,
                iss: '',
                aud: '',
                iat: 0,
                exp: 0,
                sub: '',
                sid: '',
            }
            IdToken = this.jwt.decodeToken(Token) || IdToken
            return IdToken
        }
        return undefined
    }

    delete_token(): void {
        localStorage.removeItem('token');
    }

    set_item(item_name: string, item: any): void {
        localStorage.setItem(item_name, JSON.stringify(item));
    }

    get_item<T>(item_name: string) {
        return <T>JSON.parse(localStorage.getItem(item_name) || '');
    }

    delete_item(item_name: string): void {
        localStorage.removeItem(item_name);
    }

}
