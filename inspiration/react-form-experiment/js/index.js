function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //Playing with re-usable style object to hare between Progressive Web/Native React Apps for a floating inputs

const Theme = {
  color: 'rgba(255, 255, 255, 0.8)',
  bg: '#34495e',
  font: 'Anton' };


const styles = {
  body: {
    background: Theme.bg },

  center: {
    textAlign: 'center' },

  text: {
    color: Theme.color,
    fontFamily: Theme.font },

  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center' },

  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between' },

  input: {
    height: 40,
    textAlign: 'center',
    margin: 5,
    background: Theme.bg,
    border: 'solid 4px rgba(255, 255, 255, 0.8)',
    width: '75vw',
    maxWidth: '540px' },

  rounded: {
    borderRadius: '25px' },

  underlined: {
    border: 'none',
    borderBottom: 'solid 4px rgba(255, 255, 255, 0.8)' },

  blurred: {
    position: 'relative',
    top: 45,
    left: 10,
    fontSize: 20 },

  focused: {
    position: 'relative',
    top: 0,
    left: 10,
    fontSize: 12 },

  transition: {
    transition: 'all .35s ease-in-out' } };



const Button = props => {
  return (
    React.createElement("button", { style: { ...props.style, 'background:active': '#333' } }, props.text));

};

class Input extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "onFocus",






    () => {
      this.setState({ isFocused: true });
    });_defineProperty(this, "onBlur",

    () => {
      this.setState({ isFocused: false });
    });this.state = { isFocused: false };}

  render() {
    let { isFocused } = this.state;
    let focus = isFocused ? styles.focused : this.props.value ? styles.focused : styles.blurred;

    //= !this.state.isFocused ? styles.blurred : !this.props.value && !this.state.isFocused ? styles.blurred: styles.focused;
    return (
      React.createElement("div", null,
      React.createElement("label", {
        htmlFor: this.props.name,
        style: { ...this.props.labelStyle, ...focus, ...styles.transition } },
      this.props.name.toUpperCase()),
      React.createElement("br", null),
      React.createElement("input", {
        style: this.props.style,
        name: this.props.name,
        value: this.props.value,
        onChange: this.props.updateInput,
        type: this.props.secure ? "password" : null,
        onFocus: this.onFocus,
        onBlur: this.onBlur })));


  }}


class Form extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "updateInput",








    e => this.setState({ [e.target.name]: e.target.value }));this.state = { username: '', email: '', password: '' };}

  componentDidMount() {
    document.body.style.background = styles.body.background;
  }

  render() {
    const inputStyles = { ...styles.input, ...styles.text, fontSize: 24 };
    return (
      React.createElement("form", { style: styles.form },
      React.createElement(Input, {
        style: { ...inputStyles, ...styles.underlined },
        labelStyle: styles.text,
        name: "username",
        value: this.state.username,
        updateInput: this.updateInput }),
      React.createElement(Input, {
        style: { ...inputStyles, ...styles.underlined },
        labelStyle: styles.text,
        name: "email",
        value: this.state.email,
        updateInput: this.updateInput }),
      React.createElement(Input, {
        style: { ...inputStyles, ...styles.underlined },
        labelStyle: styles.text,
        name: "password",
        value: this.state.password,
        updateInput: this.updateInput,
        secure: true }),
      React.createElement(Button, {
        style: { ...inputStyles, ...styles.rounded, background: '#27ae60' },
        text: "Submit" })));


  }}


const App = () => {
  return (
    React.createElement("div", { style: styles.container },
    React.createElement("h1", { style: { ...styles.center, ...styles.text } }, "LOGIN"),
    React.createElement(Form, null)));


};


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));