import React from 'react'
import NavItems from './NavItems'
import Toolbar from './Toolbar'
import Drawer from './Drawer'


class Nav extends React.Component {

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
        <div style={{ height: '100%' }}>
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            {Drawer}
            <NavItems />
            <main style={{ marginTop: '64px' }}>
            
            </main>
            </div>
        )
    }
}

export default Nav