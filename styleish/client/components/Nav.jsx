import React from 'react';
const NavLink = require('react-router-dom').NavLink;
import { NavStyle, UnorderedList } from '../styles/Nav.jsx'


function Nav() {
  return (
    <NavStyle>
      < UnorderedList >
        <li>logo</li>
        <li>about</li>
        <li>styled components</li>
        <li>try it</li>
      </UnorderedList>

      <UnorderedList>
        <li>donate</li>
        <li>github</li>
        <li>social</li>
      </UnorderedList>
    </NavStyle>
  )
}

export default Nav

