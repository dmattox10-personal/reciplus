import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Tag extends Component {

    render() {
    const { tag } = this.props
    return (
        
        <li className="tag">{ tag }</li>
    )
  }
}

export default withRouter(Tag)