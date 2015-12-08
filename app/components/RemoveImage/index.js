import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

export default class RemoveImage extends React.Component {
  render() {
    return (
      <div href='#' {...this.props}
        className={classnames(styles.root, this.props.className)}>
        &times;
      </div>
    );
  }
}

