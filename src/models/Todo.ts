import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

interface TodoProps {
  id?: string | number;
  task?: string;
  category?: string;
}

export class Todo {
  public events: Eventing = new Eventing();
  public sync: Sync<TodoProps> = new Sync<TodoProps>('http://localhost:3000')

  constructor(private data: TodoProps) {};
}