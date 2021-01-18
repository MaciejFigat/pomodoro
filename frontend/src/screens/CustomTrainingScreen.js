import React, { useState, useEffect } from 'react'
import { Button, Row, Badge, Card, Table } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  decreasePomodoro,
  resetPomodoro,
  decreaseRest,
  resetRest,
  setZeroRest,
  getMyPomodoros,
  updateMyPomodoro,
  pomodoroSecondsSet,
  restSecondsSet,
  deletePomodoro,
} from '../actions/pomodoroActions'
import { saveMyDonePomodoro } from '../actions/pomodoroDoneActions'

const CustomTrainingScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const getPomodoroDone = useSelector((state) => state.getPomodoroDone)

  const counterPomodoro = useSelector((state) => state.counterPomodoro)
  const { pomodoroSeconds } = counterPomodoro

  const counterRest = useSelector((state) => state.counterRest)
  const { restSeconds } = counterRest

  const savedPomodoros = useSelector((state) => state.getPomodoroInfo)
  const { pomodoros } = savedPomodoros

  const updatedPomodoro = useSelector((state) => state.pomodoroUpdate)

  const createdPomodoro = useSelector((state) => state.pomodoroCreate)

  const [trainingSessionVisible, setTrainingSessionVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [deleteDone, setDeleteDone] = useState(false)
  const [createDone, setCreateDone] = useState(false)
  const [excerciseNumber, setExcerciseNumber] = useState(1)
  const [trainingSessionDone, setTrainingSessionDone] = useState(false)
  const [optionsToggle, setOptionsToggle] = useState(false)
  const [descriptionToggle, setDescriptionToggle] = useState(false)

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

  const restZero = () => {
    dispatch(setZeroRest())
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
    if (savedPomodoros.pomodoros && excerciseNumber > 1) {
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
      dispatch(
        saveMyDonePomodoro({
          name: savedPomodoros.pomodoros[excerciseNumber].name,
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
    createDone,
    excerciseNumber,
  ])

  return (
    <>
      <FormContainer>
        <Card className='p-3'>
          {trainingSessionDone === false && (
            <Row className='justify-content-center'>
              {' '}
              {isActive && pomodoroSeconds > 0 ? <h1>Work</h1> : <h1>Rest</h1>}
            </Row>
          )}
          {trainingSessionDone === true && (
            <>
              {' '}
              <Row className='justify-content-center'>
                {' '}
                <Badge className='p-3' variant='success'>
                  <h3> Well done {userInfo.name}! </h3>
                </Badge>
              </Row>
              <Row className='justify-content-center'>
                <Button onClick={doItAgainHandler}>Do it Again</Button>
              </Row>
            </>
          )}
          <Row className='justify-content-center'>
            {' '}
            {trainingSessionDone === false &&
              savedPomodoros.pomodoros &&
              savedPomodoros.pomodoros.length !== 0 &&
              savedPomodoros.pomodoros[excerciseNumber].name && (
                <p>
                  <h3
                    onClick={() => {
                      setDescriptionToggle(!descriptionToggle)
                    }}
                  >
                    {savedPomodoros.pomodoros[excerciseNumber].name}{' '}
                    {descriptionToggle === false && (
                      <Button
                        variant='light'
                        flush
                        onClick={() => {
                          setDescriptionToggle(true)
                        }}
                      >
                        <i className='far fa-plus-square'></i>
                      </Button>
                    )}
                    {descriptionToggle === true && (
                      <>
                        <Button
                          variant='light'
                          flush
                          onClick={() => {
                            setDescriptionToggle(false)
                          }}
                        >
                          <i className='far fa-minus-square'></i>
                        </Button>
                      </>
                    )}
                  </h3>

                  {descriptionToggle === true && savedPomodoros.pomodoros && (
                    <h4>
                      {savedPomodoros.pomodoros[excerciseNumber].description}
                    </h4>
                  )}
                </p>
              )}
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
          {trainingSessionDone === false && (
            <Row className='justify-content-center'>
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
          <Row className='justify-content-center'>
            <Button variant='danger' flush onClick={reset}>
              Reset this exercise
            </Button>
          </Row>
          {trainingSessionDone === false && optionsToggle === false && (
            <Row className='justify-content-center my-3'>
              <Button variant='warning' flush onClick={previousExerciseHandler}>
                <i className='fas fa-arrow-left'></i> Previous
              </Button>
              <Button variant='info' flush onClick={nextExerciseHandler}>
                Next <i className='fas fa-arrow-right'></i>
              </Button>
            </Row>
          )}

          {optionsToggle === false && (
            <Row className='justify-content-center '>
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
              <Row className='justify-content-center'>
                {' '}
                <Link to='/create' className='btn btn-info my-3'>
                  Create new or Update
                </Link>
              </Row>
              <Row className='justify-content-center'>
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
      </FormContainer>
      {trainingSessionVisible === false ? (
        <Row className='justify-content-center'>
          <Button
            variant='info'
            flush
            onClick={() => setTrainingSessionVisible(true)}
          >
            Show training session
          </Button>
        </Row>
      ) : (
        <Row className='justify-content-center'>
          <Button
            variant='warning'
            flush
            onClick={() => setTrainingSessionVisible(false)}
          >
            Hide training session
          </Button>
        </Row>
      )}

      {savedPomodoros &&
        savedPomodoros.pomodoros &&
        savedPomodoros.length !== 0 &&
        trainingSessionVisible === true && (
          <Table stripped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Name </th>
                <th>Excercise duration</th>
                <th>Rest duration </th>
                <th>Description </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pomodoros

                .filter(
                  (savedPomodoro) => pomodoros.indexOf(savedPomodoro) !== 0
                )
                .map((savedPomodoro) => (
                  <tr key={savedPomodoro._id}>
                    <td>{savedPomodoro.name}</td>
                    {savedPomodoro.pomodoroSeconds % 60 === 0 &&
                      savedPomodoro.pomodoroSeconds > 60 && (
                        <td>
                          {Math.trunc(savedPomodoro.pomodoroSeconds / 60)} min{' '}
                        </td>
                      )}
                    {savedPomodoro.pomodoroSeconds % 60 !== 0 &&
                      savedPomodoro.pomodoroSeconds > 60 && (
                        <td>
                          {Math.trunc(savedPomodoro.pomodoroSeconds / 60)} min{' '}
                          {savedPomodoro.pomodoroSeconds % 60} sec
                        </td>
                      )}
                    {savedPomodoro.pomodoroSeconds % 60 !== 0 &&
                      savedPomodoro.pomodoroSeconds < 60 && (
                        <td>{savedPomodoro.pomodoroSeconds % 60} sec</td>
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
                          {Math.trunc(savedPomodoro.restSeconds / 60)} min{' '}
                          {savedPomodoro.restSeconds % 60} sec
                        </td>
                      )}
                    {savedPomodoro.restSeconds % 60 !== 0 &&
                      savedPomodoro.restSeconds < 60 && (
                        <td>{savedPomodoro.restSeconds % 60} sec</td>
                      )}

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
