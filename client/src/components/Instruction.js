import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Instruction extends Component {

    render() {
    const { key, instruction} = this.props
    return (
        
        <li className="instruction" key={ key }>{ instruction }</li>
    )
  }
}

export default withRouter(Instruction)