import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

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
      setMessage("Password and confirm password don't match")
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <h1>Register new user</h1>
        {message && <Message variant='warning'>{message}</Message>}
        <Form.Group controlId='name'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type='submit'>Register</Button>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
