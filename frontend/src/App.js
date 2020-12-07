import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import PomodoroDisplayScreen from './screens/PomodoroDisplayScreen'
import LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <Router>
      <Header />
      <LoginScreen />
      <Route path='/login' component={LoginScreen} />
      <Route path='/pomodoro' component={PomodoroDisplayScreen} />
      <PomodoroDisplayScreen />
    </Router>
  )
}

export default App
