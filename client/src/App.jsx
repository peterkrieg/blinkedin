import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Auth from './pages/Auth';
import Jobs from './pages/Jobs';

const App = () => (
  <Switch>
    <Route path="/register" component={Auth} />
    <Route path="/login" component={Auth} />
    <Route path="/jobs" component={Jobs} />
    <Redirect from="/" to="/login" />
  </Switch>
);

export default App;
