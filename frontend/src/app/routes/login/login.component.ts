import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { isNullOrUndefined } from 'util';
import { BooleanResult } from '../model/booleanresult';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMsg = '';

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
  }

  login() {
    if (!isNullOrUndefined(this.email) && !isNullOrUndefined(this.password)) {
      this.userService.validateCredentials(this.email, this.password).subscribe(
        (result: BooleanResult) => {
          if (result.result) {
            this.cookieService.set('user-id', result.user.userId + '');
            this.cookieService.set('full-name', result.user.firstName + ' ' + result.user.lastName);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMsg = 'Invalid email or password.';
          }
        }, (e: HttpErrorResponse) => this.errorMsg = 'Login Failed: ' + e.message
      );
    }else {
      this.errorMsg = 'Please fill in both fields.';
    }
  }

}
