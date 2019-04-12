import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment'
import { enter } from '../actions/enter'

let stardate = getStardate()
let placeholder = "Captain's Log, Stardate " + stardate

class Entry extends Component {
    
    constructor() {
        super();
        this.state = {
            title: '',
            entry: '',
            stardate: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const entry = {
            title: this.state.title,
            entry: this.state.entry,
            stardate: stardate,
        }
        this.props.enter(entry);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.setState({
                user: this.props.auth.user
            })
        }
    }

  render() {
    const {isAuthenticated, user} = this.props.auth
    if (isAuthenticated) {
    return (
        <div className="container-fluid">
            <div className="bg">
                <div className="form-group">
                    <form onSubmit={ this.handleSubmit }>
                    <input
                        placeholder="Catchy Title"
                        className="form-control"  
                        name="title"
                        onChange={ this.handleInputChange }
                        value={ this.state.title }
                        /><br />
                        <textarea className="form-control"
                        id="entry" 
                        placeholder={ placeholder }
                        name="entry"
                        onChange={ this.handleInputChange }
                        value={ this.state.entry }
                        />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px'}}> Add Entry as { user.name } </button>
                    </form>
                </div>
            </div>
        </div>
    )
    }
    else {
        return (
            <div>
                <h2>Please Log in to make an entry.</h2>
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user,
})

function daysBetween( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
  
    // Convert both dates to milliseconds
    var date1_ms = Moment.utc(date1)
    var date2_ms = Moment.utc(date2)
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;
      
    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
  }

function getStardate() {
    let epoch, today, stardate

    epoch  = new Date(1970, 0, 1)
    today = new Date()
    stardate = Math.round(daysBetween(epoch, today)* 39.7766856) /100

    return stardate
}

export default connect(mapStateToProps,{ enter })(withRouter(Entry))