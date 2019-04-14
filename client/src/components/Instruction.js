import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Instruction extends Component {

    render() {
    const { instruction} = this.props
    return (
        
        <li className="instruction">{ instruction }</li>
    )
  }
}

export default withRouter(Instruction)