import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MainNavigation from './shared/Navigation/MainNavigation'
import User from './User/pages/user.js';
import Main from './Main/pages/main.js';
import AddFormProd from './Product/AddProduct/addFormProd';
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
          <User />
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
