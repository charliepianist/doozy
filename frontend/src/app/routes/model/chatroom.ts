import { User } from './user';
import { isNullOrUndefined } from 'util';

export class ChatRoom {
  user: User;
  sharedHobbies: string[];

  constructor(user: User, sharedHobbies: string[]) {
    this.user = user;
    this.sharedHobbies = sharedHobbies;
  }

  capitalize(str: string): string {
    if(str === 'tv') return 'TV';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  listSharedHobbies(): string {
    if(isNullOrUndefined(this.sharedHobbies)) {
      return '';
    }
    if(this.sharedHobbies.length === 1) {
      return this.capitalize(this.sharedHobbies[0]);
    }
    let str = '';
    for (let i = 0; i < this.sharedHobbies.length - 1; i++) {
      if (i === this.sharedHobbies.length - 2 && this.sharedHobbies.length === 2) {
        str += this.capitalize(this.sharedHobbies[i]) + ' ';
        break;
      }
      str += this.capitalize(this.sharedHobbies[i]) + ', ';
    }
    if(this.sharedHobbies.length > 0) {
      str += 'and ' + this.capitalize(this.sharedHobbies[this.sharedHobbies.length - 1]);
    }
    return str;
  }
}
