import React from 'react';
import Relay from 'react-relay';

import Container from 'app/components/Container';
import ImageLink from 'app/routes/Image/Link';

import styles from './styles.scss';

class User extends React.Component {
  render() {
    const {user} = this.props;

    const images  = user.images.map(image => {
      return (
        <div key={image.id} className={styles.gridItem}>
          <ImageLink image={image} className={styles.image}>
            <img src={image.imageUrl} />
          </ImageLink>
        </div>
      );
    });

    return (
      <div>
        <Container className={styles.header} inset={true}>
          <div className={styles.username}>
            {user.username}
          </div>
        </Container>
        <Container>
          <div className={styles.images}>
            {images}
          </div>
        </Container>
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        username
        images {
          id
          imageUrl(width: 400)
          ${ImageLink.getFragment('image')}
        }
      }
    `,
  }
});


