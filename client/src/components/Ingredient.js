import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Ingredient extends Component {

    render() {
    const { ingredient, key } = this.props
    return (
        
        <li className="ingredient" key={ (key + 50) + "c" }>{ ingredient }</li>
    )
  }
}

export default withRouter(Ingredient)