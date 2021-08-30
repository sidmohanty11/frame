import { CallbackFn, Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes"

export interface UserProps {
  id?: string | number;
  name?: string;
  email?: string;
  age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  };

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }
}
