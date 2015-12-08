import React from 'react';
import styles from './styles.scss';
import classnames from 'classnames';

export default class Container extends React.Component {

  render() {
    const {inset} = this.props;
    const props = {...this.props};
    delete props.inset;
    props.className = classnames(styles.root, {[styles.inset]: inset}, props.className);
    return React.createElement('div', props, props.children);
  }

}

