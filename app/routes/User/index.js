import React from 'react';
import Relay from 'react-relay';

import User from './User';

class Route extends Relay.Route {
  static routeName = 'User';
  static queries = {
    user: () => Relay.QL`query UserQuery { user(username: $username) }`,
  }
  static paramDefinitions = {
    username: {required: true},
  }
}

export default class UserRoute extends React.Component {
  constructor(props) {
    super(props);
    this.updateRoute(props);
  }

  componentWillReceiveProps(props) {
    this.updateRoute(props);
  }

  updateRoute(props) {
    const {username} = props.params;
    this.route = new Route({username});
  }

  render() {
    return (
      <Relay.RootContainer
        Component={User}
        route={this.route}
        renderFetched={data => <User {...this.props} {...data}/>}
      />
    );
  }
}


