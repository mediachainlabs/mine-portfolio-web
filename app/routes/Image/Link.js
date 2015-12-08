import React from 'react';
import Relay from 'react-relay';
import {Link} from 'react-router';

class ImageLink extends React.Component {
  render() {
    const {image, children} = this.props;
    return (
      <Link {...this.props} to={`/images/${image.id}`}>
        {children}
      </Link>
    );
  }
}

export default Relay.createContainer(ImageLink, {
  fragments: {
    image: () => {
      return Relay.QL`
        fragment on Image {
          id
        }
      `;
    }
  }
});

