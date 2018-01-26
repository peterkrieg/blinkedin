import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import configureStore from './store';

import App from './App';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route render={() => <App />} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Root;
