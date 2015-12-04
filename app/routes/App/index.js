import React from 'react';
import Relay from 'react-relay';

import App from './App';

const route = {
  name: 'AppRootQuery',
  queries: {
    viewer: () => Relay.QL`query { viewer }`
  },
  params: {}
};

export default class AppRoute extends React.Component {
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
        Component={App}
        route={this.route}
        renderFetched={data => <App {...this.props} {...data}/>}
      />
    );
  }
}
