import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import List from './List'

const Mine = props => {
    
    const [recipes, updateRecipes] = useState([])
    //const [user, updateUser] = useState({}) // Is this the real life?
    
    useEffect(() => {
        if (props.auth.isAuthenticated) {
            //updateUser(props.auth.user) // Is this just fantasy?
            axios.get(`/api/users/${props.auth.user.id}/recipes`)
            .then(res => {
                updateRecipes(res.data.recipes_list)
                console.log(res.data.recipes_list)
            })
        }
    }, [])

    const noDesc = 'No Description.'
    if (props.auth.isAuthenticated) {
        return (
            <div className="container-fluid">
                <div className="bg">
                    <hr />
                    {/*FIXME don't check for undefined, set it to something default on the backend! */}
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


export default connect(mapStateToProps)(withRouter(Mine))