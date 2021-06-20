import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  // SplitButton,
  // Dropdown,
} from 'react-bootstrap'
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
          {userInfo ? (
            <>
              {' '}
              <NavDropdown
                title={userInfo.name}
                // id='username'
                drop={'down'}
                id={'dropdown-button-drop-left'}
              >
                <LinkContainer to={'/stats'}>
                  <NavDropdown.Item>
                    <i className='fas fa-database'></i> Stats
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/create'>
                  <NavDropdown.Item>
                    <i className='fas fa-cogs'></i> Settings
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt'></i> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user-ninja'></i> Log in
              </Nav.Link>
            </LinkContainer>
          )}
          {userInfo ? (
            <LinkContainer to='/training'>
              <Nav.Link>
                <i className='fas fa-dumbbell'></i> Training
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
                <i className='fas fa-clock'></i> Pomodoro
              </Nav.Link>
            </LinkContainer>
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

// <SplitButton
// id='username'
// drop={'left'}
// variant='secondary'
// title={userInfo.name}
// >
// <LinkContainer to={'/stats'}>
//   <Dropdown.Item>
//     <i className='fas fa-database'></i> Stats
//   </Dropdown.Item>
// </LinkContainer>
// <LinkContainer to='/create'>
//   <Dropdown.Item>
//     <i className='fas fa-cogs'></i> Settings
//   </Dropdown.Item>
// </LinkContainer>
// <Dropdown.Divider />
// <Dropdown.Item onClick={logoutHandler}>
//   <i className='fas fa-sign-out-alt'></i> Logout
// </Dropdown.Item>
// </SplitButton>
