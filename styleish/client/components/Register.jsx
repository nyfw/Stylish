import React from 'react';
import { TitleWrapper } from '../styles/Title.jsx';

class Register extends React.Component {
  render() {
    return (
      <TitleWrapper>
        <h1>Register for An Account</h1>
        <form action = "http://localhost:3000/register" method = "post" >
            New Username: <input type= "text"></input>
            <br></br>
            <br></br>
            New Password: <input type = "text"></input>
            <input type = "submit"></input>
            <br></br>
        </form>
      </TitleWrapper>
    )
  }
}
export default Register