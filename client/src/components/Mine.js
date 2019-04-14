import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import List from './List'

class Mine extends Component {
    
    constructor() {
        super();
        this.state = {
            recipes: [],
            user: ''
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.setState({
                user: this.props.auth.user
            })
        }
        console.log(this.state.user.id)
        let url = '/api/users/' + this.props.auth.user.id + '/recipes'
        axios.get(url)
        .then(res => 
            res.data.recipes_list.map(recipe => ({
                title: `${recipe.title}`,
                ingredients: `${recipe.entry}`,
                instructions: `${recipe.instructions}`,
                tags: `${recipe.tags}`,
                date: `${recipe.date}`,
                id: `${recipe._id}`
            }))
          )
          .then( recipes => {
              this.setState({
                  recipes
              })
          })
    }

    render() {
    const { recipes } = this.state;
    if (this.props.auth.isAuthenticated) {
        return (
            <div className="container-fluid">
                <div className="bg">
                    <hr />
                    {recipes.map((recipe, id) =><div> <List key={ id } title={ recipe.title } date={ recipe.date } id={ recipe.id }></List></div>)}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                <div className="bg">
                    <h2>Please <Link to="/app/login">Log In</Link> to use this feature.</h2>
                </div>
            </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})


export default connect(mapStateToProps)(withRouter(Mine))