import Relay from 'react-relay';

export default class CreateImages extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation { createImages }`;
  }

  getVariables() {
    const {imageUrls} = this.props;
    return {imageUrls};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on createImagesPayload {
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
