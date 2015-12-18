import React from 'react';
import Relay from 'react-relay';

import styles from './styles.scss';

class Versions extends React.Component {
  render() {
    const {image} = this.props;
    if (!image.versions.edges.length) return <div />;

    const rows = image.versions.edges.map(({node}) => {

      const backlinks = node.backlinks.map(b => {
        return (
          <div>
            - <a className={styles.backlink} href={b.backlink}>
                {b.backlink}
              </a>
          </div>
        );
      });

      return (
        <div className={styles.row}>
          <div className={styles.image}>
            <img src={node.backlinks[0].url} />
          </div>
          <div className={styles.body}>
            {node.backlinks[0].url}
            {backlinks}
          </div>
        </div>
      );
    });

    return (
      <div className={styles.root}>
        <div className={styles.heading}>
          Accross the web
        </div>
        {rows}
      </div>
    );
  }
}

export default Relay.createContainer(Versions, {
  fragments: {
    image: () => Relay.QL`
      fragment on Image {
        versions(first: 10) {
          edges {
            node {
              imageUrl
              backlinks {
                backlink
                url
              }
            }
          }
        }
      }
    `,
  }
});

