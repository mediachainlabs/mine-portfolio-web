import Relay from 'react-relay';

export default function (mutation) {
  return new Promise((resolve, reject) => {
    Relay.Store.update(mutation, {
      onFailure: reject,
      onSuccess: resolve
    });
  });
}

