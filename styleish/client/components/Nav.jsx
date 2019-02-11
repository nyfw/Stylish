import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavStyle, UnorderedList } from '../styles/Nav.jsx'

function Nav() {
  return (
    <NavStyle>
      <UnorderedList primary>
        <li>logo</li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </UnorderedList>

      <UnorderedList primary>
        <li>Github</li>
      </UnorderedList>
    </NavStyle>
  )
}

export default Nav

