import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    const {children, viewer} = this.props;
    return (
      <div>
        {viewer.id}
        {children}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }
});

