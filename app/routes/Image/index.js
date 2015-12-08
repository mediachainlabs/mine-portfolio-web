import React from 'react';
import Relay from 'react-relay';

import Image from './Image';

class Route extends Relay.Route {
  static routeName = 'Image';
  static queries = {
    image: () => Relay.QL`query ImageQuery { image(imageId: $imageId) }`,
  }
  static paramDefinitions = {
    imageId: {required: true},
  }
}

export default class ImageRoute extends React.Component {
  constructor(props) {
    super(props);
    this.updateRoute(props);
  }

  componentWillReceiveProps(props) {
    this.updateRoute(props);
  }

  updateRoute(props) {
    const {imageId} = props.params;
    this.route = new Route({imageId});
  }

  render() {
    return (
      <Relay.RootContainer
        Component={Image}
        route={this.route}
        renderFetched={data => <Image {...this.props} {...data}/>}
      />
    );
  }
}



