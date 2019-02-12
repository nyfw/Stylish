import React from 'react';
import { TitleWrapper } from '../styles/Title.jsx';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    }
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleRegisterSubmit (e) {
    e.preventDefault();
    fetch('http://localhost:3000/users/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.refs.name.value,
        password: this.refs.email.value,
        name: this.refs.password.value,
      })
    })
      .then(response => response.json())
      .then((data)=>{
        console.log(data)
      })
  };

  render() {
    return (
      <TitleWrapper>
        <h1>Register for An Account</h1>
        <form onSubmit={(e)=>this.handleRegisterSubmit(e)}>
            Name: <input ref= "name" ></input>
            Email: <input ref= "email" ></input>
            <br></br>
            <br></br>
            New Password:<input ref = "password"></input>
            <br></br>
            <input type = "submit"></input>
        </form>
      </TitleWrapper>
    )
  }
}
export default Register