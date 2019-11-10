import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { User } from '../model/user';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  id: number;
  message = '';
  messages: string[] = [];
  senderId: number;
  senderName: string;
  receiver = new User(2, 'Ziv', 'Batscha', null, '12345');

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.senderId = Number.parseInt(this.cookieService.get('user-id'), 10);
    this.senderName = this.cookieService.get('full-name');
    this.route.paramMap.subscribe(
      params => {
        this.id = Number.parseInt(params.get('id'), 10);
        this.userService.getUser(this.id).subscribe(
          user => this.receiver = user
        );
      }
    );

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.message.match('^\\s*$') === null) {
      const date = new Date(Date.now());
      this.chatService.logMessage(this.senderId, this.receiver.userId, new Date(Date.now()).getTime(), this.message);
      this.message = date.toLocaleString() + ' [' + this.senderName + '] ' + this.message;
      this.chatService.sendMessage(this.message);
    }
    this.message = '';
  }

}
