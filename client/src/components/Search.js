import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'

import Cloud from './Cloud'
import CloudItem from './Cloud'
import Suggestions from './Suggestions'

const API_URL = '/api/search'
class Search extends Component {
    state = {
        query: '',
        titles: [],
        tags:[]
    }

    getTitles = () => {
        let titles = []
        axios.get(`${API_URL}?api_type=titles&prefix=${this.state.query}&limit=10`)
        .then(({ data }) => {
            data.data.map(result => {
                titles.push(result)
            })
            this.setState({
            titles: titles
            })
        })
    }

      getTags = () => {
        let tags = []
        axios.get(`${API_URL}?api_type=tags&prefix=${this.state.query}&limit=10`)
        .then(({ data }) => {
            data.data.map(result => {
                tags.push(result)
            })
            this.setState({
            tags: tags
            })
        })
    }
    
    
   
    handleInputChange = () => {
        this.setState({
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getTitles()
            }
          } 
        })
      }
   
    render() {
      return (
        <form>
          <input
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          <p>{this.state.query}</p>
          <Suggestions results={this.state.titles} />
        </form>
      )
    }
   }
   
   export default Search
   