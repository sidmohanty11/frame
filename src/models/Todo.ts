import { Eventing } from "./Eventing";

interface TodoProps {
  id?: string | number;
  task?: string;
  category?: string;
}

export class Todo {
  public events: Eventing = new Eventing();
  constructor(private data: TodoProps) {};

  get(propName: string): (number | string) {
    return this.data[propName];
  }

  set(update: TodoProps):void {
    Object.assign(this.data, update);
  }
}