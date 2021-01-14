import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          {userInfo ? (
            <LinkContainer to='/training'>
              <Nav.Link>
                <i className='fas fa-dumbbell'></i> {userInfo.name}'s training
                plan
              </Nav.Link>
            </LinkContainer>
          ) : (
            <LinkContainer to='/'>
              <Navbar.Brand>Pomodoro Timer</Navbar.Brand>
            </LinkContainer>
          )}
          {userInfo ? (
            <LinkContainer to='/custom'>
              <Nav.Link>
                <i className='fas fa-user-clock'></i> {userInfo.name}'s pomodoro
              </Nav.Link>
            </LinkContainer>
          ) : (
            <></>
          )}

          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to={'/profile'}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to={'/stats'}>
                <NavDropdown.Item>
                  <i className='fas fa-pizza-slice'></i> pomodoro stats
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/create'>
                <NavDropdown.Item>
                  <i className='fas fa-plus-square'></i> Training settings
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user-tie'></i> Log in
              </Nav.Link>
            </LinkContainer>
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
