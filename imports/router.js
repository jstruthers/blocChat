import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';

import store, { history } from './store';
import Home from './ui/components/pages/Home';
import LogIn from './ui/components/pages/LogIn';
import Layout from './ui/components/layouts/MainLayout';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={ Home } />
        <Route path="/logIn" component={ LogIn } />
      </Route>
    </Router>
  </Provider>
);

export default router;