import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class ChatService {
    private static readonly MESSAGES_URL = 'https://cl43.api.stdlib.com/doozy@dev/messages/new/';
    private static readonly API_KEY = 'tok_dev_qNhBEJ9qaCHmz6HchaqYqsxYva3Xk9v25JmkNshSe1c7e1k3o8ExgCsg88Enx1v2';
    private url = 'http://localhost:3000';
    private socket;
    private headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ChatService.API_KEY });
    private options = { headers: this.headers };

    constructor(private httpClient: HttpClient) {
        this.socket = io(this.url);
    }

    public logMessage(senderId: number, receiverId: number, timestamp: number, message: string) {
      this.httpClient.post(ChatService.MESSAGES_URL, {'sender_id': senderId, 'receiver_id': receiverId, timestamp, message}, this.options)
      .subscribe();
    }

    public sendMessage(message: string) {
      this.socket.emit('new-message', message);
    }

    public getMessages = () => {
      return new Observable((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
      });
  }
}
