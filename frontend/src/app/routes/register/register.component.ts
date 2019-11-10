import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FullUser } from '../model/fulluser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  hobbyList: string[] = ['sports', 'hacking', 'exercise', 'dining', 'museums', 'art', 'hiking', 'gaming', 'clubbing',
                        'dancing', 'reading', 'tv', 'theater', 'movies', 'concerts', 'music', 'shopping', 'yoga'];
  hobbies: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                        false, false];
  opinionList: string[] = ['The US should spend more on infrastructure.', 'The US should spend more on welfare.',
                          'The US should tax the rich more.'];
  opinions: number[] = [5, 5, 5];
  numHobbies = 0;

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  selectedHobbies(): string[] {
    const arr = [];
    for (let i = 0; i < this.hobbies.length; i++) {
      if (this.hobbies[i]) {
        arr.push(this.hobbyList[i]);
      }
    }
    return arr;
  }

  toggleButton(i: number) {
    if(this.numHobbies < 6 || (this.numHobbies === 6 && this.hobbies[i])) {
      this.hobbies[i] = !this.hobbies[i];
      if(this.hobbies[i]) {
        this.numHobbies++;
      } else {
        this.numHobbies--;
      }
    }
  }

  register() {
    this.cookieService.set('user-id', '1500');
    this.cookieService.set('full-name', this.firstName + ' ' + this.lastName);
    const user = new User(null, this.firstName, this.lastName, this.email, this.password);
    const fullUser = new FullUser(user, this.selectedHobbies(), this.opinions);

    this.userService.createUser(fullUser).subscribe(
      (newUser: User) => {
        this.cookieService.set('user-id', newUser.userId + '');
        this.cookieService.set('full-name', this.firstName + ' ' + this.lastName);
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
