import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'

class List extends Component {
    
    constructor() {
        super();
        this.state = {
            entries: [],
        }
    }

    componentDidMount() {
        axios.get('/api/entries/list')
      .then(res => 
        res.data.entries_list.map(entry => ({
            entry: `${entry.entry}`,
            stardate: `${entry.stardate}`,
            date: `${entry.date}`
        }))
      )
      .then( entries => {
          this.setState({
              entries
          })
      })
    }

  render() {
    const { entries } = this.state;
    return (
        <div className="container">
            <hr />
            <div className="entries-list">
                <ul>
                    {entries.map(entry =>
                        <li key={entry.date}>Captains' Log, Stardate {entry.stardate} :<br />{entry.entry}</li>
                    )}
                </ul>
            </div>
            <hr />
        </div>
    )
  }
}

export default withRouter(List)