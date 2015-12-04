import React from 'react';
import Relay from 'react-relay';

import {login} from 'app/util/auth';

class Login extends React.Component {
  componentDidMount() {
    const {history, location, viewer} = this.props;
    if (viewer.currentUser) {
      return history.pushState(null, '/');
    }

    if (location.query.token) {
      login(location.query.token);
    }
  }

  render() {
    return (
      <div>
        <a href={__LOGIN_URL__}>
          Login
        </a>
      </div>
    );
  }
}

export default Relay.createContainer(Login, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        currentUser {
          id
          username
        }
      }
    `,
  }
});

