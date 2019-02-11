import React from 'react';
import { TitleWrapper, AboutText, Button } from '../styles/Title.jsx';

class Login extends React.Component {
  render() {
    return (
      <TitleWrapper>
        <h1>Login</h1>
        <form action = "http://localhost:3000/login">
            Username: <input type= "text"></input>
            <br></br>
            <br></br>
            Password: <input type = "text"></input>
        </form>
      </TitleWrapper>
    )
  }
}
export default Login