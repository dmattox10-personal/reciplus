function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}console.clear();

// actions
const SET_EMOTION = 1;
const ADD_ITEM = 2;
const REMOVE_ITEM = 3;
const EDIT_ITEM = 4;
const UPDATE_ITEM = 5;

// Redux emotions reducer
const emotions = (state, action) => {
  // Default settings
  if (typeof state == 'undefined') {
    state = {
      list: ['happy', 'sad', 'angry', 'scared'],
      current: null };

  }
  switch (action.type) {
    case SET_EMOTION:
      // Set the current emotion value
      return { ...state, current: action.payload };
      break;}

  return state;
};

// Redux items reducer
const items = (state, action) => {
  // Default settings
  if (typeof state == 'undefined') {
    state = {
      list: [],
      current: '' };

  }
  switch (action.type) {
    case ADD_ITEM:
      // Add an item to the list
      return { ...state, list: state.list.concat(action.payload) };
      break;

    case REMOVE_ITEM:
      // Remove an item from the list
      let newList = { ...state };
      if (newList.current === action.payload) {
        newList.current = '';
      }
      return { ...newList, list: newList.list.filter(item => item != action.payload) };
      break;

    case EDIT_ITEM:
      // Choose an item to edit
      return { ...state, current: action.payload };
      break;

    case UPDATE_ITEM:
      // Update an existin item in the list
      if (state.current && state.list.indexOf(state.current) !== -1) {
        let newList = [...state.list];
        newList[state.list.indexOf(state.current)] = action.payload;
        return { ...state, list: newList };
      }
      break;}

  return state;
};

// Combine all of the reducers
const allReducers = Redux.combineReducers({
  emotions,
  items });


// Create the Redux store
const store = Redux.createStore(allReducers);

// Set the initial emotion
store.dispatch({
  type: SET_EMOTION,
  payload: 'happy' });


// Add individual items
store.dispatch({
  type: ADD_ITEM,
  payload: 'horse' });


store.dispatch({
  type: ADD_ITEM,
  payload: 'dog' });


// React Form for adding a new item
class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    // The input field that will sets the new item
    _defineProperty(this, "keyEnter",


    evt => {
      if (evt.which == 13) {
        // Enter - save the item
        this.addNewItem();
      } else if (evt.which == 27) {
        // Escape - clear the form without saving
        this.props.dispatch({
          type: EDIT_ITEM,
          payload: '' });

        this.inputRef.current.value = '';
      }
    });_defineProperty(this, "addNewItem",

    () => {
      const item = this.inputRef.current.value.trim();

      // check that the value is not empty
      if (item && this.props.items.list.indexOf(item) === -1) {
        // Add the item to the Redux store
        this.props.dispatch({
          type: this.props.items.current ? UPDATE_ITEM : ADD_ITEM,
          payload: item });

      }

      // reset the form
      this.inputRef.current.value = '';
      this.inputRef.current.focus();

      // undo the current setting
      if (this.props.items.current) {
        this.props.dispatch({
          type: EDIT_ITEM,
          payload: '' });

      }
    });this.inputRef = React.createRef();} // Add a new item when pressing enter inside the input
  // Update the form details with the currently selected item
  componentDidUpdate(prev) {
    if (prev.items.current != this.props.items.current) {
      this.inputRef.current.value = this.props.items.current;
      this.inputRef.current.focus();
    }
  }
  // Render the form
  render() {
    let count = 0;
    return (
      React.createElement("div", { className: "box" },
      React.createElement("h5", null, "Add an item "),
      React.createElement("div", { className: "item-form" },
      React.createElement("input", { onKeyUp: this.keyEnter, ref: this.inputRef }), React.createElement("button", { onClick: this.addNewItem })), "Escape to cancel"));




  }}


// The list of current items
class ItemList extends React.Component {
  constructor(props) {
    super(props);
    // radio button handlers
    _defineProperty(this, "removeItem",





    event => {
      this.props.dispatch({
        type: REMOVE_ITEM,
        payload: event.target.parentNode.dataset.value });

    });_defineProperty(this, "updateItem",

    event => {
      this.props.dispatch({
        type: EDIT_ITEM,
        payload: event.target.parentNode.dataset.value });

    });this.handlers = { update: [], remove: [] };} // Removes the item from the Redux store
  // Sets the emoji to display based on the Redux store value
  showEmotion() {
    switch (this.props.emotions.current) {
      case 'happy':
        return '😃';
        break;
      case 'sad':
        return '😢';
        break;
      case 'angry':
        return '😡';
        break;
      case 'scared':
        return '😲';
        break;}

    return '😳';
  }
  // Render the node
  render() {
    let clickMessage = this.props.items.list.length ? 'Click to edit' : 'There are no items in your list';

    // Create the <div> nodes for each item
    const listBits = this.props.items.list.map((x, i) => React.createElement("div", { key: i, "data-value": x }, this.showEmotion(), " ", React.createElement("span", { title: "Edit Item", onClick: this.updateItem }, x), " ", React.createElement("a", { title: "Remove item", className: "remove", onClick: this.removeItem })));

    return (
      React.createElement("div", { className: "box" },
      React.createElement("h5", null, "These are your items"),
      listBits,
      React.createElement("span", { className: "item-message" }, clickMessage)));


  }}


// A form for switching among the available emotions
class EmotionOptions extends React.Component {
  constructor(props) {
    super(props);
    // radio button handlers
    _defineProperty(this, "doChange",







    name => {
      if (!this.handlers[name]) {
        this.handlers[name] = () => {
          this.props.dispatch({
            type: SET_EMOTION,
            payload: name });

        };
      }
      return this.handlers[name];
    });this.handlers = [];} // Check if the emotion matches the Redux current emotion
  getChecked(val) {return this.props.emotions.current == val ? 'checked' : '';} // Set the Redux current emotion
  // Caches the handlers to prevent duplicates on render
  // Render the options
  render() {// Create the list of checkboxes
    // THe best approach to onChange would be 
    // <input type="radio" name="radio" value={x} onChange={this.doChange}/>
    // where doChange is set by method = () => {} in the class
    // I have done it this way to experiment with dynamic/multi method properties
    const options = this.props.emotions.list.map(x => React.createElement("label", { key: x, className: "radio" }, React.createElement("input", { type: "radio", name: "radio", checked: this.getChecked(x), onChange: this.doChange(x) }), React.createElement("span", null, x)));

    return (
      React.createElement("div", { className: "box" },
      React.createElement("h5", null, "How do you feel"),
      options));


  }}

// The main page display
class PageApp extends React.Component {
  render() {
    return (
      React.createElement(React.Fragment, null,
      React.createElement(Emoji, null),
      React.createElement(Form, null),
      React.createElement(Item, null)));


  }}


// Sets the store as a prop for each React class
const Form = ReactRedux.connect(state => state)(ItemForm);
const Item = ReactRedux.connect(state => state)(ItemList);
const Emoji = ReactRedux.connect(state => state)(EmotionOptions);

// Render the page with the Redux store
ReactDOM.render(React.createElement(ReactRedux.Provider, { store: store }, React.createElement(PageApp, null)), document.getElementById('app'));