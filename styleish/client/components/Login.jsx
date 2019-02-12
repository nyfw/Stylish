import React from 'react';
import { TitleWrapper, AboutText, Button } from '../styles/Title.jsx';

class Login extends React.Component {

  constructor(props) {
      super(props);
        this.state = {
          name: '',
          email: '',
          password: '',

        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      }

      handleLoginSubmit (e) {
        e.preventDefault();
        fetch('http://localhost:3000/users/login', {
          method: 'post',
          headers: { 'Content-Type': 'application/json', 
                     'authorization': sessionStorage.getItem('id_token')},
          body: JSON.stringify({
            email: this.refs.email.value,
            password: this.refs.password.value,
          })
        })
          .then(response => {
              console.log('handle submit', response);
              sessionStorage.setItem('id_token', response.token);
          })
      };

    

  render() {
    return (
      <TitleWrapper>
        <h1>Login</h1>
        <form onSubmit = {(e)=>this.handleLoginSubmit(e)}>
            Email: <input ref= "email"></input>
            <br></br>
            Password: <input ref= "password"></input>
            <input type = "submit"></input>
        </form>
      </TitleWrapper>
    )
  }
}
export default Login