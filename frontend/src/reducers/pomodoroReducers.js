import {
  POMODORO_GET_REQUEST,
  POMODORO_GET_SUCCESS,
  POMODORO_GET_FAIL,
  POMODORO_CREATE_REQUEST,
  POMODORO_CREATE_SUCCESS,
  POMODORO_CREATE_FAIL,
  POMODORO_CREATE_RESET,
  POMODORO_SECONDS_DECREMENT,
  POMODORO_SECONDS_RESET,
  REST_SECONDS_DECREMENT,
  REST_SECONDS_RESET,
} from '../constants/pomodoroConstants'
import { pomodoroSecondsFromStorage, restSecondsFromStorage } from '../store'
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

export const counterRestReducer = (state = { restSeconds: {} }, action) => {
  if (action.type === REST_SECONDS_DECREMENT && state.restSeconds > 0) {
    return {
      ...state,
      restSeconds: state.restSeconds - 1,
    }
  } else if (action.type === REST_SECONDS_RESET) {
    return (state = { restSeconds: restSecondsFromStorage })
  }
  return state
}

export const counterPomodoroReducer = (
  state = { pomodoroSeconds: {} },
  action
) => {
  if (action.type === POMODORO_SECONDS_DECREMENT && state.pomodoroSeconds > 0) {
    return {
      ...state,
      pomodoroSeconds: state.pomodoroSeconds - 1,
    }
  } else if (action.type === POMODORO_SECONDS_RESET) {
    return (state = { pomodoroSeconds: pomodoroSecondsFromStorage })
  }
  return state
}

// export const counterPomodoroReducer = (
//   state = { pomodoroSeconds: {} },
//   action
// ) => {
//   switch (action.type) {
//     case POMODORO_SECONDS_DECREMENT:
//       return { ...state, pomodoroSeconds: state.pomodoroSeconds - 1 }
//     case POMODORO_SECONDS_RESET:
//       return {}
//     default:
//       return state
//   }
// }

// export const counterRestReducer = (state = { restSeconds: {} }, action) => {
//   switch (action.type) {

//     case REST_SECONDS_DECREMENT:
//       return { ...state, restSeconds: state.restSeconds - 1 }

//     case REST_SECONDS_RESET:
//       return { restSeconds: state }
//     default:
//       return state
//   }
// }
