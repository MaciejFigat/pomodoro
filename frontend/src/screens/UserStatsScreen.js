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
import { getMyDonePomodoros } from '../actions/pomodoroDoneActions'

const UserStatsScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getPomodoroDone = useSelector((state) => state.getPomodoroDone)
  const { pomodorosDone } = getPomodoroDone

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (userInfo && pomodorosDone && pomodorosDone.length === 0) {
      dispatch(getMyDonePomodoros())
    }
  }, [pomodorosDone, userInfo])

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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </FormContainer>
  )
}

export default UserStatsScreen
