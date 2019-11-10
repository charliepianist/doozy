import { User } from './user';

export class FullUser {
  user: User;
  interests: string[];
  opinions: number[];

  constructor(user: User, interests: string[], opinions: number[]) {
    this.user = user;
    this.interests = interests;
    this.opinions = opinions;
  }
}
