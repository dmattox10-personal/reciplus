import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="fixed-bottom">
                    <footer className="footer">
                        <nav className="navbar navbar-dark bg-dark">
                        <Link to="http://trekguide.com/Stardates.htm"><p className="text-justify">Starting from the Unix Epoch because I'm a nerd, a stardate is 0.397766856 days using the math from TrekGuide in the section on twenty-fourth century stardates.</p></Link>
                        </nav>
                    </footer>
                </div>
            </div>
        )
    }
}