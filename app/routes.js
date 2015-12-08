import React from 'react'; // eslint-disable-line no-unused-vars

import {Route, IndexRoute} from 'react-router';
import App from 'app/routes/App';
import Home from 'app/routes/Home';
import Login from 'app/routes/Login';
import User from 'app/routes/User';
import Image from 'app/routes/Image';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/:username' component={User} />
    <Route path='/images/:imageId' component={Image} />
  </Route>
);

