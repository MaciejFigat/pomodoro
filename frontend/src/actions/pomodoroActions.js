import axios from 'axios'
import {
  POMODORO_GET_REQUEST,
  POMODORO_GET_SUCCESS,
  POMODORO_GET_FAIL,
  POMODORO_CREATE_REQUEST,
  POMODORO_CREATE_SUCCESS,
  POMODORO_CREATE_FAIL,
  POMODORO_CREATE_RESET,
  POMODORO_SECONDS_UPDATE,
  REST_SECONDS_UPDATE,
  POMODORO_SECONDS_DECREMENT,
  POMODORO_SECONDS_RESET,
  REST_SECONDS_DECREMENT,
  REST_SECONDS_RESET,
  POMODORO_MINUTES_INCREMENT,
  POMODORO_MINUTES_DECREMENT,
  REST_MINUTES_INCREMENT,
  REST_MINUTES_DECREMENT,
  SET_REST_ZERO,
} from '../constants/pomodoroConstants'

// export const getPomodoro = () => async (dispatch) => {
//   try {
//     dispatch({ type: POMODORO_GET_REQUEST })

//     // const { data } = await axios.get(`/api/pomodoros`)

//     dispatch({
//       type: POMODORO_GET_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: POMODORO_GET_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

// export const createPomodoro = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: POMODORO_CREATE_REQUEST,
//     })

//     const { data } = await axios.post(`/api/pomodoros`)

//     dispatch({
//       type: POMODORO_CREATE_SUCCESS,
//       payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: POMODORO_CREATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     })
//   }
// }

export const decreasePomodoro = () => {
  return {
    type: POMODORO_SECONDS_DECREMENT,
  }
}
export const resetPomodoro = () => {
  return {
    type: POMODORO_SECONDS_RESET,
  }
}

export const decreaseRest = () => {
  return {
    type: REST_SECONDS_DECREMENT,
  }
}
export const resetRest = () => {
  return {
    type: REST_SECONDS_RESET,
  }
}
export const setZeroRest = () => {
  return {
    type: SET_REST_ZERO,
  }
}

export const increasePomodoroMinutes = () => {
  return {
    type: POMODORO_MINUTES_INCREMENT,
  }
}

export const decreasePomodoroMinutes = () => {
  return {
    type: POMODORO_MINUTES_DECREMENT,
  }
}

export const increaseRestMinutes = () => {
  return {
    type: REST_MINUTES_INCREMENT,
  }
}

export const decreaseRestMinutes = () => {
  return {
    type: REST_MINUTES_DECREMENT,
  }
}
