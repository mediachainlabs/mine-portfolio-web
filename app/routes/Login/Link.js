import React from 'react';
import {Link} from 'react-router';

export default class LoginLink extends React.Component {
  render() {
    return (
      <Link {...this.props} to={`/login`}>
        {this.props.children}
      </Link>
    );
  }
}

