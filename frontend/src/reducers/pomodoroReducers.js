import {
  POMODORO_GET_REQUEST,
  POMODORO_GET_SUCCESS,
  POMODORO_GET_FAIL,
  POMODORO_CREATE_REQUEST,
  POMODORO_CREATE_SUCCESS,
  POMODORO_CREATE_FAIL,
  POMODORO_CREATE_RESET,
} from '../constants/pomodoroConstants'

export const getPomodoroInfoReducer = (
  state = { pomodoroInfo: {} },
  action
) => {
  switch (action.type) {
    case POMODORO_GET_REQUEST:
      return { loading: true, pomodoroInfo: {} }
    case POMODORO_GET_SUCCESS:
      return {
        loading: false,
        pomodoroInfo: action.payload.pomodoroInfo,
      }
    case POMODORO_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const pomodoroCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POMODORO_CREATE_REQUEST:
      return { loading: true }
    case POMODORO_CREATE_SUCCESS:
      return { loading: false, success: true, pomodoro: action.payload }
    case POMODORO_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case POMODORO_CREATE_RESET:
      return {}
    default:
      return state
  }
}
