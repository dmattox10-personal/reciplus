import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../css/App.css'
//import { Navbar, Button } from 'react-bootstrap'
import LogIn from './components/LogIn'
import Nav from './components/Nav'
import NavItems from './components/NavItems'
import Toolbar from './components/Toolbar'
import Drawer from './components/Drawer'
import '../css/ES.css'

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
  constructor(props) {
    super(props)
    this.state = {
        DrawerOpen: false,
    }
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { DrawerOpen: !prevState.DrawerOpen }
    })
  }

  backgroundClickHandler = () => {
    this.setState({ DrawerOpen: false })
  }
  render() {
    let Drawer

    if (this.state.DrawerOpen) {
      Drawer = <Drawer />
    }

    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            {Drawer}
            <NavItems />
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
      </div>       
    )
  }
}

export default App