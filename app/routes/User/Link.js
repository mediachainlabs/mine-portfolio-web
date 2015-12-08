import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class UserLink extends React.Component {
  render() {
    const {user, children} = this.props;
    return (
      <Link {...this.props} to={`/${user.username}`}>
        {children}
      </Link>
    );
  }
}

export default Relay.createContainer(UserLink, {
  fragments: {
    user: () => {
      return Relay.QL`
        fragment on User {
          username
        }
      `;
    }
  }
});

