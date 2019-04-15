import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
  
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

    render() {
        const { isAuthenticated } = this.props.auth
        
        const authLinks = (
            <header className='masthead'>
                <div className='brand-container'>
                    <a href='/app/recipes'>
                        <span className='brand-initials'>R+</span>
                        <span className='brand-name'>Reciplus</span>
                    </a>
                </div>
                <nav>
                    <div className='nav-container'>
                        <NavSlider path="/app/recipes" element="R" name="Recipes" />
                        <NavSlider path="/app/add" element="Ar" name="Add Recipe" />
                        <NavSlider path="/app/my" element="M" name="My Recipes" />
                        <NavSlider path="/app/search" element="Se" name="Search" />
                    </div>            
                </nav>
            </header>
        )
        
        const guestLinks = (
            <header className='masthead'>
                <div className='brand-container'>
                    <a href='/app/recipes'>
                        <span className='brand-initials'>R</span>
                        <span className='brand-name'>Reciplus</span>
                    </a>
                </div>
                <nav>
                    <div className='nav-container'>
                        <NavSlider path="/app/recipes" element="R" name="Recipes" />
                        <NavSlider path="/app/login" element="Li" name="Log In" />
                        <NavSlider path="/app/register" element="Su" name="Sign Up" />
                        <NavSlider path="/app/search" element="Se" name="Search" />
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
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withRouter(Navbar))