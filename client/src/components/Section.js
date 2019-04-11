import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Section extends Component {

    constructor() {
        super();
        this.state = {
            open: false,
            classNameGiven: "section"
        }
    }

    handleClick() {
        if(this.state.open) {
          this.setState({
            open: false,
            classNameGiven: "section"
          })
        }else{
          this.setState({
            open: true,
            classNameGiven: "section open"
          })
        }
      }

    render() {
    const { entry, title, key , header} = this.props
    const { classNameGiven } = this.state
    return (
        <div className={ classNameGiven } key={key}>
        <button>toggle</button>
        <div className="sectionhead" onClick={ this.handleClick.bind(this) }>{ header }<br />{ title }</div>
        <div className="articlewrap">
          <div className="article">
            <p>{ entry }</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Section)