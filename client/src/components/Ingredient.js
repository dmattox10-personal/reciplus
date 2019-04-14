import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Ingredient extends Component {

    render() {
    const { ingredient} = this.props
    return (
        
        <li className="ingredient">{ ingredient }</li>
    )
  }
}

export default withRouter(Ingredient)