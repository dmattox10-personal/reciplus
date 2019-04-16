import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Tag extends Component {

    render() {
    const { tag, key } = this.props
    return (
        
        <li className="tag" key={ (key + 90) + "b" }>{ tag }</li>
    )
  }
}

export default withRouter(Tag)