import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Cripto
import * as CryptoJS from 'crypto-js';

// Env
import { environment } from 'src/environments/environment';

// Intefaces
import { TokenResponse } from 'src/app/app.interfaces';

// HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class OauthService {

    baseURL: string = environment.oauthURL
    clientID: string = environment.clientID
    grantType: string = environment.grantType
    redirectURL: string = environment.redirectURL
    responseType: string = environment.responseType
    scope: string = environment.scope
    codeChallengeMethod: string = environment.codeChallengeMethod

    randomString!: string
    codeChallenge!: string

    constructor(
        private http: HttpClient
    ) {}


    getToken(
        state: string,
        code: string    
    ): Observable<TokenResponse>  {
        const Url = `${this.baseURL}/oauth/token`
        const headers: HttpHeaders = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
        const data = `grant_type=${this.grantType}&redirect_uri=${this.redirectURL}&client_id=${this.clientID}&code_verifier=${state}&code=${code}`
        return this.http.post<TokenResponse>(Url, data, {headers: headers})
    }

    generateLoginURL(): string {
        this.randomString = this.genRandomString(57)
        this.codeChallenge = this.hashKeyWebSafe(this.randomString)
        return this.generateURL(this.randomString, this.codeChallenge)
    }

    private genRandomString(len: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < len) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    private hashKeyWebSafe(str: string): string {
        return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(str))
          .replace(/\//g, '_')
          .replace(/\+/g, '-')
          .replace(/=/g, '');
    }

    private generateURL(
        ramdonString: string,
        codeChallenge: string
    ): string {
        let url = `${this.baseURL}/authorize?response_type=${this.responseType}&client_id=${this.clientID}&state=${ramdonString}&scope=${this.scope}&redirect_uri=${this.redirectURL}&code_challenge=${codeChallenge}&code_challenge_method=${this.codeChallengeMethod}`;
        return url;
    }

}