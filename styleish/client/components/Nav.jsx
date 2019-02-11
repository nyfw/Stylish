import React from 'react';
import { Route, Link } from 'react-router-dom';
import { NavStyle, UnorderedList } from '../styles/Nav.jsx'

function Nav() {
  return (
    <NavStyle>
      <UnorderedList primary>
        <li>logo</li>
        <li><Link to="/about">About</Link></li>
        <li>styled components</li>
        <li><Link to="/login">Login</Link></li>
        <li>try it</li>
      </UnorderedList>

      <UnorderedList primary>
        <li>donate</li>
        <li>github</li>
        <li>social</li>
      </UnorderedList>
    </NavStyle>
  )
}

export default Nav

