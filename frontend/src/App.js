import React from 'react'
import axios from 'axios' 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home'
import Login from './Login'
import Signup from './Signup'

const App = () => (
  <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/account/login">
            <Login />
          </Route>
          <Route path="/account/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </Router>
)
export default App