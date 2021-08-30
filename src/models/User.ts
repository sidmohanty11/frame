import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Model } from "./Model";
import { Collection } from "./Collection";

export interface UserProps {
  id?: string | number;
  name?: string;
  email?: string;
  age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static create(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new Sync<UserProps>(ROOT_URL)
    );
  }

  static createCollection(): Collection<User, UserProps>{
    return new Collection<User, UserProps>(ROOT_URL, (json: UserProps) => User.create(json));
  }
  
  isAdmin(): boolean {
    return this.get('id') === 1;
  }
}
