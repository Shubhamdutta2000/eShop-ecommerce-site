import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin1234", 10),
    isAdmin: true,
  },
  {
    name: "Shubham Dutta",
    email: "shubham@gmail.com",
    password: bcrypt.hashSync("user1234", 10),
    isAdmin: false,
  },
  {
    name: "Sita Dutta",
    email: "sita@gmail.com",
    password: bcrypt.hashSync("user1234", 10),
    isAdmin: false,
  },
  {
    name: "Ram Dutta",
    email: "ram@gmail.com",
    password: bcrypt.hashSync("user1234", 10),
    isAdmin: false,
  },
];

export default users;
