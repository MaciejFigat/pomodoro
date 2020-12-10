import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  const loginHandler = (e) => {
    dispatch(login(email, password))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        LOGIN
        <p>Enter your email:</p>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Enter your password:</p>
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      <button onClick={loginHandler}>Login2</button>
      <button onClick={submitHandler}>Login</button>
    </>
  )
}

export default LoginScreen
