import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name: string;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.name = this.cookieService.get('full-name');
  }

}
