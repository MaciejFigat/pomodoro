import bcrypt from 'bcryptjs'

const users = [
  // {
  //   name: 'Joey',
  //   email: 'joey@somethin.com',
  //   password: '1234567',
  // },
  {
    name: 'Admin User',
    email: 'admin@somethin.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: true,
  },

  {
    name: 'Joey',
    email: 'joey@somethin.com',
    password: bcrypt.hashSync('1234567', 10),
  },
  {
    name: 'John',
    email: 'john@somethin.com',
    password: bcrypt.hashSync('123', 10),
  },
]

export default users
