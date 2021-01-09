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

  const createdPomodoro = useSelector((state) => state.pomodoroCreate)

  const [updatedVisible, setUpdatedVisible] = useState(false)

  const [deleteDone, setDeleteDone] = useState(false)
  const [createDone, setCreateDone] = useState(false)
  const [updateDone, setUpdateDone] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [exerciseDuration, setExerciseDuration] = useState('')
  const [restDuration, setRestDuration] = useState('')

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
    if (deleteDone === true) {
      dispatch(getMyPomodoros())
      setDeleteDone(false)
    }
    if (createDone === true) {
      dispatch(getMyPomodoros())
      setCreateDone(false)
    }
    if (updateDone === true) {
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
  ])

  return (
    <>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label>Name of a new exercise</Form.Label>
          <Form.Control
            type='name'
            placeholder='Name of an exercise'
            value={name}
            onChange={submitNameHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description of a new exercise </Form.Label>
          <Form.Control
            type='text'
            placeholder='Description of an exercise'
            value={description}
            onChange={submitDescriptionHandler}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='exercise duration'>
          <Form.Label>Excercise duration</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter excercise duration'
            value={exerciseDuration}
            onChange={submitExerciseDurationHandler}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='rest duration'>
          <Form.Label>Rest duration</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter rest duration'
            value={restDuration}
            onChange={submitRestDurationHandler}
          ></Form.Control>
        </Form.Group>

        <Button variant='success' onClick={createPomodoroHandler} size='sm'>
          Add a new excercise <i className='fas fa-plus-square'></i>
        </Button>
      </Form>

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
                <th>Delete or Update</th>
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

export default CreateNewExerciseScreen
