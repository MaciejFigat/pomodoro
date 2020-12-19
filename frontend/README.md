## Pomodoro app with login 

## routing
npm install react-router-dom

npm i react-router-bootstrap

## styles for now 
npm i react-bootstrap
## Redux setup + redux-thunk
npm i redux react-redux redux-thunk
store.js
npm i redux-devtools-extension

1. userConstants USER_LOGIN_REQUEST etc.
2. userReducers - created userLoginReducer - > add to the store.js
3. userActions - login, logout

 404 when logging in - maybe encryption of password doesnt work
 maybe its moongoose, but backend is tested

 1. redux setup for registering the user
 2. backend for registerUser 

## ## setup for global state for the following:
Decreasing 
- secondsPomodoro 
- secondsRest 
counterPomodoroReducer - reducer
decreasePomodoro - action with type: POMODORO_SECONDS_DECREMENT
- I put logic in reducers, it does the decreasing of the pomodoroSeconds value
- in case of resetPomodoro I imported the initial value from store ie. imported restSecondsFromStorage



