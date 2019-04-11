import React from 'react';
import '../../css/ES.css'
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
            <a className='slide' href={props.path}>
            <span className='element'>{props.element}</span>
            <span className='name'>{props.name}</span>
            </a>
        </div>
    )
}

class Limited extends React.Component {
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
                    <NavSlider path="/login" element="Li" name="Log In" />
                    <NavSlider path="/signup" element="Su" name="Sign Up" />
                </div>            
            </nav>
        </header>
    )
  }
}

export default Limited;

{/*

<NavItem path="/" name="Home" />
            <NavItem path="/page2" name="Page2" />
            <NavItem path="/page3" name="Disabled" disabled="true" />

*/}