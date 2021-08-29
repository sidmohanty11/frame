import { User } from "./models/User";

const user = new User({ name: "ram", age: 10 });

user.save();
