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
  const [isActive, setIsActive] = useState(false)
  const [deleteDone, setDeleteDone] = useState(false)
  const [createDone, setCreateDone] = useState(false)

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
          secondsDone: savedPomodoros.pomodoros[0].pomodoroSeconds,
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

    if (isActive && restSeconds === 0 && pomodoroSeconds === 0) {
      setPomodoroDone((pomodoroDone) => pomodoroDone + 1)
      dispatch(
        saveMyDonePomodoro({
          pomodoroNumber: 1,
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
    deleteDone,
  ])

  return (
    <>
      <FormContainer>
        <Row className='justify-content-lg-center'>
          <Col xs={12} md={8}>
            <Card className='p-3'>
              <Row className='justify-content-lg-center'>
                {' '}
                {isActive && pomodoroSeconds > 0 ? (
                  <h1>Work</h1>
                ) : (
                  <h1>Rest</h1>
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
                      {Math.trunc(pomodoroSeconds / 60)} :{' '}
                      {pomodoroSeconds % 60}
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
                  savedPomodoros.pomodoros.length !== 0 && (
                    <Button
                      variant='info'
                      flush
                      onClick={savePreferencesHandler}
                    >
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

                <Button
                  variant='danger'
                  flush
                  onClick={saveDonePomodoroHandler}
                >
                  saveMyDonePomodoro test
                </Button>
                <Button
                  variant='warning'
                  flush
                  onClick={() => dispatch(getMyDonePomodoros())}
                >
                  getMyDonePomodoros
                </Button>
              </Card>
            </Col>
          </Col>
        </Row>
      </FormContainer>
      {savedPomodoros &&
        savedPomodoros.pomodoros &&
        savedPomodoros.length !== 0 && (
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
