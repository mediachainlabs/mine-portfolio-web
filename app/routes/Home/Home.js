import React from 'react';
import Relay from 'react-relay';

import styles from './styles.scss';

class Home extends React.Component {

  componentWillMount() {
    const {currentUser} = this.props.viewer;
    if (currentUser) {
      this.props.history.replaceState(null, `/${currentUser.username}`);
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.title}>
            Mine
          </div>
          <div className={styles.subtitle}>
            Decentralized, open source portfolio.
          </div>
          <div>
          <a href={__LOGIN_URL__} className={styles.button}>
            Sing up with Twitter
          </a>
          </div>
        </div>
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

