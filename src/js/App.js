import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../css/App.css'
import { Navbar, Button } from 'react-bootstrap'
import LogIn from './components/LogIn'

var LoggedIn = true;

const Recipes = () => (
    <div>
        <h2> Home </h2>
    </div>
)

const Dashboard = () => (
    <div>
        <li>
            <ul> My Recipes </ul>
            <ul> Add Recipe </ul>
        </li>
    </div>
)

const LogOut = () => (
    <div>
        <h2> Log Out </h2>
    </div>
)

class App extends Component {
    render() {
        return (
            <div>
                







                <ul>
                <li><Link to="/">Recipes</Link></li>
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/LogIn">LogIn</Link></li>
                <li><Link to="/LogOut">Log Out</Link></li>
                </ul>

                <Route path="/" component={Recipes}/>
                <Route path="/Dashboard" component={Dashboard}/>
                <Route path="/LogIn" component={LogIn}/>
                <Route path="/LogOut" component={LogOut}/>
            </div>        
        )
    }
}

export default App