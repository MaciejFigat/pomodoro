import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import PomodoroDisplayScreen from './screens/PomodoroDisplayScreen'
import CustomPomodoroScreen from './screens/CustomPomodoroScreen'
import LoginScreen from './screens/LoginScreen'

import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/custom' component={CustomPomodoroScreen} />
        <Route path='/' component={PomodoroDisplayScreen} exact />
      </Container>
    </Router>
  )
}

export default App
