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
  increaseSavedRestMinutes,
  decreaseSavedRestMinutes,
  increaseSavedPomodoroMinutes,
  decreaseSavedPomodoroMinutes,
  getMyPomodoros,
  updateMyPomodoro,
  createMyPomodoro,
  pomodoroSecondsSet,
  restSecondsSet,
} from '../actions/pomodoroActions'
// import useMountEffect from '@restart/hooks/useMountEffect'

const CustomPomodoroScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const counterPomodoro = useSelector((state) => state.counterPomodoro)
  const { pomodoroSeconds } = counterPomodoro

  const counterRest = useSelector((state) => state.counterRest)
  const { restSeconds } = counterRest

  const savedPomodoros = useSelector((state) => state.getPomodoroInfo)
  const { pomodoros } = savedPomodoros

  const updatedPomodoro = useSelector((state) => state.pomodoroUpdate)
  const createdPomodoro = useSelector((state) => state.pomodoroCreate)

  const [pomodoroDone, setPomodoroDone] = useState(0)

  const [updatedVisible, setUpdatedVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    if (
      savedPomodoros.pomodoros &&
      userInfo &&
      savedPomodoros.pomodoros.length !== 0
    ) {
      dispatch(restSecondsSet(savedPomodoros.pomodoros[0].restSeconds))
      dispatch(pomodoroSecondsSet(savedPomodoros.pomodoros[0].pomodoroSeconds))
    } else {
      dispatch(resetPomodoro())
      dispatch(resetRest())
    }
    console.log(updatedVisible)
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

  const createPomodoroHandler = () => {
    dispatch(
      createMyPomodoro({
        pomodoroSeconds: pomodoroSeconds,
        restSeconds: restSeconds,
      })
    )
  }

  const savePreferencesHandler = () => {
    dispatch(
      updateMyPomodoro({
        _id: savedPomodoros.pomodoros[0]._id,
        pomodoroSeconds: pomodoroSeconds,
        restSeconds: restSeconds,
      })
    )
    if (updatedVisible === true) {
      setUpdatedVisible(false)
    }
  }

  useEffect(() => {
    if (
      userInfo &&
      createdPomodoro.pomodoro &&
      savedPomodoros.pomodoros &&
      savedPomodoros.pomodoros.length === 0
    ) {
      dispatch(getMyPomodoros())
    }
    if (!savedPomodoros.pomodoros && isActive === false) {
      dispatch(getMyPomodoros())
    }
    if (
      savedPomodoros.pomodoros &&
      savedPomodoros.pomodoros.length === 0 &&
      updatedPomodoro.pomodoros &&
      userInfo
      // &&
      // (savedPomodoros.pomodoros[0].pomodoroSeconds !==
      //   updatedPomodoro.pomodoros.pomodoroSeconds ||
      //   savedPomodoros.pomodoros[0].restSeconds !==
      //     updatedPomodoro.pomodoros.restSeconds)
    ) {
      dispatch(getMyPomodoros())
    }

    if (isActive && restSeconds === 0 && pomodoroSeconds === 0) {
      setPomodoroDone((pomodoroDone) => pomodoroDone + 1)
      if (savedPomodoros.pomodoros) {
        dispatch(restSecondsSet(savedPomodoros.pomodoros[0].restSeconds))
        dispatch(
          pomodoroSecondsSet(savedPomodoros.pomodoros[0].pomodoroSeconds)
        )
      } else {
        dispatch(resetPomodoro())
        dispatch(resetRest())
      }
    }

    const timer = setInterval(() => {
      if (isActive && pomodoroSeconds > 0) {
        dispatch(decreasePomodoro())
      } else if (isActive && restSeconds > 0 && pomodoroSeconds === 0) {
        dispatch(decreaseRest())
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [
    isActive,
    restSeconds,
    dispatch,
    pomodoroSeconds,
    savedPomodoros.pomodoros,
    updatedPomodoro,
    createdPomodoro,
    userInfo,
  ])

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
              {userInfo &&
                savedPomodoros.pomodoros &&
                savedPomodoros.pomodoros.length === 0 &&
                !createdPomodoro.pomodoro && (
                  <Button variant='info' flush onClick={createPomodoroHandler}>
                    Create your own pomodoro
                  </Button>
                )}

              {userInfo &&
                savedPomodoros.pomodoros &&
                savedPomodoros.pomodoros.length !== 0 && (
                  <Button variant='info' flush onClick={savePreferencesHandler}>
                    Save preferences
                  </Button>
                )}

              {updatedPomodoro.pomodoros && updatedVisible === false ? (
                <Button
                  variant='success'
                  flush
                  onClick={() =>
                    dispatch(
                      getMyPomodoros(),
                      setUpdatedVisible(!updatedVisible)
                    )
                  }
                >
                  Set updated as current
                </Button>
              ) : (
                <></>
              )}

              <Button variant='warning' flush onClick={reset}>
                Reset timer
              </Button>
            </Card>
          </Col>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default CustomPomodoroScreen
