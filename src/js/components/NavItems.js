import React from 'react'

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

class NavItems extends React.Component {
    render() {
        return (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                
                <NavItem path="/" name="Home" />
                <NavItem path="/page2" name="Page2" />
                <NavItem path="/page3" name="Disabled" />
                
            </ul>
            
            </div>
        )
    }
}

export default NavItems