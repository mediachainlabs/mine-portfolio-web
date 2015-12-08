
import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class DropTarget extends React.Component {
  static propTypes = {
    onDrop: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      dragTargetActive: false,
    };
  }

  onDragEnter(e){
    e.preventDefault();
    this.setState({ dragTargetActive: true });
  }

  onDragLeave(e) {
    e.preventDefault();
    this.setState({ dragTargetActive: false });
  }

  onDrop(e) {
    e.preventDefault();
    const uri = e.dataTransfer.getData('text/uri-list');
    const files = e.dataTransfer.files;
    this.props.onDrop(uri || [...files]);
  }

  render() {
    const { children, className, activeClass } = this.props;
    const { dragTargetActive } = this.state;

    return (
      <div
        className={classnames(className, { [activeClass]: dragTargetActive })}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={this.onDrop.bind(this)}>
        {children}
      </div>
    );
  }

}
