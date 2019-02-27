import React from 'react'

import '../../css/SideDrawer.css'

const Drawer = props => {
    return (
        <nav className="side-drawer">
            <ul>
                <li>
                    <a href="/">Recipes</a>
                </li>
                <li>
                    <a href="/">Log In</a>
                </li>
            </ul>
        </nav>
    )
}

export default Drawer