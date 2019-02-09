import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }
    handleChange(event) {
        console.log(event.target)
        // this.setState(
        //     { [event.target.id]: event.target.value }

        // )
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" >
                        Email:
                        <FormControl
                            hintText="Enter Your email"
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        Password:
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block

                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
              </Button>
                </form>
            </div>
        );
    }
}

export default Login

