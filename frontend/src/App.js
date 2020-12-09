import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import PomodoroDisplayScreen from './screens/PomodoroDisplayScreen'
import LoginScreen from './screens/LoginScreen'
import LoginTest from './screens/LoginTest'
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <>
      <LoginTest />
      <RegisterScreen />
    </>
  )
}

export default App

// <Router>
//       <Header />
//       <LoginScreen />
//       <LoginTest />
//       <Route path='/login' component={LoginScreen} />
//       <Route path='/register' component={RegisterScreen} />
//       <Route path='/pomodoro' component={PomodoroDisplayScreen} />
//       <PomodoroDisplayScreen />
//       <RegisterScreen />
//     </Router>
