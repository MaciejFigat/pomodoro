import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  getMyPomodoros,
  updateMyPomodoro,
  createMyPomodoro,
  deletePomodoro,
} from '../actions/pomodoroActions'

const CreateNewExerciseScreen = ({ history }) => {
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

  const pomodoroDelete = useSelector((state) => state.pomodoroDelete)

  const pomodoroCreate = useSelector((state) => state.pomodoroCreate)

  const [updatedVisible, setUpdatedVisible] = useState(false)

  const [deleteDone, setDeleteDone] = useState(false)
  const [createDone, setCreateDone] = useState(false)
  const [updateDone, setUpdateDone] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [exerciseDuration, setExerciseDuration] = useState(0)
  const [exerciseNumber, setExerciseNumber] = useState(1)
  const [restDuration, setRestDuration] = useState(0)

  const nextExerciseHandler = () => {
    if (savedPomodoros.pomodoros.length > exerciseNumber + 1) {
      setExerciseNumber(exerciseNumber + 1)
      setName(savedPomodoros.pomodoros[exerciseNumber].name)
      setDescription(savedPomodoros.pomodoros[exerciseNumber].description)
      setExerciseDuration(
        savedPomodoros.pomodoros[exerciseNumber].pomodoroSeconds
      )
      setRestDuration(savedPomodoros.pomodoros[exerciseNumber].restSeconds)
    }
  }
  const previousExerciseHandler = () => {
    if (exerciseNumber >= 1) {
      setExerciseNumber(exerciseNumber - 1)
      setName(savedPomodoros.pomodoros[exerciseNumber].name)
      setDescription(savedPomodoros.pomodoros[exerciseNumber].description)
      setExerciseDuration(
        savedPomodoros.pomodoros[exerciseNumber].pomodoroSeconds
      )
      setRestDuration(savedPomodoros.pomodoros[exerciseNumber].restSeconds)
    }
  }

  const createPomodoroHandler = () => {
    dispatch(
      createMyPomodoro({
        pomodoroSeconds: exerciseDuration,
        restSeconds: restDuration,
        name: name,
        description: description,
      })
    )
    setCreateDone(true)
  }

  const submitDescriptionHandler = (e) => {
    e.preventDefault()
    setDescription(e.target.value)
  }
  const submitNameHandler = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const submitExerciseDurationHandler = (e) => {
    e.preventDefault()
    setExerciseDuration(e.target.value)
  }
  const submitRestDurationHandler = (e) => {
    e.preventDefault()
    setRestDuration(e.target.value)
  }
  // functions for local state duration of exe and rest
  const exerciseDurationPlusFive = () => {
    setExerciseDuration((exerciseDuration) => exerciseDuration + 5)
  }
  const exerciseDurationPlusTen = () => {
    setExerciseDuration((exerciseDuration) => exerciseDuration + 10)
  }
  const exerciseDurationPlusThirty = () => {
    setExerciseDuration((exerciseDuration) => exerciseDuration + 30)
  }
  const exerciseDurationMinusFive = () => {
    if (exerciseDuration > 4) {
      setExerciseDuration((exerciseDuration) => exerciseDuration - 5)
    }
  }

  const exerciseDurationMinusTen = () => {
    if (exerciseDuration > 9) {
      setExerciseDuration((exerciseDuration) => exerciseDuration - 10)
    }
  }
  const exerciseDurationMinusThirty = () => {
    if (exerciseDuration > 29) {
      setExerciseDuration((exerciseDuration) => exerciseDuration - 30)
    }
  }

  const restDurationPlusFive = () => {
    setRestDuration((restDuration) => restDuration + 5)
  }
  const restDurationPlusTen = () => {
    setRestDuration((restDuration) => restDuration + 10)
  }
  const restDurationPlusThirty = () => {
    setRestDuration((restDuration) => restDuration + 30)
  }
  const restDurationMinusFive = () => {
    if (restDuration > 4) {
      setRestDuration((restDuration) => restDuration - 5)
    }
  }
  const restDurationMinusTen = () => {
    if (restDuration > 9) {
      setRestDuration((restDuration) => restDuration - 10)
    }
  }
  const restDurationMinusThirty = () => {
    if (restDuration > 29) {
      setRestDuration((restDuration) => restDuration - 30)
    }
  }
  const restDurationReset = () => {
    setRestDuration(0)
  }
  const exerciseDurationReset = () => {
    setExerciseDuration(0)
  }

  //
  const trainingUpdateHandler = (id) => {
    dispatch(
      updateMyPomodoro({
        _id: id,
        pomodoroSeconds: exerciseDuration,
        restSeconds: restDuration,
        name: name,
        description: description,
      })
    )
    setUpdateDone(true)
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
    if (
      savedPomodoros.pomodoros &&
      savedPomodoros.pomodoros.length === 0 &&
      updatedPomodoro.pomodoros &&
      userInfo
    ) {
      dispatch(getMyPomodoros())
    }
    if (deleteDone === true && pomodoroDelete.success === true) {
      dispatch(getMyPomodoros())
      setDeleteDone(false)
    }
    if (createDone === true && pomodoroCreate.success === true) {
      dispatch(getMyPomodoros())
      setCreateDone(false)
    }
    if (updateDone === true && updatedPomodoro.success === true) {
      dispatch(getMyPomodoros())
      setUpdateDone(false)
    }
  }, [
    deleteDone,
    createDone,
    dispatch,
    userInfo,
    history,
    savedPomodoros,
    updatedPomodoro,
    updateDone,
    pomodoroCreate,
    pomodoroDelete,
  ])

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='name'>
              <Form.Label>Name of a new exercise</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name of an exercise'
                value={name}
                onChange={submitNameHandler}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='description'>
              <Form.Label>Description of a new exercise </Form.Label>
              <Form.Control
                type='text'
                placeholder='Description of an exercise'
                value={description}
                onChange={submitDescriptionHandler}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='exercise duration'>
              <Form.Label>Excercise duration</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter excercise duration'
                value={exerciseDuration}
                onChange={submitExerciseDurationHandler}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <Button size='sm' onClick={exerciseDurationPlusFive}>
                <b>+ 5</b>
              </Button>
              <Button size='sm' onClick={exerciseDurationPlusTen}>
                <b>+ 10</b>
              </Button>
              <Button size='sm' onClick={exerciseDurationPlusThirty}>
                <b>+ 30</b>
              </Button>
            </Row>
            <Row>
              <Button onClick={exerciseDurationMinusFive}>
                <b>- 5</b>
              </Button>
              <Button size='sm' onClick={exerciseDurationMinusTen}>
                <b>- 10</b>
              </Button>
              <Button size='sm' onClick={exerciseDurationMinusThirty}>
                <b>- 30</b>
              </Button>
              <Button size='sm' onClick={exerciseDurationReset}>
                <b>set to 0</b>
              </Button>
            </Row>
          </Col>
          <Col>
            <Form.Group controlId='rest duration'>
              <Form.Label>Rest duration</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter rest duration'
                value={restDuration}
                onChange={submitRestDurationHandler}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <Button size='sm' onClick={restDurationPlusFive}>
                <b>+ 5</b>
              </Button>
              <Button size='sm' onClick={restDurationPlusTen}>
                <b>+ 10</b>
              </Button>
              <Button size='sm' onClick={restDurationPlusThirty}>
                <b>+ 30</b>
              </Button>
            </Row>
            <Row>
              <Button size='sm' onClick={restDurationMinusFive}>
                <b>- 5</b>
              </Button>
              <Button size='sm' onClick={restDurationMinusTen}>
                <b>- 10</b>
              </Button>
              <Button size='sm' onClick={restDurationMinusThirty}>
                <b>- 30</b>
              </Button>
              <Button size='sm' onClick={restDurationReset}>
                <b>set to 0</b>
              </Button>
            </Row>
          </Col>
        </Row>
        <Col>
          <Button variant='success' onClick={createPomodoroHandler} size='sm'>
            Add a new excercise <i className='fas fa-plus-square'></i>
          </Button>
        </Col>
      </Form>
      <FormContainer>
        {savedPomodoros.pomodoros && savedPomodoros.pomodoros.length !== 0 ? (
          <Card className='p-3'>
            <Row className='justify-content-lg-center'>
              <Link to='/training' className='btn btn-dark my-3'>
                <i className='fas fa-undo-alt'></i> Back to training
              </Link>
            </Row>

            <Row className='justify-content-lg-center'>
              <Button variant='warning' flush onClick={previousExerciseHandler}>
                <i className='fas fa-arrow-left'></i> Previous exercise
              </Button>
              <Button variant='info' flush onClick={nextExerciseHandler}>
                Next exercise <i className='fas fa-arrow-right'></i>
              </Button>
            </Row>
          </Card>
        ) : (
          <Card className='p-3'>
            <Button
              variant='info'
              flush
              onClick={() => {
                dispatch(getMyPomodoros())
              }}
            >
              Load Data
            </Button>
          </Card>
        )}
      </FormContainer>

      {savedPomodoros &&
        savedPomodoros.pomodoros &&
        savedPomodoros.length !== 0 && (
          <Table bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Name </th>
                <th>Description </th>
                <th>Duration of an excercise </th>
                <th>Rest duration </th>
                <th>Delete or Update</th>
              </tr>
            </thead>
            <tbody>
              {pomodoros.map((savedPomodoro) => (
                <tr
                  key={savedPomodoro._id}
                  onClick={() => {
                    // console.log(exerciseNumber)
                    console.log(pomodoros.indexOf(savedPomodoro))
                    setExerciseNumber(pomodoros.indexOf(savedPomodoro))
                    setName(savedPomodoro.name)
                    setDescription(savedPomodoro.description)
                    setExerciseDuration(savedPomodoro.pomodoroSeconds)

                    setRestDuration(savedPomodoro.restSeconds)
                  }}
                >
                  <td>{savedPomodoro.name}</td>
                  <td>{savedPomodoro.description}</td>
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
                      update {savedPomodoro.name}
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

export default CreateNewExerciseScreen
