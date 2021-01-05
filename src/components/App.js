import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from '../components/routing/PrivateRoute';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={Dashboard} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
