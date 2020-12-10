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
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          PomTimer
          <LinkContainer to='/'>
            <Navbar.Brand>HOME</Navbar.Brand>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to={'/profile'}>
                <NavDropdown.Item>Profil</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Wyloguj się
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user-tie'></i> Zaloguj się
              </Nav.Link>
            </LinkContainer>
          )}
          <LinkContainer to='/login'>
            <Navbar.Brand>LOGIN</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/logintest'>
            <Navbar.Brand>LOGIN 2</Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/register'>
            <Navbar.Brand>REGISTER</Navbar.Brand>
          </LinkContainer>
        </Container>
        <button onClick={logoutHandler}>LOGOUT</button>
      </Navbar>
    </header>
  )
}

export default Header
