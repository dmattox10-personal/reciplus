//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { BrowserRouter as Router,
  Route, 
  Link 
} from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store';

import '../css/ES.css'
import { Container, Row, Col } from 'react-bootstrap'

import LogIn from './components/LogIn'
import Register from './components/Register'

import 'bootstrap/dist/css/bootstrap.min.css';

const API = 'http://localhost:3000/api/tests/';
const DEFAULT_QUERY = 'no';

const my = () => (
    <div>
        <h2> My Recipes Here </h2>
    </div>
)

const add = () => (
    <div>
      <h2> Add Recipes Here </h2>
    </div>
)

const home = () => (
  <div style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
    <h2> Home </h2>
  </div>
)

const signup = () => (
 <div>
   <h2> Sign Up </h2>
 </div>
)

const login = () => (
  <div>
    <h2> Log In </h2>
  </div>
)

const NavItem = props => {
  const pageURI = window.location.pathname+window.location.search
  const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
  return (
    <li className={liClassName}>
      <a href={props.path} className={aClassName}>
        {props.name}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
      </a>
    </li>
  );
}

const NavSlider = props => {
  return (
      <div>
          <Link to={props.path} className='slide'>
          <span className='element'>{props.element}</span>
          <span className='name'>{props.name}</span>
          </Link>

      </div>
  )
}

class Navigation extends React.Component {
  render() {
    return (
      <header className='masthead'>
        <div className='brand-container'>
          <a href='/'>
          <span className='brand-initials'>R+</span>
          <span className='brand-name'>Reciplus</span>
          </a>
        </div>
        <nav>
          <div className='nav-container'>
            <NavSlider path="/" element="R" name="Recipes" />
            <NavSlider path="/add" element="Ar" name="Add Recipe" />
            <NavSlider path="/my" element="M" name="My Recipes" />
          </div>            
        </nav>
      </header>
    )
  }
}

class Limited extends React.Component {
  render() {
    return (
      <header className='masthead'>
            <div className='brand-container'>
                <a href='/'>
                <span className='brand-initials'>R</span>
                <span className='brand-name'>Reciplus</span>
                </a>
            </div>
            <nav>
                <div className='nav-container'>
                    <NavSlider path="/" element="R" name="Recipes" />
                    <NavSlider path="/login" element="Li" name="Log In" />
                    <NavSlider path="/signup" element="Su" name="Sign Up" />
                </div>            
            </nav>
        </header>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        logged_in: false,
        page: "home"
    }
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch(API + DEFAULT_QUERY)
    .then(response => response.json())
    .then(data => this.setState({ logged_in: data.logged_in }));
  }

  render() {
    if (this.state.logged_in === true) {
      return (
        <Container>
          <Provider store = { store }>
            <Router>
              <div>
                <Navigation />
                  <div className="main">
                  <Route exact path="/" component={home} />
                  <Route exact path="/my" component={my} />
                  <Route exact path="/add" component={add} />
                  <p>All the text here</p>
                  </div>
                  
              </div>
            </Router>
          </Provider>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <Provider store = { store }>
            <Router>
              <div>
                <Limited />
                <div className="main">



                <Route exact path="/" component={home} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/signup" component={Register} /> 
                </div>
              </div>       
            </Router>
          </Provider>
        </Container>
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