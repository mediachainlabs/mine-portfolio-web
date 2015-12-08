import React from 'react';
import Relay from 'react-relay';

import Container from 'app/components/Container';
import UserLink from 'app/routes/User/Link';

import styles from './styles.scss';

class Image extends React.Component {
  render() {
    const {image} = this.props;
    const {user} = image;

    return (
      <div className={styles.root}>
        <Container inset={true} className={styles.container} style={{maxWidth: 900}}>
          <div className={styles.image}>
            <img src={image.imageUrl} />
          </div>
          <div className={styles.info}>
            <div className={styles.label}>
              Author
            </div>
            <UserLink user={user} className={styles.text}>
              {user.username}
            </UserLink>
          </div>
        </Container>
      </div>
    );
  }
}

export default Relay.createContainer(Image, {
  fragments: {
    image: () => Relay.QL`
      fragment on Image {
        imageUrl(width: 1200)
        user {
          username
          ${UserLink.getFragment('user')}
        }
      }
    `,
  }
});


