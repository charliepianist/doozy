import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Doozy';
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit() {
    this.name = this.cookieService.get('full-name');
    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationEnd) {
          this.name = this.cookieService.get('full-name');
      }
  });
  }
}
