import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios  from 'axios'
import Ingredient from './Ingredient'
import Instruction from './Instruction'
import Tag from './Tag'

class Recipe extends Component {
    constructor(){
        super()
        this.state = {
            id: '',
            recipe: {
                title: '',
                ingredients: [],
                instructions: [],
                tags: [],
                date: '',
                id: '',
                name: '',
            }
        }
    }

    componentWillMount(){
        this.setState({
            id: this.props.match.params.recipe
        })
    }

    componentDidMount() {
        let url = '/api/entries/' + this.state.id
        axios.get(url)
        .then(res => {
            console.log(res)
            let ingredients = Array.from(res.data.recipe.ingredients)
            let instructions = Array.from(res.data.recipe.instructions)
            let tags = Array.from(res.data.recipe.tags)
            this.setState({
                recipe: {
                    title: `${res.data.recipe.title}`,
                    ingredients: ingredients,
                    instructions: instructions,
                    tags: tags,
                    date: `${res.data.recipe.date}`,
                    id: `${res.data.recipe._id}`,
                    name: `${res.data.recipe.username}`
                    }
                })
            }
        )
    }
    
  render() {
      const { recipe } = this.state
    return (
        <div className="container">
            <div className="bg">
            <h2>"{ recipe.title }" By { recipe.name }</h2>
            <div className="box">
                <h2>Ingredients:</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, i) =>
                        <div><Ingredient key={ i } ingredient={ ingredient }></Ingredient></div>)}
                    </ul>
                </div>
                <div className="box">
                <h2>Instructions:</h2>
                    <ul>
                        {recipe.instructions.map((instruction, i) =>
                            <div><Instruction key={ i } instruction={ instruction }></Instruction></div>)}
                    </ul>
                </div>
                <div className="box">
                <h2>Tags: </h2><p>e.g. Chinese, Spicy, Gluten Free</p>
                    <ul>
                        {recipe.tags.map((tag, i) =>
                            <div><Tag key={ i } tag={ tag }></Tag></div>)}
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

export default withRouter(Recipe)