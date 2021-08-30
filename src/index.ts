import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.create({ id: 1 });
user.fetch();

const root = document.getElementById('root');
if (root) {
  const userForm = new UserForm(root, user);
  userForm.render();
} else {
  throw new Error('root element not found');
}

