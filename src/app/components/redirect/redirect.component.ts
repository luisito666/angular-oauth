import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { OauthService } from 'src/app/services/oauth.service';
import { LocalStorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  code!: string
  state!: string

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private stg: LocalStorageService,
    private svc: OauthService
  ) {
    this.activateRoute.queryParams
      .subscribe(
        params => {
          this.code = params['code']
          this.state = params['state']
        }
      )
  }

  ngOnInit(): void {
    this.svc.getToken(
      this.state,
      this.code
    )
      .subscribe( ({access_token, id_token}) => {
        this.stg.set_token(access_token);
        this.stg.set_id_token(id_token);
        this.route.navigate(['/home']);
      })
    
  }

}
