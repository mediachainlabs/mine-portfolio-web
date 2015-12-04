import React from 'react';
import Relay from 'react-relay';

import Login from './Login';

const route = {
  name: 'LoginQuery',
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  params: {}
};

export default class LoginRoute extends React.Component {
  constructor(props) {
    super(props);
    this.updateRoute(props);
  }

  componentWillReceiveProps(props) {
    this.updateRoute(props);
  }

  updateRoute() {
    this.route = route;
  }

  render() {
    return (
      <Relay.RootContainer
        Component={Login}
        route={this.route}
        renderFetched={data => <Login {...this.props} {...data}/>}
      />
    );
  }
}


