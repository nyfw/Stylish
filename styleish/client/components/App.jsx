import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";

// components 
import Nav from './Nav.jsx';
import Title from './Title.jsx';
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

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle/>
        <Wrapper>
        <Nav/>
          <Title />
        </Wrapper>
      </div>
    )
  }
}

export default App;
