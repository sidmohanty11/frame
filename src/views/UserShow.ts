import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div class="card" style="margin: auto">
      <h1>User Details</h1>
      <div>UserName: ${this.model.get('name')}</div>
      <div>UserAge: ${this.model.get('age')}</div>
      <div>UserEmail: ${this.model.get('email')}</div>
    </div>
    `
  }
}
