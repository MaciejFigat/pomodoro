import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register, logout } from '../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password not matching')
    } else {
      dispatch(register(name, email, password))
    }
  }

  const submitHandlerLogout = (e) => {
    dispatch(logout)
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        Register new user
        <p>Enter your name:</p>
        <input
          type='name'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Enter your email:</p>
        <input
          type='email'
          placeholder='Wpisz adres email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Enter your password:</p>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Confirm password:</p>
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
      <button onClick={submitHandlerLogout}>Logout</button>
    </>
  )
}

export default RegisterScreen
