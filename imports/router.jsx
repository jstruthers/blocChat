import React from 'react';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import store, { history } from './store';

import Main from './ui/components/pages/MainLayout';
import Home from './ui/components/pages/Home'
import UserAccounts from './ui/components/pages/UserAccounts';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ Main }>
        <IndexRoute component={ Home } />
        <Route path="/userAccounts" component={ UserAccounts } />
      </Route>
    </Router>
  </Provider>
);

export default router
