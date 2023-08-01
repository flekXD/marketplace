import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MainNavigation from './shared/Navigation/MainNavigation'
import Users from './User/pages/users.js';
import Main from './Main/pages/main.js';
import AddFormProd from './Product/pages/addFormProd';
import Login from './User/pages/Login'
import "./index.css";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/user/list" exact>
          <Users />
        </Route>
        <Route path="/user/login" exact>
          <Login />
        </Route>
        <Route path="/product/add" exact>
          <AddFormProd />
        </Route>
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
};

export default App;
