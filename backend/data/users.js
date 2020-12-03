import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@somethin.com',
    password: bcrypt.hashSync('1234567', 10),
    isAdmin: true,
  },

  {
    name: 'Joe',
    email: 'joe@somethin.com',
    password: bcrypt.hashSync('1234567', 10),
  },
]

export default users
