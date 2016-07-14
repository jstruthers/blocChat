import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import store, { history } from './store';
import Layout from './ui/components/layouts/MainLayout';
import Landing from './ui/components/pages/Landing';
import Home from './ui/components/pages/Home';

import UserAccounts from './ui/components/pages/UserAccounts';
import CreateNewUserForm from './ui/components/forms/CreateNewUserForm'
import LogInForm from './ui/components/forms/LogInForm'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={ Landing } />
        <Route path="/home" component={ Home } />
        <Route path="/userAccounts" component={ UserAccounts }>
          <Route path="/userAccounts/createUser" component={ CreateNewUserForm }/>
          <Route path="/userAccounts/login" component={ LogInForm } />
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default router;