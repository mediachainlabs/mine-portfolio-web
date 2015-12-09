import React from 'react';
import Relay from 'react-relay';

import {uploadFile} from 'app/util/fileUpload';
import performMutation from 'app/util/performMutation';
import Container from 'app/components/Container';
import ImageLink from 'app/routes/Image/Link';
import DropTarget from 'app/components/DropTarget';
import RemoveImage from 'app/components/RemoveImage';
import CreateImages from 'app/mutations/CreateImages';
import DeleteImage from 'app/mutations/DeleteImage';

import styles from './styles.scss';

class User extends React.Component {
  handleDropTargeOnDrop = (files) => {
    this.uploadFiles(files);
  }

  async uploadFiles(files) {
    try {
      const {user} = this.props;
      const imageUrls = await Promise.all(files.map(uploadFile));
      const mutation = new CreateImages({imageUrls, user});
      await performMutation(mutation);
    } catch(e) {
      console.log(e);
    }
  }

  handleRemoveImageOnClick = async (imageId) => {
    try {
      const {user} = this.props;
      const mutation = new DeleteImage({imageId, user});
      const resp = await performMutation(mutation);
      console.log(resp);
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const {user} = this.props;

    const images  = user.images.map(image => {
      const remove = image.viewerCanDelete
        ?  <RemoveImage className={styles.removeImage}
            onClick={this.handleRemoveImageOnClick.bind(this, image.id)} />
        : null;

      return (
        <div key={image.id} className={styles.gridItem}>
          <div className={styles.image}>
            {remove}
            <ImageLink image={image}>
              <img src={image.imageUrl} />
            </ImageLink>
          </div>
        </div>
      );
    });

    return (
      <div>
        <DropTarget enabled={user.isCurrentUser}
          className={styles.backgroundDropTarget}
          onDrop={this.handleDropTargeOnDrop} />
        <DropTarget enabled={user.isCurrentUser}
          onDrop={this.handleDropTargeOnDrop}>
            <Container className={styles.header} inset={true}>
              <a href={`https://twitter.com/${user.username}`}
                target='_blank'
                className={styles.username}>
                @{user.username}
              </a>
            </Container>
            <Container>
              <div className={styles.images}>
                {images}
              </div>
            </Container>
        </DropTarget>
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        ${CreateImages.getFragment('user')}
        ${DeleteImage.getFragment('user')}
        isCurrentUser
        username
        images {
          id
          imageUrl(width: 400)
          ${ImageLink.getFragment('image')}
          viewerCanDelete
        }
      }
    `,
  }
});


