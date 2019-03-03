import React, { Component } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

class LogIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    validateForm() {
        return this.state.email.length > 5 && this.state.password.length > 5
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bssize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                        />
                    </FormGroup>
                    <br />   
                    <Button
                        block
                        bssize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}

export default LogIn