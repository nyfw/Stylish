import React, { Component } from "react";
import '../styles/index.css';
import Nav from './Nav.jsx';
import Login from './Login.jsx';

class App extends Component {
  render() {
    return (
      <div>
        < Nav />
        <Login />
      </div>
    )
  }
}

export default App;
