import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  getPomodoroInfoReducer,
  pomodoroCreateReducer,
  counterPomodoroReducer,
  counterRestReducer,
  savedPomodoroReducer,
} from './reducers/pomodoroReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getPomodoroInfo: getPomodoroInfoReducer,
  pomodoroCreate: pomodoroCreateReducer,
  counterPomodoro: counterPomodoroReducer,
  counterRest: counterRestReducer,
  savedPomodoro: savedPomodoroReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const pomodoroInfoFromStorage = localStorage.getItem('pomodoroInfo')
  ? JSON.parse(localStorage.getItem('pomodoroInfo'))
  : { savedPomodoroSeconds: 15, savedRestSeconds: 3 }

export const pomodoroSecondsFromStorage = localStorage.getItem(
  'pomodoroSeconds'
)
  ? JSON.parse(localStorage.getItem('pomodoroSeconds'))
  : pomodoroInfoFromStorage.savedPomodoroSeconds

export const restSecondsFromStorage = localStorage.getItem('restSeconds')
  ? JSON.parse(localStorage.getItem('restSeconds'))
  : pomodoroInfoFromStorage.savedRestSeconds

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  getPomodoroInfo: pomodoroInfoFromStorage,
  // savedPomodoro: pomodoroInfoFromStorage,
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
