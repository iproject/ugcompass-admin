import './App.css';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from '../components/routing/PrivateRoute';
import history from '../utils/history';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <PrivateRoute path='/' exact component={Dashboard} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
