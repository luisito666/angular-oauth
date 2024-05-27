import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
// Interfaces
import { IDToken } from 'src/app/app.interfaces';
import { AuthService } from 'src/app/services/auth.service';

// Services
import { LocalStorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  TokenString!: string
  IDToken: IDToken = {
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

  constructor(
    private stg: LocalStorageService,
    private auth: AuthService,
    private router: Router
  ) {
    
  }
  
  ngOnInit(): void {
    this.getIDToken();
  }

  getIDToken(): void {
    this.TokenString = this.stg.get_item<string>('id_token');
    this.IDToken = this.stg.get_id_token() || this.IDToken;
  }

  logout(): void {
    this.auth.logOut();
    this.router.navigate(['/login']);
  }
}
