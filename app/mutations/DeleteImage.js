import Relay from 'react-relay';

export default class DeleteImage extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation { deleteImage }`;
  }

  getVariables() {
    const {imageId} = this.props;
    return {imageId};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on deleteImagePayload {
        user { images }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }
}

