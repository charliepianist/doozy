import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../routes/model/user';
import { Observable } from 'rxjs';
import { FullUser } from '../routes/model/fulluser';
import { BooleanResult } from '../routes/model/booleanresult';
import { PotentialMatch } from '../routes/model/potentialmatch';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static readonly BASE_URL = 'http://127.0.0.1:5000/';

  constructor(private httpClient: HttpClient) { }

  public createUser(fullUser: FullUser): Observable<User> {
    return this.httpClient.post<User>(UserService.BASE_URL, fullUser);
  }

  public getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(UserService.BASE_URL + userId);
  }

  public validateCredentials(email: string, password: string): Observable<BooleanResult> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.httpClient.get<BooleanResult>(UserService.BASE_URL + 'login', { params });
  }

  public findMatch(userId: string): Observable<PotentialMatch> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<PotentialMatch>(UserService.BASE_URL + 'match', { params });
  }
}
