import {
  POMODORO_GET_REQUEST,
  POMODORO_GET_SUCCESS,
  POMODORO_GET_FAIL,
  POMODORO_GET_RESET,
  POMODORO_CREATE_REQUEST,
  POMODORO_CREATE_SUCCESS,
  POMODORO_CREATE_FAIL,
  POMODORO_CREATE_RESET,
  POMODORO_UPDATE_REQUEST,
  POMODORO_UPDATE_SUCCESS,
  POMODORO_UPDATE_FAIL,
  POMODORO_UPDATE_RESET,
  POMODORO_SECONDS_DECREMENT,
  POMODORO_SECONDS_RESET,
  REST_SECONDS_DECREMENT,
  REST_SECONDS_RESET,
  SET_REST_ZERO,
  POMODORO_MINUTES_INCREMENT,
  POMODORO_MINUTES_DECREMENT,
  REST_MINUTES_INCREMENT,
  REST_MINUTES_DECREMENT,
  SAVED_POMODORO_MINUTES_INCREMENT,
  SAVED_POMODORO_MINUTES_DECREMENT,
  SAVED_REST_MINUTES_INCREMENT,
  SAVED_REST_MINUTES_DECREMENT,
  REST_SECONDS_SET,
  POMODORO_SECONDS_SET,
  POMODORO_DELETE_REQUEST,
  POMODORO_DELETE_SUCCESS,
  POMODORO_DELETE_FAIL,
} from '../constants/pomodoroConstants'
import { pomodoroSecondsFromStorage, restSecondsFromStorage } from '../store'

export const getPomodoroInfoReducer = (state = { pomodoros: [] }, action) => {
  switch (action.type) {
    case POMODORO_GET_REQUEST:
      return { loading: true }
    case POMODORO_GET_SUCCESS:
      return {
        loading: false,
        pomodoros: action.payload,
      }
    case POMODORO_GET_FAIL:
      return { loading: false, error: action.payload }
    case POMODORO_GET_RESET:
      return { pomodoros: [] }
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

export const savedPomodoroReducer = (state = { pomodoroInfo: {} }, action) => {
  if (
    action.type === SAVED_REST_MINUTES_INCREMENT &&
    state.savedRestSeconds <= 3600
  ) {
    return { ...state, savedRestSeconds: state.savedRestSeconds + 60 }
  } else if (
    action.type === SAVED_REST_MINUTES_DECREMENT &&
    state.savedRestSeconds >= 60
  ) {
    return { ...state, savedRestSeconds: state.savedRestSeconds - 60 }
  } else if (
    action.type === SAVED_POMODORO_MINUTES_INCREMENT &&
    state.savedPomodoroSeconds <= 3600
  ) {
    return { ...state, savedPomodoroSeconds: state.savedPomodoroSeconds + 60 }
  } else if (
    action.type === SAVED_POMODORO_MINUTES_DECREMENT &&
    state.savedPomodoroSeconds >= 60
  ) {
    return { ...state, savedPomodoroSeconds: state.savedPomodoroSeconds - 60 }
  }
  return state
}

export const counterRestReducer = (state = { restSeconds: {} }, action) => {
  if (action.type === REST_SECONDS_SET) {
    return { ...state, restSeconds: action.payload }
  } else if (action.type === REST_SECONDS_DECREMENT && state.restSeconds > 0) {
    return {
      ...state,
      restSeconds: state.restSeconds - 1,
    }
  } else if (action.type === REST_SECONDS_RESET) {
    return (state = { restSeconds: restSecondsFromStorage })
  } else if (
    action.type === REST_MINUTES_INCREMENT &&
    state.restSeconds <= 3600
  ) {
    return { ...state, restSeconds: state.restSeconds + 60 }
  } else if (action.type === REST_MINUTES_DECREMENT && state.restSeconds > 60) {
    return { ...state, restSeconds: state.restSeconds - 60 }
  } else if (action.type === REST_MINUTES_DECREMENT && state.restSeconds < 60) {
    return { ...state, restSeconds: 0 }
  } else if (action.type === SET_REST_ZERO) {
    return { ...state, restSeconds: 0 }
  }
  return state
}

export const counterPomodoroReducer = (
  state = { pomodoroSeconds: {} },
  action
) => {
  if (action.type === POMODORO_SECONDS_SET) {
    return { ...state, pomodoroSeconds: action.payload }
  } else if (
    action.type === POMODORO_SECONDS_DECREMENT &&
    state.pomodoroSeconds > 0
  ) {
    return {
      ...state,
      pomodoroSeconds: state.pomodoroSeconds - 1,
    }
  } else if (action.type === POMODORO_SECONDS_RESET) {
    return (state = { pomodoroSeconds: pomodoroSecondsFromStorage })
  } else if (
    action.type === POMODORO_MINUTES_INCREMENT &&
    state.pomodoroSeconds <= 3600
  ) {
    return { ...state, pomodoroSeconds: state.pomodoroSeconds + 60 }
  } else if (
    action.type === POMODORO_MINUTES_DECREMENT &&
    state.pomodoroSeconds > 60
  ) {
    return { ...state, pomodoroSeconds: state.pomodoroSeconds - 60 }
  } else if (
    action.type === POMODORO_MINUTES_DECREMENT &&
    state.pomodoroSeconds < 60
  ) {
    return { ...state, pomodoroSeconds: 0 }
  }

  return state
}

export const pomodoroUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case POMODORO_UPDATE_REQUEST:
      return { loading: true }
    case POMODORO_UPDATE_SUCCESS:
      return { loading: false, success: true, pomodoros: action.payload }
    case POMODORO_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case POMODORO_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

// to attempt deleting the pomodoro
export const pomodoroDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POMODORO_DELETE_REQUEST:
      return { loading: true }
    case POMODORO_DELETE_SUCCESS:
      return { loading: false, success: true }
    case POMODORO_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
