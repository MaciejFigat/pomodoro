import axios from 'axios'
import {
  POMODORO_DONE_CREATE_REQUEST,
  POMODORO_DONE_CREATE_SUCCESS,
  POMODORO_DONE_CREATE_FAIL,
  POMODORO_DONE_GET_REQUEST,
  POMODORO_DONE_GET_SUCCESS,
  POMODORO_DONE_GET_FAIL,
  POMODORO_DONE_DELETE_REQUEST,
  POMODORO_DONE_DELETE_SUCCESS,
  POMODORO_DONE_DELETE_FAIL,
} from '../constants/pomodoroDoneConstants'

export const getMyDonePomodoros = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_DONE_GET_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/donepomodoros/mydonepomodoros`,
      config
    )

    dispatch({
      type: POMODORO_DONE_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_DONE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveMyDonePomodoro = (pomodoroDone) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POMODORO_DONE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/donepomodoros`,
      pomodoroDone,
      config
    )

    dispatch({
      type: POMODORO_DONE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_DONE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePomodoroDone = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_DONE_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/donepomodoros/${id}`, config)

    dispatch({
      type: POMODORO_DONE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_DONE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// POMODORO_DONE_DELETE_REQUEST,
// POMODORO_DONE_DELETE_SUCCESS,
// POMODORO_DONE_DELETE_FAIL,
