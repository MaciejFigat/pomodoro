import React, { useState, useEffect } from 'react'
import { Button, Row, Card, Table } from 'react-bootstrap'
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
  }, [dispatch, pomodorosDone, userInfo, success, history, deleteDone])

  return (
    <>
      <FormContainer>
        {pomodorosDone && pomodorosDone.length === 0 && (
          <Card>
            <Row className='justify-content-center p-3'>
              <Button
                style={{ maxWidth: '15rem' }}
                variant='info'
                onClick={() => {
                  dispatch(getMyDonePomodoros())
                }}
              >
                Load Data
              </Button>
            </Row>
          </Card>
        )}

        <Card className='p-3 m-2'>
          <Row className='justify-content-center'>
            <Button
              style={{ maxWidth: '15rem' }}
              variant='success'
              className='m-2'
              onClick={() => {
                setPomodoroStatsToggle(false)
                setTrainingStatsToggle(true)
              }}
            >
              <i className='fas fa-dumbbell'></i> Your training data
            </Button>
            <Button
              variant='info'
              className='m-2'
              style={{ maxWidth: '15rem' }}
              onClick={() => {
                setPomodoroStatsToggle(true)
                setTrainingStatsToggle(false)
              }}
            >
              <i className='fas fa-pizza-slice'></i> Your pomodoro data
            </Button>
          </Row>
        </Card>

        {pomodorosDone &&
          pomodorosDone.length !== 0 &&
          pomodoroStatsToggle === true && (
            <Table bordered hover responsive className='table-sm table-dark'>
              <thead>
                <tr class='table-light'>
                  <th>Duration of pomodoro </th>
                  <th>Date of creation</th>
                  <th>Delete record</th>
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
                          variant='primary'
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
      {pomodorosDone &&
        pomodorosDone.length !== 0 &&
        trainingStatsToggle === true && (
          <Table bordered hover responsive className='table-sm table-dark'>
            <thead>
              <tr class='table-light'>
                <th>Name </th>
                <th>Exercise Duration </th>
                <th>Date of creation</th>
                <th>Delete record</th>
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
                        variant='primary'
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
    </>
  )
}

export default UserStatsScreen
