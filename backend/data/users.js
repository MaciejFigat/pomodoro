import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User two',
    email: 'admin2@somethin.com',
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
