import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
  
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

class Navbar extends Component {
    
    constructor() {
        super()
        this.state= {
            maxSignups: '',
            numSignups: ''
        }
    }

    componentDidMount() {
        axios.get('/api/users/settings')
      .then(res => {
        this.setState({
            maxSignups: res.data.maxSignups,
            numSignups: res.data.numSignups
        })
        }
      )
      .catch(error => this.setState({ error }))
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth
        const {maxSignups, numSignups} = this.state
        
        const authLinks = (
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
        
        const guestLinks = (
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
                        <NavSlider path="/register" element="Su" name="Sign Up" />
                    </div>            
                </nav>
            </header>
        )
        return(
            <div>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));