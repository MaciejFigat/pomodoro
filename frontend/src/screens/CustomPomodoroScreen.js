import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Badge, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
  decreasePomodoro,
  resetPomodoro,
  decreaseRest,
  resetRest,
} from '../actions/pomodoroActions'

const CustomPomodoroScreen = () => {
  const dispatch = useDispatch()

  const [pomodoroDuration, setPomodoroDuration] = useState(25)
  const [pomodoroDone, setPomodoroDone] = useState(0)
  const [restDuration, setRestDuration] = useState(5)
  const [seconds, setSeconds] = useState(25 * 60)
  const [restSeconds, setRestSeconds] = useState(5 * 60)
  const [isActive, setIsActive] = useState(false)

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    setSeconds(pomodoroDuration * 60)
    setRestSeconds(restDuration * 60)
  }

  const pomodoroDurationPlus = () => {
    if (pomodoroDuration < 60) {
      setPomodoroDuration((pomodoroDuration) => pomodoroDuration + 1)
    }
  }

  const pomodoroDurationMinus = () => {
    if (pomodoroDuration > 0) {
      setPomodoroDuration((pomodoroDuration) => pomodoroDuration - 1)
    }
  }

  const restDurationPlus = () => {
    if (restDuration < 60) {
      setRestDuration((restDuration) => restDuration + 1)
    }
  }

  const restDurationMinus = () => {
    if (restDuration > 0) {
      setRestDuration((restDuration) => restDuration - 1)
    }
  }
  useEffect(() => {
    if (isActive && restSeconds === 0 && seconds === 0) {
      setSeconds(pomodoroDuration * 60)
      setRestSeconds(restDuration * 60)
      setPomodoroDone((pomodoroDone) => pomodoroDone + 1)
    }

    const timer = setInterval(() => {
      if (isActive && seconds > 0) {
        setSeconds((seconds) => seconds - 1)
        dispatch(decreasePomodoro())
      } else if (isActive && restSeconds > 0 && seconds === 0) {
        setRestSeconds((restSeconds) => restSeconds - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, seconds, restSeconds, pomodoroDuration, restDuration])

  return (
    <FormContainer>
      <Row className='justify-content-lg-center'>
        <Col xs={12} md={8}>
          <Card className='p-3'>
            <Row className='justify-content-lg-center'>
              {' '}
              {isActive && seconds > 0 ? <h1>Work</h1> : <h1>Rest</h1>}
            </Row>
            <Row className='justify-content-lg-center'>
              {seconds === 0 ? (
                <Badge variant='success'>
                  <h2 font-weight-bolder>
                    {' '}
                    {Math.trunc(restSeconds / 60)} : {restSeconds % 60}
                  </h2>
                </Badge>
              ) : (
                <Badge variant='danger' className='justify-content-md-center'>
                  <h2 font-weight-bolder>
                    {Math.trunc(seconds / 60)} : {seconds % 60}
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
              {isActive && seconds === 0 && (
                <Button onClick={() => setRestSeconds(0)}>Skip rest</Button>
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
                    Rest period: <b>{restDuration}</b> minutes
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
                    Duration of a pomodoro: <b>{pomodoroDuration}</b> minutes
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
    </FormContainer>
  )
}

export default CustomPomodoroScreen
