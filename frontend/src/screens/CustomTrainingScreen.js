import React, { useState, useEffect } from 'react'
import {
  Form,
  Container,
  Button,
  Row,
  Col,
  Badge,
  Card,
  Table,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
  deletePomodoro,
} from '../actions/pomodoroActions'
import {
  saveMyDonePomodoro,
  getMyDonePomodoros,
} from '../actions/pomodoroDoneActions'

const CustomTrainingScreen = ({ history }) => {
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
  const { pomodoros } = savedPomodoros

  const updatedPomodoro = useSelector((state) => state.pomodoroUpdate)

  const createdPomodoro = useSelector((state) => state.pomodoroCreate)

  const [pomodoroDone, setPomodoroDone] = useState(0)

  const [updatedVisible, setUpdatedVisible] = useState(false)
  const [trainingSessionVisible, setTrainingSessionVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [deleteDone, setDeleteDone] = useState(false)
  const [createDone, setCreateDone] = useState(false)
  const [excerciseNumber, setExcerciseNumber] = useState(1)
  const [trainingSessionDone, setTrainingSessionDone] = useState(false)
  const [optionsToggle, setOptionsToggle] = useState(false)

  const toggle = () => {
    setIsActive(!isActive)
  }

  const reset = () => {
    if (
      savedPomodoros.pomodoros &&
      userInfo &&
      savedPomodoros.pomodoros.length !== 0
    ) {
      dispatch(
        restSecondsSet(savedPomodoros.pomodoros[excerciseNumber].restSeconds)
      )
      dispatch(
        pomodoroSecondsSet(
          savedPomodoros.pomodoros[excerciseNumber].pomodoroSeconds
        )
      )
    } else {
      dispatch(resetPomodoro())
      dispatch(resetRest())
    }
    setTrainingSessionDone(false)
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

  const savePreferencesHandler = () => {
    dispatch(
      updateMyPomodoro({
        _id: savedPomodoros.pomodoros[excerciseNumber]._id,
        pomodoroSeconds: pomodoroSeconds,
        restSeconds: restSeconds,
      })
    )
    if (updatedVisible === true) {
      setUpdatedVisible(false)
    }
  }

  const trainingUpdateHandler = (id) => {
    dispatch(
      updateMyPomodoro({
        _id: id,
        pomodoroSeconds: pomodoroSeconds,
        restSeconds: restSeconds,
      })
    )
  }
  const saveDonePomodoroHandler = () => {
    if (savedPomodoros.pomodoros && savedPomodoros.pomodoros.length !== 0) {
      dispatch(
        saveMyDonePomodoro({
          pomodoroNumber: 1,
          secondsDone:
            savedPomodoros.pomodoros[excerciseNumber].pomodoroSeconds,
        })
      )
    }
  }
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePomodoro(id))
      setDeleteDone(true)
    }
  }

  const nextExerciseHandler = () => {
    if (
      savedPomodoros.pomodoros &&
      savedPomodoros.pomodoros.length > excerciseNumber + 1
    ) {
      setExcerciseNumber(excerciseNumber + 1)
      dispatch(
        restSecondsSet(savedPomodoros.pomodoros[excerciseNumber].restSeconds)
      )
      dispatch(
        pomodoroSecondsSet(
          savedPomodoros.pomodoros[excerciseNumber].pomodoroSeconds
        )
      )
    }
  }
  const previousExerciseHandler = () => {
    if (savedPomodoros.pomodoros && excerciseNumber >= 1) {
      setExcerciseNumber(excerciseNumber - 1)
      dispatch(
        restSecondsSet(savedPomodoros.pomodoros[excerciseNumber].restSeconds)
      )
      dispatch(
        pomodoroSecondsSet(
          savedPomodoros.pomodoros[excerciseNumber].pomodoroSeconds
        )
      )
    }
  }
  const doItAgainHandler = () => {
    setTrainingSessionDone(false)
    setExcerciseNumber(1)
    dispatch(restSecondsSet(savedPomodoros.pomodoros[1].restSeconds))
    dispatch(pomodoroSecondsSet(savedPomodoros.pomodoros[1].pomodoroSeconds))
    setIsActive(false)
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (deleteDone === true) {
      dispatch(getMyPomodoros())
      setDeleteDone(false)
    }
    if (createDone === true) {
      dispatch(getMyPomodoros())
      setCreateDone(false)
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
          pomodoroNumber: 1,
          secondsDone:
            savedPomodoros.pomodoros[excerciseNumber].pomodoroSeconds,
        })
      )
      if (savedPomodoros.pomodoros.length > excerciseNumber + 1) {
        setExcerciseNumber(excerciseNumber + 1)
        if (savedPomodoros.pomodoros.length !== excerciseNumber + 1) {
          dispatch(
            restSecondsSet(
              savedPomodoros.pomodoros[excerciseNumber].restSeconds
            )
          )
          dispatch(
            pomodoroSecondsSet(
              savedPomodoros.pomodoros[excerciseNumber].pomodoroSeconds
            )
          )
        }
      } else {
        setTrainingSessionDone(true)
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
    deleteDone,
  ])

  return (
    <>
      <FormContainer>
        <Col xs={12} md={8}>
          <Card className='p-3'>
            {trainingSessionDone === false && (
              <Row className='justify-content-lg-center'>
                {' '}
                {isActive && pomodoroSeconds > 0 ? (
                  <h1>Work</h1>
                ) : (
                  <h1>Rest</h1>
                )}
              </Row>
            )}
            {trainingSessionDone === true && (
              <>
                {' '}
                <Row className='justify-content-md-center'>
                  {' '}
                  <Badge className='p-3' variant='success'>
                    <h3> Well done {userInfo.name}! </h3>
                  </Badge>
                </Row>
                <Row className='justify-content-md-center'>
                  <Button onClick={doItAgainHandler}>Do it Again</Button>
                </Row>
              </>
            )}
            <Row className='justify-content-md-center'>
              {' '}
              {trainingSessionDone === false &&
                savedPomodoros.pomodoros &&
                savedPomodoros.pomodoros.length !== 0 && (
                  <p>
                    <h2>{savedPomodoros.pomodoros[excerciseNumber].name}</h2>

                    {savedPomodoros.pomodoros[excerciseNumber].description}
                  </p>
                )}
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
            {trainingSessionDone === false && (
              <Row className='justify-content-lg-center'>
                {trainingSessionDone === false && isActive ? (
                  <Button variant='info' onClick={toggle} size='lg'>
                    Pause
                  </Button>
                ) : (
                  <Button variant='success' onClick={toggle} size='lg'>
                    Start
                  </Button>
                )}
                {trainingSessionDone === false &&
                  isActive &&
                  pomodoroSeconds === 0 && (
                    <Button onClick={restZero}>Skip rest</Button>
                  )}
              </Row>
            )}
          </Card>

          <Card className='p-3'>
            {trainingSessionDone === false && optionsToggle === false && (
              <Row className='justify-content-lg-center'>
                <Button
                  variant='warning'
                  flush
                  onClick={previousExerciseHandler}
                >
                  <i className='fas fa-arrow-left'></i> Previous
                </Button>
                <Button variant='info' flush onClick={nextExerciseHandler}>
                  Next <i className='fas fa-arrow-right'></i>
                </Button>
              </Row>
            )}

            {optionsToggle === false && (
              <Row className='justify-content-lg-center my-3'>
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
              <>
                <Row className='justify-content-lg-center'>
                  <Button variant='warning' flush onClick={reset}>
                    Reset this exercise
                  </Button>
                </Row>
                <Row className='justify-content-lg-center'>
                  {' '}
                  <Link to='/create' className='btn btn-info my-3'>
                    Create or Update
                  </Link>
                </Row>
                <Row className='justify-content-lg-center'>
                  {' '}
                  <Button
                    variant='dark'
                    flush
                    onClick={() => {
                      setOptionsToggle(false)
                    }}
                  >
                    <i className='fas fa-times'></i> Close options
                  </Button>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </FormContainer>
      {trainingSessionVisible === false ? (
        <Button
          variant='info'
          flush
          onClick={() => setTrainingSessionVisible(true)}
        >
          Show training session
        </Button>
      ) : (
        <Button
          variant='warning'
          flush
          onClick={() => setTrainingSessionVisible(false)}
        >
          Hide training session
        </Button>
      )}

      {savedPomodoros &&
        savedPomodoros.pomodoros &&
        savedPomodoros.length !== 0 &&
        trainingSessionVisible === true && (
          <Table stripped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Duration of an excercise </th>
                <th>Rest duration </th>
                <th>Name </th>
                <th>Description </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pomodoros.map((savedPomodoro) => (
                <tr key={savedPomodoro._id}>
                  {savedPomodoro.pomodoroSeconds % 60 === 0 &&
                    savedPomodoro.pomodoroSeconds > 60 && (
                      <td>
                        {Math.trunc(savedPomodoro.pomodoroSeconds / 60)} minutes{' '}
                      </td>
                    )}
                  {savedPomodoro.pomodoroSeconds % 60 !== 0 &&
                    savedPomodoro.pomodoroSeconds > 60 && (
                      <td>
                        {Math.trunc(savedPomodoro.pomodoroSeconds / 60)} minutes{' '}
                        {savedPomodoro.pomodoroSeconds % 60} seconds
                      </td>
                    )}
                  {savedPomodoro.pomodoroSeconds % 60 !== 0 &&
                    savedPomodoro.pomodoroSeconds < 60 && (
                      <td>{savedPomodoro.pomodoroSeconds % 60} seconds</td>
                    )}

                  {savedPomodoro.restSeconds % 60 === 0 &&
                    savedPomodoro.restSeconds > 60 && (
                      <td>
                        {Math.trunc(savedPomodoro.restSeconds / 60)} minutes{' '}
                      </td>
                    )}
                  {savedPomodoro.restSeconds % 60 !== 0 &&
                    savedPomodoro.restSeconds > 60 && (
                      <td>
                        {Math.trunc(savedPomodoro.restSeconds / 60)} minutes{' '}
                        {savedPomodoro.restSeconds % 60} seconds
                      </td>
                    )}
                  {savedPomodoro.restSeconds % 60 !== 0 &&
                    savedPomodoro.restSeconds < 60 && (
                      <td>{savedPomodoro.restSeconds % 60} seconds</td>
                    )}

                  <td>{savedPomodoro.name}</td>
                  <td>{savedPomodoro.description}</td>
                  <td>
                    {' '}
                    <Button
                      variant='danger'
                      onClick={() => deleteHandler(savedPomodoro._id)}
                      size='sm'
                    >
                      delete
                    </Button>
                    <Button
                      variant='info'
                      onClick={() => trainingUpdateHandler(savedPomodoro._id)}
                      size='sm'
                    >
                      update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </>
  )
}

export default CustomTrainingScreen
