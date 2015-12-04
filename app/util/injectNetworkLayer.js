import Relay from 'react-relay';

const uri = `${__API_ORIGIN__}/graphql`;

export default function(token) {
  const options = {};
  if (token) {
    options.headers = {
      'Authorization': `JWT ${token}`
    };
  }
  Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(uri, options));
}

