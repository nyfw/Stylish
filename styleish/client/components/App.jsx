import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { Route, Link } from 'react-router-dom';
// components 
import Nav from './Nav.jsx';
import Title from './Title.jsx';
import Login from "./Login.jsx";
import Opening from "./Opening.jsx";


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

function Home (){
  return (
    <div>
      <Wrapper>
      <GlobalStyle/>
      <Nav/>
      <Title />
      </Wrapper>
    </div>
  )
};

class App extends Component {
  render() {
    return (
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/about" component={Opening}/>
        </div>
    )
  }
}

export default App;


