import React from 'react';
import Relay from 'react-relay';

import LoginLink from 'app/routes/Login/Link.js';

class Home extends React.Component {

  componentWillMount() {
    const {currentUser} = this.props.viewer;
    if (currentUser) {
      this.props.history.replaceState(null, `/${currentUser.username}`);
    }
  }

  render() {
    return (
      <div>
        Home - <LoginLink>Login</LoginLink>
      </div>
    );
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        currentUser {
          username
        }
      }
    `,
  }
});

