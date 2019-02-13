import React from "react";
import { TitleWrapper, AboutText, Button } from "../styles/Title.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      verified: false
    };
  }
  componentDidMount() {
    let token = sessionStorage.getItem("id_token");
    if (token) {
      fetch("http://localhost:3000/users/verifytoken", {
        method: "post",
        headers: { "Content-Type": "application/json", authorization: token }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ verified: true });
        });
    }
  }

  render() {
    //const {auth} = this.state;
    const auth = this.props.location.state;
    console.log("auth", auth);

    return this.state.verified ? (
      <TitleWrapper>
        <h1>Welcome</h1>
        <h2>View Code Snippets</h2>
      </TitleWrapper>
    ) : (
      <span>Must log in</span>
    );
  }
}
export default Dashboard;
