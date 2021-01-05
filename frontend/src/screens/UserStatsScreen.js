import React, { useState, useEffect } from 'react'
import {
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

  const [deleteDone, setDeleteDone] = useState(false)

  const deleteHandler = (id) => {
    console.log('deletehandler')
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
  }, [pomodorosDone, userInfo, pomodoroDoneDelete])

  return (
    <FormContainer>
      {pomodorosDone && pomodorosDone.length !== 0 && (
        <Table stripped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Duration of pomodoro </th>
              <th>Date of creation</th>
            </tr>
          </thead>
          <tbody>
            {pomodorosDone.map((pomodoroDone) => (
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
    </FormContainer>
  )
}

export default UserStatsScreen
