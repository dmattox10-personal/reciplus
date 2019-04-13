class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      ingredients: [],
      ingredientText: '',
      };

    this.updateIngredientText = this.updateIngredientText.bind(this);
    this.createIngredient = this.createIngredient.bind(this);
  }

  updateIngredientText(e)
  {
    this.setState({
      ingredientText: e.target.value });

  }

  createIngredient(e)
  {
    e.preventDefault();
    this.setState({
      ingredients: [...this.state.ingredients, this.state.ingredientText],
      ingredientText: '' });

  }


  render()
  {
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "container top" },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-lg-12" },
      React.createElement("h2", { className: "text-center" }, "Shopping List")))),



      React.createElement("div", { className: "container wb" },
      React.createElement("div", { className: "row" },
      React.createElement("form", { onSubmit: this.createIngredient },
      React.createElement("div", { className: "col-lg-12 input-group" },
      React.createElement("input", { type: "text",
        className: "center-block",
        placeholder: "Insert here...",
        value: this.state.ingredientText,
        onChange: this.updateIngredientText }),

      React.createElement("button", { className: "btn btn-success center-block" }, "Create"))),


      React.createElement("ul", null,
      this.state.ingredients.map((ingredient, index) =>
      {
        return React.createElement("li", { key: index}, ingredient);
      }))),
      )));




  }}



ReactDOM.render(React.createElement(App, null), document.getElementById('reactContainer'));