interface UserProps {
  name?: string;
  email?: string;
  age?: number;
  password?:string;
  DOB?: Date;
  contact?: number;
}

type CallbackFn = () => {}

export class User {
  events: { [key:string]: CallbackFn[] } = {};
  constructor(private data: UserProps) {}

  get(propName: string): (number | string | Date) {
    return this.data[propName];
  }

  set(update: UserProps):void {
    Object.assign(this.data, update);
  }

  on(event: string, callback: CallbackFn) {
    
  }

  trigger(event: string): void {

  }

  async fetch(): Promise<any> {

  }

  async save(): Promise<any> {

  }
}