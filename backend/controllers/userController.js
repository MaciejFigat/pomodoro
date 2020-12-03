import asyncHandler from 'express-async-handler'
import generateToken from '../utilities/generateToken.js'
import User from '../models/userModel.js'

// @description authenticate user & get token
// @route POST /api/users/login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // we are going to await, taking User model using findOne() -(returns a document that only contains the projection fields), finding one document who has email matching the email from const { email, password } = req.body

  //after we validate, we check for the user with that email - assigning it to user variable (const user)
  const user = await User.findOne({ email: email })

  // if email matches then we have to look at password (comparison is done in user model using bcrypt that compares text password to hashed one )
  // if the password matches - we are returning follwing date back along with a token that has user id embedded in it
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Wrong username or password')
  }
})

export { authUser }
