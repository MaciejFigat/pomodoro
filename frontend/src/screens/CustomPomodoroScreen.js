import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Badge, Card } from 'react-bootstrap'
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
  getMyPomodoros,
  updateMyPomodoro,
  createMyPomodoro,
  pomodoroSecondsSet,
  restSecondsSet,
} from '../actions/pomodoroActions'
import {
  saveMyDonePomodoro,
  getMyDonePomodoros,
} from '../actions/pomodoroDoneActions'

const CustomPomodoroScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPomodoroDone = useSelector((state) => state.getPomodoroDone)
  const { pomodorosDone } = getPomodoroDone

  const counterPomodoro = useSelector((state) => state.counterPomodoro)
  const { pomodoroSeconds } = counterPomodoro

  const counterRest = useSelector((state) => state.counterRest)
  const { restSeconds } = counterRest

  const savedPomodoros = useSelector((state) => state.getPomodoroInfo)

  const updatedPomodoro = useSelector((state) => state.pomodoroUpdate)
  const createdPomodoro = useSelector((state) => state.pomodoroCreate)

  const [pomodoroDone, setPomodoroDone] = useState(0)
  const [updatedVisible, setUpdatedVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [optionsToggle, setOptionsToggle] = useState(false)
  const [filteredPomodoro, setFilteredPomodoro] = useState(0)

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
        name: `${userInfo.name}'s Pomodoro`,
        description: 'be well my friend',
        _id: savedPomodoros.pomodoros[0]._id,
        pomodoroSeconds: pomodoroSeconds,
        restSeconds: restSeconds,
      })
    )
    if (updatedVisible === true) {
      setUpdatedVisible(false)
    }
  }

  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)

  const pomodoroDoneToday = async () => {
    dispatch(getMyDonePomodoros())
    await (pomodorosDone && pomodorosDone.loading === false)
    // await pomodorosDone
    // await (pomodorosDone.loading === true)
    // await (pomodorosDone.loading === false)
    if (pomodorosDone) {
      const filtered = pomodorosDone.filter(
        (pomodoroDone) =>
          pomodoroDone.pomodoroType === true &&
          pomodoroDone.createdAt.substring(0, 10) ===
            today.toISOString().substring(0, 10)
      ).length
      setFilteredPomodoro(filtered)
    }
  }

  const filterHandler = async () => {
    dispatch(getMyDonePomodoros())
    // console.log('1st one')
    await (pomodorosDone && pomodorosDone.loading === false)
    pomodoroDoneToday()

    // console.log('2nd one')

    setOptionsToggle(true)
  }

  useEffect(() => {
    if (userInfo && pomodorosDone && pomodorosDone.length === 0) {
      dispatch(getMyDonePomodoros())
    }
    if (userInfo && createdPomodoro.success === true) {
      dispatch(getMyDonePomodoros())
    }
    if (!userInfo) {
      history.push('/login')
    }

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
    ) {
      dispatch(getMyPomodoros())
    }

    if (
      savedPomodoros.pomodoros &&
      isActive &&
      restSeconds === 0 &&
      pomodoroSeconds === 0
    ) {
      setPomodoroDone((pomodoroDone) => pomodoroDone + 1)
      dispatch(
        saveMyDonePomodoro({
          pomodoroType: true,
          secondsDone: savedPomodoros.pomodoros[0].pomodoroSeconds,
        })
      )
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
    history,
  ])

  return (
    <FormContainer>
      <Row className='justify-content-center'>
        <Col>
          <Card className='p-3'>
            <Row className='justify-content-center'>
              {' '}
              {isActive && pomodoroSeconds > 0 ? <h1>Work</h1> : <h1>Rest</h1>}
            </Row>
            <Row className='justify-content-center'>
              {pomodoroSeconds === 0 ? (
                <Badge variant='success'>
                  <h2 font-weight-bolder>
                    {' '}
                    {Math.trunc(restSeconds / 60)} : {restSeconds % 60}
                  </h2>
                </Badge>
              ) : (
                <Badge variant='danger' className='justify-content-center'>
                  <h2 font-weight-bolder>
                    {Math.trunc(pomodoroSeconds / 60)} : {pomodoroSeconds % 60}
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
              {isActive && pomodoroSeconds === 0 && (
                <Button onClick={restZero}>Skip rest</Button>
              )}
            </Row>
          </Card>

          {optionsToggle === false && (
            <Row className='justify-content-center my-3'>
              <Button variant='dark' flush onClick={filterHandler}>
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
                  <i className='fas fa-user-tie'></i>{' '}
                  <i className='fas fa-hourglass-start'></i>:{' '}
                  <Button size='sm' onClick={pomodoroDurationMinus}>
                    <b>-</b>
                  </Button>{' '}
                  <b>{Math.trunc(pomodoroSeconds / 60)}</b>{' '}
                  <Button size='sm' onClick={pomodoroDurationPlus}>
                    <b>+</b>
                  </Button>{' '}
                  min
                </h5>
              </Row>
              <Row className='justify-content-center'>
                <h5>
                  <i className='fas fa-bed'></i>{' '}
                  <i className='fas fa-hourglass-end'></i>:{' '}
                  <Button size='sm' onClick={restDurationMinus}>
                    <b>-</b>
                  </Button>{' '}
                  <b>{Math.trunc(restSeconds / 60)}</b>{' '}
                  <Button size='sm' onClick={restDurationPlus}>
                    <b>+</b>
                  </Button>{' '}
                  min
                </h5>
              </Row>

              <Row className='justify-content-center my-3'>
                <Button variant='success' flush onClick={pomodoroDoneToday}>
                  Done today: <b>{filteredPomodoro} </b>
                </Button>{' '}
              </Row>
              {userInfo &&
                savedPomodoros.pomodoros &&
                savedPomodoros.pomodoros.length === 0 &&
                !createdPomodoro.pomodoro && (
                  <Button variant='info' flush onClick={createPomodoroHandler}>
                    Create New
                  </Button>
                )}
              {userInfo &&
                savedPomodoros.pomodoros &&
                savedPomodoros.pomodoros.length !== 0 && (
                  <Row className='justify-content-center '>
                    <Button
                      variant='info'
                      flush
                      onClick={savePreferencesHandler}
                    >
                      Save Changes
                    </Button>
                  </Row>
                )}
              {updatedPomodoro.pomodoros && updatedVisible === false && (
                <Row className='justify-content-center'>
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
                </Row>
              )}
              <Row className='justify-content-center'>
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

export default CustomPomodoroScreen
