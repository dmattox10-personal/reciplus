import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import List from './List'

const Home = props => {

    //const [user, updateUser] = useState({}) // Are we sure this is an object?
    const [recipes, updateRecipes] = useState([])

    useEffect(() => {
        /*
        if(props.auth.isAuthenticated) {
            updateUser(props.auth.user) 
        }
        */
        axios.get('/api/entries/list')
        .then(res => {
            updateRecipes(res.data.entries_list)            
        })
    }, [])

    const noDesc = 'No Description.'
    if (props.auth.isAuthenticated) {
        return (
            <div className="container-fluid">
                <div className="bg">
                    <hr />
                    {recipes.map((recipe, index) =><div> <List key={ index * 3} title={ recipe.title } date={ recipe.date } id={ recipe.id } description={ typeof recipe.description !== "undefined" ? recipe.description : noDesc }></List></div>)}
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

const mapStateToProps = (state) => ({
    auth: state.auth,
})


export default connect(mapStateToProps)(withRouter(Home))