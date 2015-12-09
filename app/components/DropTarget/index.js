
import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class DropTarget extends React.Component {
  static propTypes = {
    onDrop: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    activeClass: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      dragTargetActive: false,
    };
  }

  onDragEnter(e){
    e.preventDefault();
    this.props.onDragEnter && this.props.onDragEnter(e);
    this.setState({ dragTargetActive: true });
  }

  onDragLeave(e) {
    e.preventDefault();
    this.props.onDragLeave && this.props.onDragLeave(e);
    this.setState({ dragTargetActive: false });
  }

  onDrop(e) {
    e.preventDefault();
    const uri = e.dataTransfer.getData('text/uri-list');
    const files = e.dataTransfer.files;
    this.props.onDrop(uri || [...files]);
  }

  render() {
    const {children, className, activeClass, enabled} = this.props;
    const {dragTargetActive} = this.state;

    if (!enabled) return <div>{children}</div>;

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
