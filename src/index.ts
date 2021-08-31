import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";
import { Collection } from "./models/Collection";

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.create(json);
});

users.on('change', () => {
  const root = document.getElementById('root');
  if (root) {
    const userList = new UserList(root, users);
    userList.render();
  } else {
    throw new Error('root element not found');
  }
});

users.fetch();

const user = User.create({ id: 1 });
user.fetch();
const root2 = document.getElementById('root2');
if (root2) {
  const userEdit = new UserEdit(root2, user);
  userEdit.render();
} else {
  throw new Error('root element not found');
}


