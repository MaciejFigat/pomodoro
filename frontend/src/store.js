import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  getPomodoroInfoReducer,
  pomodoroCreateReducer,
  counterPomodoroReducer,
  counterRestReducer,
} from './reducers/pomodoroReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getPomodoroInfo: getPomodoroInfoReducer,
  pomodoroCreate: pomodoroCreateReducer,
  counterPomodoro: counterPomodoroReducer,
  counterRest: counterRestReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const pomodoroInfoFromStorage = localStorage.getItem('pomodoroInfo')
  ? JSON.parse(localStorage.getItem('pomodoroInfo'))
  : null

export const pomodoroSecondsFromStorage = localStorage.getItem(
  'pomodoroSeconds'
)
  ? JSON.parse(localStorage.getItem('pomodoroSeconds'))
  : 3
export const restSecondsFromStorage = localStorage.getItem('restSeconds')
  ? JSON.parse(localStorage.getItem('restSeconds'))
  : 3

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  getPomodoroInfo: {
    pomodoroInfo: pomodoroInfoFromStorage,
  },
  counterPomodoro: { pomodoroSeconds: pomodoroSecondsFromStorage },
  counterRest: { restSeconds: restSecondsFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
