import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class List extends Component {

  render() {
    const { title, date, id } = this.props;
    const url = '/app/recipes/' + id
    return (
        <div className="container">
            <div className="entries-list">
                <h3 key={ date }><Link to={ url }>{ title }</Link><br /></h3>
                <hr />
            </div>
        </div>
    )
  }
}

export default withRouter(List)