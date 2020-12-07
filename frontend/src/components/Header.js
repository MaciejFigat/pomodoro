import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
const Header = () => {
  const logoutHandler = () => {
    // logout here
  }

  return (
    <header>
      <Navbar>
        <Container>HEADER</Container>
      </Navbar>
    </header>
  )
}

export default Header
