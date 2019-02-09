import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";

// components 
import Nav from './Nav.jsx';
<<<<<<< HEAD
import Login from './Login.jsx';
=======
import Title from './Title.jsx';
import Ide from './Ide.jsx';

// style components
import { Wrapper } from '../styles/Wrapper.jsx';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    height: 100%;
    width: 100%;
  }
  * *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    height: 100%;
    width: 100%;
  }
`;
>>>>>>> be70091c5e1acc28b236e5a2d62afa290e4e282f

class App extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        < Nav />
        <Login />
=======
        <GlobalStyle/>
        <Wrapper>
        < Nav />
          < Title />
          <Ide/>
        </Wrapper>
>>>>>>> be70091c5e1acc28b236e5a2d62afa290e4e282f
      </div>
    )
  }
}

export default App;
