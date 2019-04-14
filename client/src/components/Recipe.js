import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Recipe extends Component {

  render() {
    return (
        <div className="container">
            <h2>Recipes will go here!</h2>
        </div>
    )
  }
}

export default withRouter(Recipe)