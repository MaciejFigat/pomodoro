import axios from 'axios'
import {
  POMODORO_GET_REQUEST,
  POMODORO_GET_SUCCESS,
  POMODORO_GET_FAIL,
  POMODORO_CREATE_REQUEST,
  POMODORO_CREATE_SUCCESS,
  POMODORO_CREATE_FAIL,
  POMODORO_CREATE_RESET,
} from '../constants/pomodoroConstants'

export const getPomodoros = () => async (dispatch) => {
  try {
    dispatch({ type: POMODORO_GET_REQUEST })

    const { data } = await axios.get(`/api/pomodoros`)

    dispatch({
      type: POMODORO_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPomodoro = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_CREATE_REQUEST,
    })

    const { data } = await axios.post(`/api/pomodoros`)

    dispatch({
      type: POMODORO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
