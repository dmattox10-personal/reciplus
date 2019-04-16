import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class List extends Component {

  render() {
    const { title, description, date, id, key } = this.props;
    const url = '/app/recipes/' + id
    return (
        <div className="container" key={ key * 3 }>
            <div className="entries-list">
                <h3 key={ date }><Link to={ url }>{ title }</Link><br /></h3>
                <p>{ description }</p>
                <hr />
            </div>
        </div>
    )
  }
}

export default withRouter(List)