//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import { BrowserRouter as Router,
  Route, 
  Link 
} from 'react-router-dom'
import '../css/ES.css'
import { Container, Row, Col } from 'react-bootstrap'
{/*
import LogIn from './components/LogIn'
import Nav from './components/Nav'
import NavItems from './components/NavItems'
import Toolbar from './components/Toolbar'
import Drawer from './components/Drawer'
//import Navigation from './components/Navigation'
//import Limited from './components/Limited'
*/}

const API = 'http://localhost:3000/api/tests/';
const DEFAULT_QUERY = 'no';

const my = () => (
    <div>
        <h2> My Recipes Here </h2>
    </div>
)

const add = () => (
    <div>
      <h2> Add Recipes Here </h2>
    </div>
)

const home = () => (
  <div>
    <h2> Home </h2>
  </div>
)

const signup = () => (
 <div>
   <h2> Sign Up </h2>
 </div>
)

const login = () => (
  <div>
    <h2> Log In </h2>
  </div>
)

const NavItem = props => {
  const pageURI = window.location.pathname+window.location.search
  const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
  const aClassName = props.disabled ? "nav-link disabled" : "nav-link"
  return (
    <li className={liClassName}>
      <a href={props.path} className={aClassName}>
        {props.name}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
      </a>
    </li>
  );
}

const NavSlider = props => {
  return (
      <div>
          <Link to={props.path} className='slide'>
          <span className='element'>{props.element}</span>
          <span className='name'>{props.name}</span>
          </Link>

      </div>
  )
}

class Navigation extends React.Component {
  render() {
    return (
      <header className='masthead'>
        <div className='brand-container'>
          <a href='/'>
          <span className='brand-initials'>R+</span>
          <span className='brand-name'>Reciplus</span>
          </a>
        </div>
        <nav>
          <div className='nav-container'>
            <NavSlider path="/" element="R" name="Recipes" />
            <NavSlider path="/add" element="Ar" name="Add Recipe" />
            <NavSlider path="/my" element="M" name="My Recipes" />
          </div>            
        </nav>
      </header>
    )
  }
}

class Limited extends React.Component {
  render() {
    return (
      <header className='masthead'>
            <div className='brand-container'>
                <a href='/'>
                <span className='brand-initials'>R+</span>
                <span className='brand-name'>Reciplus</span>
                </a>
            </div>
            <nav>
                <div className='nav-container'>
                    <NavSlider path="/" element="R" name="Recipes" />
                    <NavSlider path="/login" element="Li" name="Log In" />
                    <NavSlider path="/signup" element="Su" name="Sign Up" />
                </div>            
            </nav>
        </header>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        logged_in: false,
        page: "home"
    }
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch(API + DEFAULT_QUERY)
    .then(response => response.json())
    .then(data => this.setState({ logged_in: data.logged_in }));
  }

  render() {
    if (this.state.logged_in === true) {
      return (
        <Container>
          <Router>
            <div>
              <Navigation />
                <div className="main" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                <Route exact path="/" component={home} />
                <Route path="/my" component={my} />
                <Route path="/add" component={add} />
                <p>All the text here</p>
                </div>
                
            </div>
          </Router>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <Router>
            <div>
              <Limited />
              <div className="main" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
              <p>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget lectus facilisis, euismod mi sed, fermentum leo. Nulla nec nulla id massa euismod maximus. Pellentesque finibus ut diam in gravida. Suspendisse porta magna quis ligula bibendum venenatis. Cras tellus elit, blandit sit amet diam et, pellentesque tempus metus. Quisque vitae volutpat ipsum, vestibulum rutrum nulla. Nullam facilisis tortor et arcu condimentum lacinia. Nullam cursus nibh ut risus lobortis vestibulum. Vivamus ut maximus eros. Donec nec pretium nisi, vitae feugiat felis. Duis sed quam vel velit mattis rutrum. Maecenas suscipit lacus ut sagittis dapibus. Duis dictum commodo auctor. In iaculis vulputate odio, rhoncus tempor odio elementum eget. Praesent cursus feugiat odio sit amet laoreet.

Vestibulum tempor orci nec sem pharetra hendrerit et vel ipsum. Duis vel posuere ligula. Suspendisse dapibus metus vitae pharetra interdum. Aenean sed tortor dolor. Donec finibus ante eget dolor bibendum, sed commodo dolor pulvinar. Integer facilisis ipsum eu placerat facilisis. Nam fermentum molestie massa eu congue. In hac habitasse platea dictumst. Duis nec neque fermentum, egestas enim at, dapibus tortor. Phasellus eu hendrerit mauris.

Sed libero arcu, vestibulum eget rutrum in, dapibus eget orci. Donec a nunc convallis, fermentum justo quis, tempor massa. Donec pellentesque orci est, non scelerisque libero rutrum sed. Nulla facilisi. Ut nisl neque, blandit at lobortis quis, tincidunt eu lacus. Fusce vel dui at lorem varius laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc elit, dapibus sit amet pellentesque quis, iaculis vitae ligula. Aliquam pulvinar condimentum nisl, quis tincidunt libero tincidunt rhoncus. Nulla velit neque, ultrices sit amet turpis quis, luctus aliquam risus.

Aliquam tincidunt tellus odio, placerat tempus sapien viverra ut. Nullam massa tortor, ultrices ut ullamcorper vitae, laoreet vitae metus. Vestibulum in ultricies velit, a scelerisque risus. Pellentesque rhoncus quis felis commodo vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus eu nisi non pharetra. Donec eget dignissim tortor. Donec nec ex tortor. Quisque sed arcu non neque iaculis tincidunt accumsan sit amet nunc. Curabitur ac nisl massa.

Fusce porttitor felis dolor, nec tempor ligula aliquam id. Praesent massa ante, posuere in ultrices luctus, aliquam nec turpis. Aenean metus sapien, commodo quis est et, pellentesque bibendum erat. Integer condimentum justo quis massa tincidunt dictum. Duis sagittis lacus nec sapien dignissim, eu consequat purus imperdiet. Suspendisse venenatis ante ut eros posuere mollis. Proin vel odio suscipit, volutpat dolor et, euismod felis. Nulla nulla purus, fermentum vitae feugiat nec, dictum maximus turpis. Nunc in sem hendrerit, efficitur odio at, semper purus. Nulla non porttitor diam. Aliquam pellentesque, nisl vitae elementum fermentum, mauris ligula maximus arcu, eu eleifend arcu metus nec sem. In pharetra feugiat sapien quis tempus. Ut sollicitudin elit ut diam iaculis, ut ullamcorper nibh ullamcorper. Quisque placerat ante ut scelerisque posuere. Vestibulum feugiat ligula lectus, malesuada efficitur quam vestibulum eget. </p>
  <Row>
    <Col>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget lectus facilisis, euismod mi sed, fermentum leo. Nulla nec nulla id massa euismod maximus. Pellentesque finibus ut diam in gravida. Suspendisse porta magna quis ligula bibendum venenatis. Cras tellus elit, blandit sit amet diam et, pellentesque tempus metus. Quisque vitae volutpat ipsum, vestibulum rutrum nulla. Nullam facilisis tortor et arcu condimentum lacinia. Nullam cursus nibh ut risus lobortis vestibulum. Vivamus ut maximus eros. Donec nec pretium nisi, vitae feugiat felis. Duis sed quam vel velit mattis rutrum. Maecenas suscipit lacus ut sagittis dapibus. Duis dictum commodo auctor. In iaculis vulputate odio, rhoncus tempor odio elementum eget. Praesent cursus feugiat odio sit amet laoreet.

Vestibulum tempor orci nec sem pharetra hendrerit et vel ipsum. Duis vel posuere ligula. Suspendisse dapibus metus vitae pharetra interdum. Aenean sed tortor dolor. Donec finibus ante eget dolor bibendum, sed commodo dolor pulvinar. Integer facilisis ipsum eu placerat facilisis. Nam fermentum molestie massa eu congue. In hac habitasse platea dictumst. Duis nec neque fermentum, egestas enim at, dapibus tortor. Phasellus eu hendrerit mauris.

Sed libero arcu, vestibulum eget rutrum in, dapibus eget orci. Donec a nunc convallis, fermentum justo quis, tempor massa. Donec pellentesque orci est, non scelerisque libero rutrum sed. Nulla facilisi. Ut nisl neque, blandit at lobortis quis, tincidunt eu lacus. Fusce vel dui at lorem varius laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc elit, dapibus sit amet pellentesque quis, iaculis vitae ligula. Aliquam pulvinar condimentum nisl, quis tincidunt libero tincidunt rhoncus. Nulla velit neque, ultrices sit amet turpis quis, luctus aliquam risus.

Aliquam tincidunt tellus odio, placerat tempus sapien viverra ut. Nullam massa tortor, ultrices ut ullamcorper vitae, laoreet vitae metus. Vestibulum in ultricies velit, a scelerisque risus. Pellentesque rhoncus quis felis commodo vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus eu nisi non pharetra. Donec eget dignissim tortor. Donec nec ex tortor. Quisque sed arcu non neque iaculis tincidunt accumsan sit amet nunc. Curabitur ac nisl massa.

Fusce porttitor felis dolor, nec tempor ligula aliquam id. Praesent massa ante, posuere in ultrices luctus, aliquam nec turpis. Aenean metus sapien, commodo quis est et, pellentesque bibendum erat. Integer condimentum justo quis massa tincidunt dictum. Duis sagittis lacus nec sapien dignissim, eu consequat purus imperdiet. Suspendisse venenatis ante ut eros posuere mollis. Proin vel odio suscipit, volutpat dolor et, euismod felis. Nulla nulla purus, fermentum vitae feugiat nec, dictum maximus turpis. Nunc in sem hendrerit, efficitur odio at, semper purus. Nulla non porttitor diam. Aliquam pellentesque, nisl vitae elementum fermentum, mauris ligula maximus arcu, eu eleifend arcu metus nec sem. In pharetra feugiat sapien quis tempus. Ut sollicitudin elit ut diam iaculis, ut ullamcorper nibh ullamcorper. Quisque placerat ante ut scelerisque posuere. Vestibulum feugiat ligula lectus, malesuada efficitur quam vestibulum eget. </Col>
    <Col>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget lectus facilisis, euismod mi sed, fermentum leo. Nulla nec nulla id massa euismod maximus. Pellentesque finibus ut diam in gravida. Suspendisse porta magna quis ligula bibendum venenatis. Cras tellus elit, blandit sit amet diam et, pellentesque tempus metus. Quisque vitae volutpat ipsum, vestibulum rutrum nulla. Nullam facilisis tortor et arcu condimentum lacinia. Nullam cursus nibh ut risus lobortis vestibulum. Vivamus ut maximus eros. Donec nec pretium nisi, vitae feugiat felis. Duis sed quam vel velit mattis rutrum. Maecenas suscipit lacus ut sagittis dapibus. Duis dictum commodo auctor. In iaculis vulputate odio, rhoncus tempor odio elementum eget. Praesent cursus feugiat odio sit amet laoreet.

Vestibulum tempor orci nec sem pharetra hendrerit et vel ipsum. Duis vel posuere ligula. Suspendisse dapibus metus vitae pharetra interdum. Aenean sed tortor dolor. Donec finibus ante eget dolor bibendum, sed commodo dolor pulvinar. Integer facilisis ipsum eu placerat facilisis. Nam fermentum molestie massa eu congue. In hac habitasse platea dictumst. Duis nec neque fermentum, egestas enim at, dapibus tortor. Phasellus eu hendrerit mauris.

Sed libero arcu, vestibulum eget rutrum in, dapibus eget orci. Donec a nunc convallis, fermentum justo quis, tempor massa. Donec pellentesque orci est, non scelerisque libero rutrum sed. Nulla facilisi. Ut nisl neque, blandit at lobortis quis, tincidunt eu lacus. Fusce vel dui at lorem varius laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc elit, dapibus sit amet pellentesque quis, iaculis vitae ligula. Aliquam pulvinar condimentum nisl, quis tincidunt libero tincidunt rhoncus. Nulla velit neque, ultrices sit amet turpis quis, luctus aliquam risus.

Aliquam tincidunt tellus odio, placerat tempus sapien viverra ut. Nullam massa tortor, ultrices ut ullamcorper vitae, laoreet vitae metus. Vestibulum in ultricies velit, a scelerisque risus. Pellentesque rhoncus quis felis commodo vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus eu nisi non pharetra. Donec eget dignissim tortor. Donec nec ex tortor. Quisque sed arcu non neque iaculis tincidunt accumsan sit amet nunc. Curabitur ac nisl massa.

Fusce porttitor felis dolor, nec tempor ligula aliquam id. Praesent massa ante, posuere in ultrices luctus, aliquam nec turpis. Aenean metus sapien, commodo quis est et, pellentesque bibendum erat. Integer condimentum justo quis massa tincidunt dictum. Duis sagittis lacus nec sapien dignissim, eu consequat purus imperdiet. Suspendisse venenatis ante ut eros posuere mollis. Proin vel odio suscipit, volutpat dolor et, euismod felis. Nulla nulla purus, fermentum vitae feugiat nec, dictum maximus turpis. Nunc in sem hendrerit, efficitur odio at, semper purus. Nulla non porttitor diam. Aliquam pellentesque, nisl vitae elementum fermentum, mauris ligula maximus arcu, eu eleifend arcu metus nec sem. In pharetra feugiat sapien quis tempus. Ut sollicitudin elit ut diam iaculis, ut ullamcorper nibh ullamcorper. Quisque placerat ante ut scelerisque posuere. Vestibulum feugiat ligula lectus, malesuada efficitur quam vestibulum eget. </Col>
  </Row>
  <Row>
    <Col>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget lectus facilisis, euismod mi sed, fermentum leo. Nulla nec nulla id massa euismod maximus. Pellentesque finibus ut diam in gravida. Suspendisse porta magna quis ligula bibendum venenatis. Cras tellus elit, blandit sit amet diam et, pellentesque tempus metus. Quisque vitae volutpat ipsum, vestibulum rutrum nulla. Nullam facilisis tortor et arcu condimentum lacinia. Nullam cursus nibh ut risus lobortis vestibulum. Vivamus ut maximus eros. Donec nec pretium nisi, vitae feugiat felis. Duis sed quam vel velit mattis rutrum. Maecenas suscipit lacus ut sagittis dapibus. Duis dictum commodo auctor. In iaculis vulputate odio, rhoncus tempor odio elementum eget. Praesent cursus feugiat odio sit amet laoreet.

Vestibulum tempor orci nec sem pharetra hendrerit et vel ipsum. Duis vel posuere ligula. Suspendisse dapibus metus vitae pharetra interdum. Aenean sed tortor dolor. Donec finibus ante eget dolor bibendum, sed commodo dolor pulvinar. Integer facilisis ipsum eu placerat facilisis. Nam fermentum molestie massa eu congue. In hac habitasse platea dictumst. Duis nec neque fermentum, egestas enim at, dapibus tortor. Phasellus eu hendrerit mauris.

Sed libero arcu, vestibulum eget rutrum in, dapibus eget orci. Donec a nunc convallis, fermentum justo quis, tempor massa. Donec pellentesque orci est, non scelerisque libero rutrum sed. Nulla facilisi. Ut nisl neque, blandit at lobortis quis, tincidunt eu lacus. Fusce vel dui at lorem varius laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc elit, dapibus sit amet pellentesque quis, iaculis vitae ligula. Aliquam pulvinar condimentum nisl, quis tincidunt libero tincidunt rhoncus. Nulla velit neque, ultrices sit amet turpis quis, luctus aliquam risus.

Aliquam tincidunt tellus odio, placerat tempus sapien viverra ut. Nullam massa tortor, ultrices ut ullamcorper vitae, laoreet vitae metus. Vestibulum in ultricies velit, a scelerisque risus. Pellentesque rhoncus quis felis commodo vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus eu nisi non pharetra. Donec eget dignissim tortor. Donec nec ex tortor. Quisque sed arcu non neque iaculis tincidunt accumsan sit amet nunc. Curabitur ac nisl massa.

Fusce porttitor felis dolor, nec tempor ligula aliquam id. Praesent massa ante, posuere in ultrices luctus, aliquam nec turpis. Aenean metus sapien, commodo quis est et, pellentesque bibendum erat. Integer condimentum justo quis massa tincidunt dictum. Duis sagittis lacus nec sapien dignissim, eu consequat purus imperdiet. Suspendisse venenatis ante ut eros posuere mollis. Proin vel odio suscipit, volutpat dolor et, euismod felis. Nulla nulla purus, fermentum vitae feugiat nec, dictum maximus turpis. Nunc in sem hendrerit, efficitur odio at, semper purus. Nulla non porttitor diam. Aliquam pellentesque, nisl vitae elementum fermentum, mauris ligula maximus arcu, eu eleifend arcu metus nec sem. In pharetra feugiat sapien quis tempus. Ut sollicitudin elit ut diam iaculis, ut ullamcorper nibh ullamcorper. Quisque placerat ante ut scelerisque posuere. Vestibulum feugiat ligula lectus, malesuada efficitur quam vestibulum eget. </Col>
    <Col>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget lectus facilisis, euismod mi sed, fermentum leo. Nulla nec nulla id massa euismod maximus. Pellentesque finibus ut diam in gravida. Suspendisse porta magna quis ligula bibendum venenatis. Cras tellus elit, blandit sit amet diam et, pellentesque tempus metus. Quisque vitae volutpat ipsum, vestibulum rutrum nulla. Nullam facilisis tortor et arcu condimentum lacinia. Nullam cursus nibh ut risus lobortis vestibulum. Vivamus ut maximus eros. Donec nec pretium nisi, vitae feugiat felis. Duis sed quam vel velit mattis rutrum. Maecenas suscipit lacus ut sagittis dapibus. Duis dictum commodo auctor. In iaculis vulputate odio, rhoncus tempor odio elementum eget. Praesent cursus feugiat odio sit amet laoreet.

Vestibulum tempor orci nec sem pharetra hendrerit et vel ipsum. Duis vel posuere ligula. Suspendisse dapibus metus vitae pharetra interdum. Aenean sed tortor dolor. Donec finibus ante eget dolor bibendum, sed commodo dolor pulvinar. Integer facilisis ipsum eu placerat facilisis. Nam fermentum molestie massa eu congue. In hac habitasse platea dictumst. Duis nec neque fermentum, egestas enim at, dapibus tortor. Phasellus eu hendrerit mauris.

Sed libero arcu, vestibulum eget rutrum in, dapibus eget orci. Donec a nunc convallis, fermentum justo quis, tempor massa. Donec pellentesque orci est, non scelerisque libero rutrum sed. Nulla facilisi. Ut nisl neque, blandit at lobortis quis, tincidunt eu lacus. Fusce vel dui at lorem varius laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc elit, dapibus sit amet pellentesque quis, iaculis vitae ligula. Aliquam pulvinar condimentum nisl, quis tincidunt libero tincidunt rhoncus. Nulla velit neque, ultrices sit amet turpis quis, luctus aliquam risus.

Aliquam tincidunt tellus odio, placerat tempus sapien viverra ut. Nullam massa tortor, ultrices ut ullamcorper vitae, laoreet vitae metus. Vestibulum in ultricies velit, a scelerisque risus. Pellentesque rhoncus quis felis commodo vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus eu nisi non pharetra. Donec eget dignissim tortor. Donec nec ex tortor. Quisque sed arcu non neque iaculis tincidunt accumsan sit amet nunc. Curabitur ac nisl massa.

Fusce porttitor felis dolor, nec tempor ligula aliquam id. Praesent massa ante, posuere in ultrices luctus, aliquam nec turpis. Aenean metus sapien, commodo quis est et, pellentesque bibendum erat. Integer condimentum justo quis massa tincidunt dictum. Duis sagittis lacus nec sapien dignissim, eu consequat purus imperdiet. Suspendisse venenatis ante ut eros posuere mollis. Proin vel odio suscipit, volutpat dolor et, euismod felis. Nulla nulla purus, fermentum vitae feugiat nec, dictum maximus turpis. Nunc in sem hendrerit, efficitur odio at, semper purus. Nulla non porttitor diam. Aliquam pellentesque, nisl vitae elementum fermentum, mauris ligula maximus arcu, eu eleifend arcu metus nec sem. In pharetra feugiat sapien quis tempus. Ut sollicitudin elit ut diam iaculis, ut ullamcorper nibh ullamcorper. Quisque placerat ante ut scelerisque posuere. Vestibulum feugiat ligula lectus, malesuada efficitur quam vestibulum eget. </Col>
    <Col>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget lectus facilisis, euismod mi sed, fermentum leo. Nulla nec nulla id massa euismod maximus. Pellentesque finibus ut diam in gravida. Suspendisse porta magna quis ligula bibendum venenatis. Cras tellus elit, blandit sit amet diam et, pellentesque tempus metus. Quisque vitae volutpat ipsum, vestibulum rutrum nulla. Nullam facilisis tortor et arcu condimentum lacinia. Nullam cursus nibh ut risus lobortis vestibulum. Vivamus ut maximus eros. Donec nec pretium nisi, vitae feugiat felis. Duis sed quam vel velit mattis rutrum. Maecenas suscipit lacus ut sagittis dapibus. Duis dictum commodo auctor. In iaculis vulputate odio, rhoncus tempor odio elementum eget. Praesent cursus feugiat odio sit amet laoreet.

Vestibulum tempor orci nec sem pharetra hendrerit et vel ipsum. Duis vel posuere ligula. Suspendisse dapibus metus vitae pharetra interdum. Aenean sed tortor dolor. Donec finibus ante eget dolor bibendum, sed commodo dolor pulvinar. Integer facilisis ipsum eu placerat facilisis. Nam fermentum molestie massa eu congue. In hac habitasse platea dictumst. Duis nec neque fermentum, egestas enim at, dapibus tortor. Phasellus eu hendrerit mauris.

Sed libero arcu, vestibulum eget rutrum in, dapibus eget orci. Donec a nunc convallis, fermentum justo quis, tempor massa. Donec pellentesque orci est, non scelerisque libero rutrum sed. Nulla facilisi. Ut nisl neque, blandit at lobortis quis, tincidunt eu lacus. Fusce vel dui at lorem varius laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc elit, dapibus sit amet pellentesque quis, iaculis vitae ligula. Aliquam pulvinar condimentum nisl, quis tincidunt libero tincidunt rhoncus. Nulla velit neque, ultrices sit amet turpis quis, luctus aliquam risus.

Aliquam tincidunt tellus odio, placerat tempus sapien viverra ut. Nullam massa tortor, ultrices ut ullamcorper vitae, laoreet vitae metus. Vestibulum in ultricies velit, a scelerisque risus. Pellentesque rhoncus quis felis commodo vulputate. Interdum et malesuada fames ac ante ipsum primis in faucibus. In finibus eu nisi non pharetra. Donec eget dignissim tortor. Donec nec ex tortor. Quisque sed arcu non neque iaculis tincidunt accumsan sit amet nunc. Curabitur ac nisl massa.

Fusce porttitor felis dolor, nec tempor ligula aliquam id. Praesent massa ante, posuere in ultrices luctus, aliquam nec turpis. Aenean metus sapien, commodo quis est et, pellentesque bibendum erat. Integer condimentum justo quis massa tincidunt dictum. Duis sagittis lacus nec sapien dignissim, eu consequat purus imperdiet. Suspendisse venenatis ante ut eros posuere mollis. Proin vel odio suscipit, volutpat dolor et, euismod felis. Nulla nulla purus, fermentum vitae feugiat nec, dictum maximus turpis. Nunc in sem hendrerit, efficitur odio at, semper purus. Nulla non porttitor diam. Aliquam pellentesque, nisl vitae elementum fermentum, mauris ligula maximus arcu, eu eleifend arcu metus nec sem. In pharetra feugiat sapien quis tempus. Ut sollicitudin elit ut diam iaculis, ut ullamcorper nibh ullamcorper. Quisque placerat ante ut scelerisque posuere. Vestibulum feugiat ligula lectus, malesuada efficitur quam vestibulum eget. </Col>
  </Row>
              <Route exact path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/signup" component={signup} /> 
              </div>
            </div>       
          </Router>
        </Container>
      )
    }    
  }
}

export default App

{/*
<div className="container">
        
        <ul>
        <li><Link to="/">Recipes</Link></li>
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/LogIn">LogIn</Link></li>
        <li><Link to="/LogOut">Log Out</Link></li>
        </ul>

        <Route path="/" component={Recipes}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/LogOut" component={LogOut}/>
      </div> 
*/}