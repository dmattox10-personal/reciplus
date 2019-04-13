import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Ingredient extends Component {

    render() {
    const { key, ingredient} = this.props
    return (
        
        <li className="ingredient" key={ key }>{ ingredient }</li>
    )
  }
}

export default withRouter(Ingredient)