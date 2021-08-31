import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const user = User.create({ id: 1 });
user.fetch();

const root = document.getElementById('root');
if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
} else {
  throw new Error('root element not found');
}

