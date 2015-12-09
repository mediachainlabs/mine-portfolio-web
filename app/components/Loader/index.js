import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

export default class Loader extends React.Component {

  render() {
    return (
      <div {...this.props}
        className={classnames(styles.root, this.props.className)}>
        <div className={styles.circle}/>
      </div>
    );
  }

}


