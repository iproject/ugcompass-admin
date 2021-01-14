import './App.css';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserCreate from './pages/UserCreate';
import Rooms from './pages/Rooms';
import RoomCreate from './pages/RoomCreate';
import Facilities from './pages/Facilities';
import FacilityEdit from './pages/FacilityEdit';
import PrivateRoute from '../components/routing/PrivateRoute';
import FacilityDetail from './pages/FacilityDetail';
import history from '../utils/history';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/' exact component={Dashboard} />
          <PrivateRoute path='/users' exact component={Users} />
          <PrivateRoute path='/users/new' exact component={UserCreate} />
          <PrivateRoute path='/facilities' exact component={Facilities} />
          <PrivateRoute path='/facilities/new' exact component={FacilityEdit} />
          <PrivateRoute
            path='/facilities/:facilityId'
            exact
            component={FacilityDetail}
          />
          <PrivateRoute
            path='/facilities/:facilityId/edit'
            exact
            component={FacilityEdit}
          />
          <PrivateRoute path='/rooms' exact component={Rooms} />
          <PrivateRoute path='/rooms/new' exact component={RoomCreate} />
        </Switch>
      </Router>
    );
  }
}

export default App;
