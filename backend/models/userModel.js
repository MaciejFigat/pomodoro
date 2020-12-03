import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
// we will compare (method) enteredPassword (plain plain text password) with hashed one using bcrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
//before we save I want to encrypt the password
userSchema.pre('save', async function (next) {
  // if password is not modified we go next - so we dont rehash the password when user changes email etc.
  if (!this.isModified('password')) {
    next()
  }
  // if it has been modyfied then those will run and password will be hashed
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
