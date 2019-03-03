import React, { Component } from 'react'
import { Container, Col, Row, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'

class Register extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name_first: "",
            name_last: "",
            birth_month: "",
            birth_day: "",
            birth_year: "",
            email: "",
            password: "",
        }
    }

    validateForm() {
        return this.state.name_first.length > 3 &&
        this.state.name_last.length > 3 &&
        this.state.birth_month > 0 &&
        this.state.birth_month < 13 &&
        this.state.birth_month.length === 2 &&
        this.state.birth_day > 0 &&
        this.state.birth_day < 32 &&
        this.state.birth_year.length === 4 &&
        this.state.email.length > 5 &&
        this.state.password.length > 5
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
            <Container>
                <div className="Register">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup controlId="name_first" size="lg">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.name_first}
                                    onChange={this.handleChange}
                                    />
                                </FormGroup>   
                            </Col>
                            <Col>
                                <FormGroup controlId="name_last" size="lg">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.name_last}
                                    onChange={this.handleChange}
                                    />
                                </FormGroup> 
                            </Col>
                            <Col>
                                <FormGroup controlId="birth_date" size="lg">
                                    <FormLabel>Birth Date</FormLabel>
                                    <FormControl
                                    autoFocus
                                    type="date"
                                    value={this.state.birth_date}
                                    onChange={this.handleChange}
                                    />
                                </FormGroup>   
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup controlId="email" size="lg">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup controlId="password" size="lg">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                                <Button
                                block
                                size="lg"
                                disabled={!this.validateForm()}
                                type="submit"
                                >
                                Register
                                </Button>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        )
    }
}

export default Register