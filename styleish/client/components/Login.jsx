import React from "react";
import { TitleWrapper, AboutText, Button } from "../styles/Title.jsx";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { GithubLoginButton } from "react-social-login-buttons";

import Dashboard from "./Dashboard.jsx";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.state = {
      redirectToReferrer: false
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem("id_token");
    if (token) {
      fetch("http://localhost:3000/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json", authorization: token }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ redirectToReferrer: true });
        });
    }
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.refs.email.value,
        password: this.refs.password.value
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.token);
        sessionStorage.setItem("id_token", data.token);
        sessionStorage.getItem("id_token");
        this.setState({ redirectToReferrer: true });
      });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
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
        <h1>Login with Style</h1>
        <form onSubmit={e => this.handleLoginSubmit(e)}>
          Email: <input ref="email" />
          <br />
          Password: <input type="password" ref="password" />
          <input type="submit" />
        </form>
        <GithubLoginButton
          className="ghlogin"
          onClick={() => {
            location.href =
              "https://github.com/login/oauth/authorize?client_id=8be9921c3c4e64f5a351";
          }}
        />
      </TitleWrapper>
    );
  }
}
export default Login;
