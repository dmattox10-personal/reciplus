//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import '../css/App.css'
//import { Navbar, Button } from 'react-bootstrap'
import LogIn from './components/LogIn'
import Nav from './components/Nav'
import NavItems from './components/NavItems'
import Toolbar from './components/Toolbar'
import Drawer from './components/Drawer'
import Navigation from './components/Navigation';

const API = 'http://localhost:3000/api/tests/';
const DEFAULT_QUERY = 'yes';

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
  constructor(props) {
    super(props)
    this.state = {
        logged_in: true,
    }
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch(API + DEFAULT_QUERY)
    .then(response => response.json())
    .then(data => this.setState({ logged_in: data.logged_in }));
  }

  render() {
    if(this.state.logged_in) {
      return (
        <div>
              <Navigation />
              <div className="main">
              <h2>Welcome</h2>
              <p>Recipes will list here automatically, sortable by date, name, etc.</p>
              <h3>Logged in.</h3>
      {/*
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
      */}
        </div> 
        </div>       
      )
    }
    else {
      return (
        <div>
              <Navigation />
              <div className="main">
              <h2>Welcome</h2>
              <p>Recipes will list here automatically, sortable by date, name, etc.</p>
              <h3>Please Log In if you wish to see or do more.</h3>
      {/*
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
      */}
        </div> 
        </div>       
      )
    }
    
  }
}

export default App

{/*
<div className="container">
        
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
*/}