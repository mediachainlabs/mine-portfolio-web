import React from 'react'; // eslint-disable-line no-unused-vars

import {Route, IndexRoute} from 'react-router';
import App from 'app/routes/App';
import Home from 'app/routes/Home';
import Login from 'app/routes/Login';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
  </Route>
);

