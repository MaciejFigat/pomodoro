import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import {
  restSecondsSet,
  pomodoroSecondsSet,
  getMyPomodoros,
} from '../actions/pomodoroActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const savedPomodoros = useSelector((state) => state.getPomodoroInfo)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  useEffect(() => {
    if (userInfo) {
      history.push('/training')
    }
    if (
      userInfo &&
      savedPomodoros.pomodoros &&
      savedPomodoros.pomodoros.length === 0
    ) {
      dispatch(getMyPomodoros())
    }

    if (
      userInfo &&
      savedPomodoros.pomodoros &&
      savedPomodoros.pomodoros.length !== 0
    ) {
      dispatch(restSecondsSet(savedPomodoros.pomodoros[0].restSeconds))
      dispatch(pomodoroSecondsSet(savedPomodoros.pomodoros[0].pomodoroSeconds))
    }
  }, [userInfo, dispatch, savedPomodoros.pomodoros, history])
  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <h1>Log in</h1>
          <Form.Label>Enter your email:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='currentPassword'>
          <p>Enter your password:</p>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button type='submit'>Login</button>
      </Form>
      <Row className='py-3'>
        <Col>
          New user?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
