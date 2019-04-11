// import FormContainer from "./js/components/container/FormContainer.jsx"
// import HeadContainer from "./js/components/container/HeadContainer.jsx"
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//import './index.css'
import App from './App.js'
// import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root')
    //registerServiceWorker()
)