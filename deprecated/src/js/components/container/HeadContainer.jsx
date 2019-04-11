import React, { Component } from "react"
import { Jumbotron, Navbar, InputGroup, Container, Row, Col } from 'react-bootstrap'
import ReactDOM from "react-dom"

class HeadContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
           
                <Row>
                    <Col xs={12}>
                        <Jumbotron fluid>
                            <h1>"Captain's Log..."</h1>
                            <p>"stardate PUT SOMETHING COOL HERE"</p>
                        </Jumbotron>
                    </Col>
                </Row>
            
        )
    }
}

export default HeadContainer

const wrapper = document.getElementById("navbar-and-header")
wrapper ? ReactDOM.render(<HeadContainer />, wrapper) : false