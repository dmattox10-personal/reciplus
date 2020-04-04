import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { cuid } from 'cuid'

import { enter } from '../actions/enter'

import Ingredient from './Ingredient'
import Instruction from './Instruction'
import Tag from './Tag'
// TODO FINISH CONVERTING THIS FILE TO FUNCTIONAL COMPONENT
const Entry = props => {
    
    const [recipe, updateRecipe] = useState({
        title: '',
        ingredients: [],
        instructions: [],
        tags: [],
        user: props.user, // was an empty string 
        description: null, // was an empty string
        file: null
    })

    const [ingredient, updateIngredient] = useState('Enter single ingredient, click add')
    const [instruction, updateInstruction] = useState('Enter single instruction, click add')
    const [tag, updateTag] = useState('Enter single tag, click add')
    const [user, updateUser] = useState(props.auth.user) // Can I do this?
    
    const handleInputChange = e => {
        e.preventDefault()
        updateRecipe({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const recipeForm = new FormData(recipe) // Can I do this?
        // recipeForm.append('title', recipe.title)
        // recipeForm.append('ingredients', recipe.ingredients)
        // recipeForm.append('instructions', recipe.instructions)
        // recipeForm.append('tags', recipe.tags)
        // recipeForm.append('user', recipe.user)
        // recipeForm.append('description', recipe.description)
        // recipeForm.append('file', recipe.file)
        props.enter(recipeForm);
        props.history.push('/app/my')
    }

    const createIngredient = e =>
    {
        //e.preventDefault();
        const obj = {
            ingredient: ingredient,
            id: cuid()
        }
        updateRecipe({
            ...recipe.ingredients, obj
        })
        updateIngredient('')
    }

    const createInstruction = e =>
    {
        //e.preventDefault()
        const obj = {
            instruction: instruction,
            id: cuid()
        }
        updateRecipe({
            ...recipe.instructions, obj
        })
        updateInstruction('')
    }

    const createTag = e =>
    {
        // e.preventDefault()
        const obj = {
            tag: tag,
            id: cuid()
        }
        updateRecipe({
            ...recipe.tags, obj
        })
        updateTag('')
    }

    const fileChangedHandler = event => {
        updateRecipe({
            file: event.target.files[0]
        })
    }
  
    const { isAuthenticated } = props.auth

    if (isAuthenticated) {
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
                                <input className="form-control"
                                id="ingredient" 
                                placeholder="Single ingredient, click add (Required)"
                                name="ingredient"
                                onChange={ updateIngredient }
                                value={ ingredient }
                                /><button className="btn btn-success add" onClick={ () => createIngredient() }>Add</button><br />
                            </div>            
                            <div className="embed-add">                
                                <input className="form-control"
                                id="instruction" 
                                placeholder="Single step, click add (Required)"
                                name="instruction"
                                onChange={ updateInstruction }
                                value={ instruction }
                                /><button className="btn btn-success add" onClick={ createInstruction }>Add</button><br />
                            </div>
                            <div className="embed-add">                
                                <input className="form-control"
                                id="tag" 
                                placeholder="Single tag, click add"
                                name="tag"
                                onChange={ updateTag }
                                value={ tag }
                                /><button className="btn btn-success add" onClick={ createTag }>Add</button>
                            </div>
                            <div className="box">
                            <h2>Ingredients:</h2>
                                <ul>
                                    {recipe.ingredients.map((ingredient, i) =>
                                    <div><Ingredient key={ i + 50 } ingredient={ ingredient }></Ingredient></div>)}
                                </ul>
                            </div>
                            <div className="box">
                            <h2>Instructions:</h2>
                                <ul>
                                    {recipe.instructions.map((instruction, i) =>
                                        <div><Instruction key={ i + 10 } instruction={ instruction }></Instruction></div>)}
                                </ul>
                            </div>
                            <div className="box">
                            <h2>Tags: </h2><p>e.g. Chinese, Spicy, Gluten Free</p>
                                <ul>
                                    {recipe.tags.map((tag, i) =>
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