import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Mine from './components/Mine'
import Recipe from './components/Recipe'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Entry from './components/Entry';
{/* 
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}
*/}
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <div className="navbar">
              <Navbar />
              </div>
              <div className="spacer">

              </div>
                <div className="main">
                  <Route exact path="/app/recipes" component={ Home } />
                  <Route exact path="/app/register" component={ Register } />
                  <Route exact path="/app/login" component={ Login } />
                  <Route exact path="/app/add" component={ Entry } />
                  <Route exact path="/app/my" component={ Mine } />
                  {/*<Route path="/app/recipes/:recipe" component={ Recipe } />*/}
                  <Route path='/app/recipes/:recipe'
                      render={(props) => <Recipe {...props} />}
/>
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
