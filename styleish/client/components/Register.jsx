import React from "react";
import { TitleWrapper } from "../styles/Title.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };

    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.password.value
      })
    })
      .then(response => {
        console.log("response", response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ redirectToReferrer: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              state: this.state.redirectToReferrer
            }
          }}
        />
      );
    }

    return (
      <TitleWrapper>
        <h1>Register for An Account</h1>
        <form onSubmit={e => this.handleRegisterSubmit(e)}>
          Name: <input ref="name" />
          Email: <input ref="email" />
          <br />
          <br />
          New Password:<input ref="password" />
          <br />
          <input type="submit" />
        </form>
      </TitleWrapper>
    );
  }
}
export default Register;
