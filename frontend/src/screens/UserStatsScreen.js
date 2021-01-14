import React, { useState, useEffect } from 'react'
import {
  Container,
  Button,
  Row,
  Col,
  Badge,
  Card,
  Table,
  Accordion,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMyDonePomodoros,
  deletePomodoroDone,
} from '../actions/pomodoroDoneActions'

const UserStatsScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPomodoroDone = useSelector((state) => state.getPomodoroDone)
  const { pomodorosDone } = getPomodoroDone

  const pomodoroDoneDelete = useSelector((state) => state.pomodoroDoneDelete)
  const { success } = pomodoroDoneDelete

  const [deleteDone, setDeleteDone] = useState(false)
  const [trainingStatsToggle, setTrainingStatsToggle] = useState(false)
  const [pomodoroStatsToggle, setPomodoroStatsToggle] = useState(false)

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePomodoroDone(id))
      setDeleteDone(true)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (deleteDone === true) {
      dispatch(getMyDonePomodoros())
      setDeleteDone(false)
    }
    if (userInfo && pomodorosDone && pomodorosDone.length === 0) {
      dispatch(getMyDonePomodoros())
    }
  }, [dispatch, pomodorosDone, userInfo, success, history])

  return (
    <FormContainer>
      {pomodorosDone && pomodorosDone.length === 0 && (
        <Card className='p-3'>
          <Button
            variant='info'
            flush
            onClick={() => {
              dispatch(getMyDonePomodoros())
            }}
          >
            Load Data
          </Button>
        </Card>
      )}

      <Card className='p-3'>
        <Row className='justify-content-center'>
          <Button
            variant='success'
            flush
            onClick={() => {
              setPomodoroStatsToggle(false)
              setTrainingStatsToggle(true)
            }}
          >
            Show training data <i className='fas fa-dumbbell'></i>
          </Button>
          <Button
            variant='info'
            flush
            onClick={() => {
              setPomodoroStatsToggle(true)
              setTrainingStatsToggle(false)
            }}
          >
            Show pomodoro data <i className='fas fa-pizza-slice'></i>
          </Button>
        </Row>
      </Card>

      {pomodorosDone &&
        pomodorosDone.length !== 0 &&
        pomodoroStatsToggle === true && (
          <Table stripped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Duration of pomodoro </th>
                <th>Date of creation</th>
              </tr>
            </thead>
            <tbody>
              {pomodorosDone
                .filter((pomodoroDone) => pomodoroDone.pomodoroType === true)
                .map((pomodoroDone) => (
                  <tr key={pomodoroDone._id}>
                    <td>
                      {Math.trunc(pomodoroDone.secondsDone / 60)} minutes{' '}
                      {pomodoroDone.secondsDone % 60} seconds
                    </td>
                    <td>
                      {pomodoroDone.createdAt.substring(0, 10)} at{' '}
                      {pomodoroDone.createdAt.substring(11, 16)}{' '}
                    </td>
                    <td>
                      {' '}
                      <Button
                        variant='danger'
                        onClick={() => deleteHandler(pomodoroDone._id)}
                        size='sm'
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}

      {pomodorosDone &&
        pomodorosDone.length !== 0 &&
        trainingStatsToggle === true && (
          <Table stripped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Name </th>
                <th>Exercise Duration </th>
                <th>Date of creation</th>
              </tr>
            </thead>
            <tbody>
              {pomodorosDone
                .filter(
                  (pomodoroDone) =>
                    pomodoroDone.pomodoroType === false ||
                    !pomodoroDone.pomodoroType
                )
                .map((pomodoroDone) => (
                  <tr key={pomodoroDone._id}>
                    <td>{pomodoroDone.name}</td>
                    <td>
                      {Math.trunc(pomodoroDone.secondsDone / 60)} minutes{' '}
                      {pomodoroDone.secondsDone % 60} seconds
                    </td>
                    <td>
                      {pomodoroDone.createdAt.substring(0, 10)} at{' '}
                      {pomodoroDone.createdAt.substring(11, 16)}{' '}
                    </td>
                    <td>
                      {' '}
                      <Button
                        variant='danger'
                        onClick={() => deleteHandler(pomodoroDone._id)}
                        size='sm'
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
    </FormContainer>
  )
}

export default UserStatsScreen
