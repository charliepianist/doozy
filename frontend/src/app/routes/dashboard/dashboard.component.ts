import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ChatRoom } from '../model/chatroom';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchStatus = 0; // 0 - untouched, 1 - failed, 2 - found match
  userId: string;

  chatRooms: ChatRoom[] = [
    new ChatRoom(new User(null, 'Ziv', 'Batscha', null, null), ['tv', 'games', 'exercise']),
    new ChatRoom(new User(null, 'Ryan', 'Thorpe', null, null), ['hacking', 'tv', 'games'])
  ];

  constructor(private cookieService: CookieService, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.cookieService.get('user-id');
  }

  findNewMatch() {
    this.userService.findMatch(this.userId).subscribe(
      result => {
        console.log(result);
        if(result.result) {
          this.chatRooms.push(new ChatRoom(result.user, result.sharedInterests));
          this.searchStatus = 2;
        } else {
          this.searchStatus = 1;
        }
      }, e => { console.log(e); this.searchStatus = 1; }
    );
  }

}
