import React from 'react';
import Relay from 'react-relay';

class User extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <div>
        User - {user.username}
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        username
      }
    `,
  }
});


