import React from 'react'
import NavItems from './NavItems'



class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          Toggled: false
        };
    }
    Toggle(e) {
        e.preventDefault();
        this.setState(prevState => ({
          Toggled: !prevState.Toggled
        }));
    }
    render() {
        const classToggler = 'navbar-toggler' + (this.state.isToggleOn ? ' show' : '')
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={(e) => {this.Toggle(e)}}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavItems />
        </nav>
        )
    }
}

export default Nav