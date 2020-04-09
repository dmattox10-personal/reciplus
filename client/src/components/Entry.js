import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cuid from 'cuid'

import { enter } from '../actions/enter'

import Ingredient from './Ingredient'
import Instruction from './Instruction'
import Tag from './Tag'
import Recipe from './Recipe';
// TODO FINISH CONVERTING THIS FILE TO FUNCTIONAL COMPONENT
const Entry = props => {
    
    const [recipe, updateRecipe] = useState({
        title: '',
        ingredients: [],
        instructions: [],
        tags: [],
        user: props.user, // was an empty string 
        description: '', // was an empty string
        file: null
    })

    const [ingredients, updateIngredients] = useState('')
    const [instructions, updateInstructions] = useState('')
    const [tags, updateTags] = useState('')
    const [user, updateUser] = useState(props.auth.user) // Can I do this?
    
    const handleInputChange = e => {
        e.preventDefault()
        updateRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const recipeForm = new FormData() // Can I do this?
        recipeForm.append('title', recipe.title)
        recipeForm.append('ingredients', recipe.ingredients)
        recipeForm.append('instructions', recipe.instructions)
        recipeForm.append('tags', recipe.tags)
        recipeForm.append('user', recipe.user)
        recipeForm.append('description', recipe.description)
        recipeForm.append('file', recipe.file)
        props.enter(recipeForm);
        props.history.push('/app/my')
    }

    const handleIngredient = e => {
        updateIngredients(e.target.value)
    }

    const handleInstruction = e => {
        updateInstructions(e.target.value)
    }

    const handleTag = e => {
        updateTags(e.target.value)
    }

    const fileChangedHandler = event => {
        updateRecipe({
            ...recipe,
            file: event.target.files[0]
        })
    }
  
    const { isAuthenticated } = props.auth

    if (isAuthenticated) {
    const ingredientList = ingredients.split(', ')
    const instructionList = instructions.split(', ')
    const tagList = tags.split(', ')
    return (
        <div className="container-fluid">
            <div className="bg">
            <h2 style={{marginBottom: '40px'}}>Add Recipe</h2>
                <div className="form-group">
                    <form onSubmit={ handleSubmit }>
                        <input
                            placeholder="Catchy Title (Required)"
                            className="form-control"  
                            name="title"
                            onChange={ handleInputChange }
                            value={ recipe.title }
                            /><br />
                        <textarea
                            placeholder="Short description of the dish or recipe (Required)"
                            className="form-control"
                            name="description"
                            onChange={ handleInputChange }
                            value={ recipe.description }
                            /><br />
                            <div className="embed-add">
                                <textarea className="form-control"
                                id="ingredient" 
                                placeholder="Single ingredient, click add (Required)"
                                name="ingredient"
                                onChange={ handleIngredient }
                                value={ ingredients }
                                /><br />
                            </div>            
                            <div className="embed-add">                
                                <textarea className="form-control"
                                id="instruction" 
                                placeholder="Single step, click add (Required)"
                                name="instruction"
                                onChange={ handleInstruction }
                                value={ instructions }
                                /><br />
                            </div>
                            <div className="embed-add">                
                                <textarea className="form-control"
                                id="tag" 
                                placeholder="Single tag, click add"
                                name="tag"
                                onChange={ handleTag }
                                value={ tags }
                                />
                            </div>
                            <div className="box">
                            <h2>Ingredients:</h2>
                                <ul>
                                    {ingredientList.map((ingredient, i) =>
                                    <div><Ingredient key={ i + 50 } ingredient={ ingredient }></Ingredient></div>)}
                                </ul>
                            </div>
                            <div className="box">
                            <h2>Instructions:</h2>
                                <ul>
                                    {instructionList.map((instruction, i) =>
                                        <div><Instruction key={ i + 10 } instruction={ instruction }></Instruction></div>)}
                                </ul>
                            </div>
                            <div className="box">
                            <h2>Tags: </h2><p>e.g. Chinese, Spicy, Gluten Free</p>
                                <ul>
                                    {tagList.map((tag, i) =>
                                        <div><Tag key={ i + 90 } tag={ tag }></Tag></div>)}
                                </ul>
                            </div>
                            <input type="file" name="file" onChange={fileChangedHandler}/>
                        <button type="submit" className="btn btn-success"> Create Recipe as { user.name }</button>
                    </form>
                </div>
            </div>
        </div>
    )
    }
    else {
        return (
            <div>
                <h2>Please Log in to use this feature.</h2>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth.user,
})


export default connect(mapStateToProps,{ enter })(withRouter(Entry))