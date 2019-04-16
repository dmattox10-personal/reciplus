import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Instruction extends Component {

    render() {
    const { instruction, key } = this.props
    return (
        
        <li className="instruction" key={ (key + 10) + "a" }>{ instruction }</li>
    )
  }
}

export default withRouter(Instruction)