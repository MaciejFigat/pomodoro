import {
  POMODORO_DONE_CREATE_REQUEST,
  POMODORO_DONE_CREATE_SUCCESS,
  POMODORO_DONE_CREATE_FAIL,
  POMODORO_DONE_CREATE_RESET,
  POMODORO_DONE_GET_REQUEST,
  POMODORO_DONE_GET_SUCCESS,
  POMODORO_DONE_GET_FAIL,
  POMODORO_DONE_GET_RESET,
  POMODORO_DONE_DELETE_REQUEST,
  POMODORO_DONE_DELETE_SUCCESS,
  POMODORO_DONE_DELETE_FAIL,
} from '../constants/pomodoroDoneConstants'

// to create a new pomodoroDone

export const pomodoroDoneCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POMODORO_DONE_CREATE_REQUEST:
      return { loading: true }
    case POMODORO_DONE_CREATE_SUCCESS:
      return { loading: false, success: true, pomodoroDone: action.payload }
    case POMODORO_DONE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case POMODORO_DONE_CREATE_RESET:
      return {}

    default:
      return state
  }
}

// to get all a user did
export const getPomodoroDoneReducer = (
  state = { pomodorosDone: [] },
  action
) => {
  switch (action.type) {
    case POMODORO_DONE_GET_REQUEST:
      return { loading: true }
    case POMODORO_DONE_GET_SUCCESS:
      return {
        loading: false,
        pomodorosDone: action.payload,
      }
    case POMODORO_DONE_GET_FAIL:
      return { loading: false, error: action.payload }
    case POMODORO_DONE_GET_RESET:
      return {}
    default:
      return state
  }
}

// to attempt deleting the pomodoroDone
export const pomodoroDoneDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POMODORO_DONE_DELETE_REQUEST:
      return { loading: true }
    case POMODORO_DONE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case POMODORO_DONE_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
