import axios from 'axios'
import {
  POMODORO_GET_REQUEST,
  POMODORO_GET_SUCCESS,
  POMODORO_GET_FAIL,
  POMODORO_CREATE_REQUEST,
  POMODORO_CREATE_SUCCESS,
  POMODORO_CREATE_FAIL,
  POMODORO_UPDATE_REQUEST,
  POMODORO_UPDATE_SUCCESS,
  POMODORO_UPDATE_FAIL,
  POMODORO_SECONDS_DECREMENT,
  POMODORO_SECONDS_RESET,
  REST_SECONDS_DECREMENT,
  REST_SECONDS_RESET,
  POMODORO_MINUTES_INCREMENT,
  POMODORO_MINUTES_DECREMENT,
  REST_MINUTES_INCREMENT,
  REST_MINUTES_DECREMENT,
  SET_REST_ZERO,
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

export const getMyPomodoros = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_GET_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/pomodoros/mypomodoros`, config)

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

export const createMyPomodoro = (pomodoro) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/pomodoros`, pomodoro, config)

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
// action to update the pomodoro the user created by id
export const updateMyPomodoro = (pomodoro) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/pomodoros/${pomodoro._id}`,
      pomodoro,
      config
    )

    dispatch({
      type: POMODORO_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const decreasePomodoro = () => {
  return {
    type: POMODORO_SECONDS_DECREMENT,
    payload: 1,
  }
}
export const resetPomodoro = () => {
  return {
    type: POMODORO_SECONDS_RESET,
  }
}
// 2 actions to set the timer to my object I've gotten from the server
export const pomodoroSecondsSet = (data) => {
  return {
    type: POMODORO_SECONDS_SET,
    payload: data,
  }
}

export const restSecondsSet = (data) => {
  return {
    type: REST_SECONDS_SET,
    payload: data,
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

// pomodoro duration that is displayed in the timer + 1 min

export const increasePomodoroMinutes = () => {
  return {
    type: POMODORO_MINUTES_INCREMENT,
  }
}
// pomodoro duration that is displayed in the timer - 1 min

export const decreasePomodoroMinutes = () => {
  return {
    type: POMODORO_MINUTES_DECREMENT,
  }
}

// rest duration that is displayed in the timer + 1 min

export const increaseRestMinutes = () => {
  return {
    type: REST_MINUTES_INCREMENT,
  }
}

// rest duration that is displayed in the timer - 1 min

export const decreaseRestMinutes = () => {
  return {
    type: REST_MINUTES_DECREMENT,
  }
}

// savedRestSeconds + 1 min

export const increaseSavedRestMinutes = () => {
  return {
    type: SAVED_REST_MINUTES_INCREMENT,
  }
}

// savedRestSeconds - 1 min

export const decreaseSavedRestMinutes = () => {
  return {
    type: SAVED_REST_MINUTES_DECREMENT,
  }
}

// savedPomodoroSeconds + 1 min

export const increaseSavedPomodoroMinutes = () => {
  return {
    type: SAVED_POMODORO_MINUTES_INCREMENT,
  }
}
// savedPomodoroSeconds - 1 min

export const decreaseSavedPomodoroMinutes = () => {
  return {
    type: SAVED_POMODORO_MINUTES_DECREMENT,
  }
}

export const deletePomodoro = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POMODORO_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/pomodoros/${id}`, config)

    dispatch({
      type: POMODORO_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: POMODORO_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
