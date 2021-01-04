import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
