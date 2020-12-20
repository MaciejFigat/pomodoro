import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Badge, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
  decreasePomodoro,
  resetPomodoro,
  decreaseRest,
  resetRest,
  increasePomodoroMinutes,
  decreasePomodoroMinutes,
  increaseRestMinutes,
  decreaseRestMinutes,
  setZeroRest,
} from '../actions/pomodoroActions'

const CustomPomodoroScreen = () => {
  const dispatch = useDispatch()

  const counterPomodoro = useSelector((state) => state.counterPomodoro)
  const { pomodoroSeconds } = counterPomodoro

  const counterRest = useSelector((state) => state.counterRest)
  const { restSeconds } = counterRest

  const [pomodoroDuration, setPomodoroDuration] = useState(25)
  const [pomodoroDone, setPomodoroDone] = useState(0)
  const [restDuration, setRestDuration] = useState(0)
  const [seconds, setSeconds] = useState(25 * 60)
  const [restSeconds2, setRestSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  // I changed name for local state restSeconds2 - to avoid conflict with global state - temporary change

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    dispatch(resetPomodoro())
    dispatch(resetRest())
  }

  const pomodoroDurationPlus = () => {
    dispatch(increasePomodoroMinutes())
  }

  const pomodoroDurationMinus = () => {
    dispatch(decreasePomodoroMinutes())
  }

  const restDurationPlus = () => {
    dispatch(increaseRestMinutes())
  }

  const restDurationMinus = () => {
    dispatch(decreaseRestMinutes())
  }

  const restZero = () => {
    dispatch(setZeroRest())
  }

  useEffect(() => {
    if (isActive && restSeconds === 0 && pomodoroSeconds === 0) {
      setPomodoroDone((pomodoroDone) => pomodoroDone + 1)
      dispatch(resetRest())
      dispatch(resetPomodoro())
    }

    const timer = setInterval(() => {
      if (isActive && pomodoroSeconds > 0) {
        dispatch(decreasePomodoro())
      } else if (isActive && restSeconds > 0 && pomodoroSeconds === 0) {
        dispatch(decreaseRest())
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, restSeconds, dispatch, pomodoroSeconds])

  return (
    <FormContainer>
      <Row className='justify-content-lg-center'>
        <Col xs={12} md={8}>
          <Card className='p-3'>
            <Row className='justify-content-lg-center'>
              {' '}
              {isActive && pomodoroSeconds > 0 ? <h1>Work</h1> : <h1>Rest</h1>}
            </Row>
            <Row className='justify-content-lg-center'>
              {pomodoroSeconds === 0 ? (
                <Badge variant='success'>
                  <h2 font-weight-bolder>
                    {' '}
                    {Math.trunc(restSeconds / 60)} : {restSeconds % 60}
                  </h2>
                </Badge>
              ) : (
                <Badge variant='danger' className='justify-content-md-center'>
                  <h2 font-weight-bolder>
                    {Math.trunc(pomodoroSeconds / 60)} : {pomodoroSeconds % 60}
                  </h2>
                </Badge>
              )}
            </Row>
            <Row className='justify-content-lg-center'>
              {isActive ? (
                <Button variant='info' onClick={toggle} size='lg'>
                  Pause
                </Button>
              ) : (
                <Button variant='success' onClick={toggle} size='lg'>
                  Start
                </Button>
              )}
              {isActive && pomodoroSeconds === 0 && (
                <Button onClick={restZero}>Skip rest</Button>
              )}
            </Row>
          </Card>
          <Col>
            <Card className='p-3'>
              <Row>
                <Col>
                  <h3>
                    Number of Pomodoros done: <b>{pomodoroDone}</b>{' '}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col sm={8}>
                  <h3>
                    Rest period: <b>{Math.trunc(restSeconds / 60)}</b> minutes
                  </h3>
                </Col>
                <Col sm={4}>
                  {' '}
                  <Button onClick={restDurationPlus}>
                    <b>+</b>
                  </Button>
                  <Button onClick={restDurationMinus}>
                    <b>-</b>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm={8}>
                  <h3>
                    Duration of a pomodoro:{' '}
                    <b>{Math.trunc(pomodoroSeconds / 60)}</b> minutes
                  </h3>
                </Col>
                <Col sm={4}>
                  {' '}
                  <Button onClick={pomodoroDurationPlus}>
                    <b>+</b>
                  </Button>
                  <Button onClick={pomodoroDurationMinus}>
                    <b>-</b>
                  </Button>
                </Col>
              </Row>

              <Button variant='warning' flush onClick={reset}>
                Reset timer
              </Button>
            </Card>
          </Col>
        </Col>
      </Row>
      <button onClick={() => setSeconds(seconds - 10)}>---testing work</button>
      <button onClick={() => setRestSeconds(restSeconds - 10)}>
        --- testing rest
      </button>
      <button onClick={() => dispatch(decreasePomodoro())}>
        --- testing action decrease pomodoro seconds in store
      </button>
      <button onClick={() => dispatch(decreaseRest())}>
        --- testing action decrease rest seconds in store
      </button>
      <button onClick={() => dispatch(resetRest())}>
        --- testing action reset rest
      </button>
      <button onClick={() => dispatch(resetPomodoro())}>
        --- testing action reset pomodoro
      </button>
      <button onClick={() => dispatch(increasePomodoroMinutes())}>
        --- testing action + 1 min pomodoroSeconds
      </button>
      <button onClick={() => dispatch(decreasePomodoroMinutes())}>
        --- testing atesting - 1 min pomodoroSeconds
      </button>
      <button onClick={() => dispatch(increaseRestMinutes())}>
        --- testing atesting + 1 min restSeconds
      </button>
      <button onClick={() => dispatch(decreaseRestMinutes())}>
        --- testing atesting - 1 min restSeconds
      </button>
    </FormContainer>
  )
}

export default CustomPomodoroScreen
