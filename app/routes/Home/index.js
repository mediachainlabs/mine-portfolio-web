import React from 'react';
import Relay from 'react-relay';

import Home from './Home';

const route = {
  name: 'HomeQuery',
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  params: {}
};

export default class HomeRoute extends React.Component {
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
        Component={Home}
        route={this.route}
        renderFetched={data => <Home {...this.props} {...data}/>}
      />
    );
  }
}

