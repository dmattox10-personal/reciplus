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
                description: '',
                ingredients: [],
                instructions: [],
                tags: [],
                date: '',
                id: '',
                name: '',
            },
            img: ''
        }
    }

    componentWillMount(){
        this.setState({
            id: this.props.match.params.recipe
        })
    }

    componentDidMount() {
        let url = '/api/entries/' + this.state.id
        let imgurl = "/api/entries/img/" + this.state.id
        axios.get(url)
        .then(res => {
            let ingredients = Array.from(res.data.recipe.ingredients)
            let instructions = Array.from(res.data.recipe.instructions)
            let tags = Array.from(res.data.recipe.tags)
            let descText
            if (res.data.recipe.description === undefined) {
                descText = "No Description"
            }
            else {
                descText = res.data.recipe.description
            }
            this.setState({
                recipe: {
                    title: `${res.data.recipe.title}`,
                    description: descText,
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
        axios.get(imgurl)
        .then(res => {
            this.setState({
                img: res.data
            })
        })
    }
    
  render() {
      const { recipe, img } = this.state
      const image = "data:image/png;base64," + img
    return (
        <div className="container">
            <div className="bg">
            <h2>"{ recipe.title }" By { recipe.name }</h2>
            <p>{ recipe.description }</p>
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
                <img src={ image } alt="Nothing to see here."></img>
            </div>
        </div>
    )
  }
}

export default withRouter(Recipe)