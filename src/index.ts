import { User } from "./models/User";

const user = User.create({
  id: 1,
});

user.fetch();
