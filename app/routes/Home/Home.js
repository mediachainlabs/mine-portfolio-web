import React from 'react';
import Relay from 'react-relay';

class Home extends React.Component {
  render() {
    const {viewer} = this.props;
    return (
      <div>
        Home - {viewer.id}
      </div>
    );
  }
}

export default Relay.createContainer(Home, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }
});

