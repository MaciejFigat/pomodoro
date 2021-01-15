import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Badge, Card } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
const PomodoroDisplayScreen = () => {
  const [pomodoroDuration, setPomodoroDuration] = useState(25)
  const [pomodoroDone, setPomodoroDone] = useState(0)
  const [restDuration, setRestDuration] = useState(5)
  const [seconds, setSeconds] = useState(25 * 60)
  const [restSeconds, setRestSeconds] = useState(5 * 60)
  const [isActive, setIsActive] = useState(false)
  const [optionsToggle, setOptionsToggle] = useState(false)

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
      } else if (isActive && restSeconds > 0 && seconds === 0) {
        setRestSeconds((restSeconds) => restSeconds - 1)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, seconds, restSeconds, pomodoroDuration, restDuration])

  const style = {
    display: 'grid',
    placeItems: 'center',
  }

  return (
    <FormContainer>
      <Row className='justify-content-center'>
        <Col>
          <Card className='p-3'>
            <Row className='justify-content-center'>
              {' '}
              {isActive && seconds > 0 ? <h1>Work</h1> : <h1>Rest</h1>}
            </Row>
            <Row className='justify-content-center'>
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
            <Row className='justify-content-center'>
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

          {optionsToggle === false && (
            <Row className='justify-content-center my-3'>
              <Button
                variant='dark'
                flush
                onClick={() => {
                  setOptionsToggle(true)
                }}
              >
                <i className='fas fa-cogs'></i> Options
              </Button>
            </Row>
          )}
          {optionsToggle === true && (
            <Card className='p-3'>
              <Row className='justify-content-center'>
                <Button
                  variant='dark'
                  flush
                  onClick={() => {
                    setOptionsToggle(false)
                  }}
                >
                  <i className='fas fa-cogs'></i> Hide
                </Button>
              </Row>

              <Row className='justify-content-center my-3'>
                <h5>
                  Pomodoro:{' '}
                  <Button size='sm' onClick={pomodoroDurationMinus}>
                    <b>-</b>
                  </Button>{' '}
                  <b>{pomodoroDuration}</b> min{' '}
                  <Button size='sm' onClick={pomodoroDurationPlus}>
                    <b>+</b>
                  </Button>
                </h5>
              </Row>
              <Row className='justify-content-center '>
                <h5>
                  Rest:{' '}
                  <Button size='sm' onClick={restDurationMinus}>
                    <b>-</b>
                  </Button>{' '}
                  <b>{restDuration}</b> min{' '}
                  <Button size='sm' onClick={restDurationPlus}>
                    <b>+</b>
                  </Button>
                </h5>
              </Row>
              <Row className='justify-content-center my-3'>
                <h5>
                  Pomodoros done: <b>{pomodoroDone}</b>{' '}
                </h5>
              </Row>
              <Row className='justify-content-center '>
                <Button variant='warning' flush onClick={reset}>
                  Reset timer
                </Button>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </FormContainer>
  )
}

export default PomodoroDisplayScreen
