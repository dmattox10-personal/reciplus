import React from 'react'

import '../../css/Toolbar.css'
import DrawerToggleButton from './DrawerToggleButton'

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
                <DrawerToggleButton click={props.drawerToggleClickHandler} />
            </div>
            <div className="toolbar__logo">
                <a href="/">THE LOGO</a>
            </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                    <li>
                        <a href="/">Recipes</a>
                    </li>
                    <li>
                        <a href="/">Log In</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
)

export default toolbar