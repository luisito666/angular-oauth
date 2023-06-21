import { Component, OnInit } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  url!: string
  
  constructor(
    private oauth: OauthService
  ) {}
  
  ngOnInit() {
    this.url = this.oauth.generateLoginURL()
  }

}
