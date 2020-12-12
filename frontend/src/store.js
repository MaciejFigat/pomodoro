import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  getPomodoroInfoReducer,
  pomodoroCreateReducer,
} from './reducers/pomodoroReducers'
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getPomodoroInfo: getPomodoroInfoReducer,
  pomodoroCreate: pomodoroCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const pomodoroInfoFromStorage = localStorage.getItem('pomodoroInfo')
  ? JSON.parse(localStorage.getItem('pomodoroInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  getPomodoroInfo: {
    pomodoroInfo: pomodoroInfoFromStorage,
    pomodoroSeconds: 1500,
    restSeconds: 300,
  },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
