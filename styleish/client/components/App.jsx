import React, { Component } from "react";
import Nav from './Nav.jsx';
import { Wrapper } from '../styles/Wrapper.jsx';

class App extends Component {
  render() {
    return (
      <Wrapper>
        < Nav />
      </Wrapper>
    )
  }
}

export default App;
