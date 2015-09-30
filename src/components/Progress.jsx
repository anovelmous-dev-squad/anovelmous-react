import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(27, 238, 112)',
    height: 10
  },
  percent: (percent) => {
    return { width: percent + '%' };
  },
  height: (height = 10) => {
    height: height;
  },
  transition: (transition = 0) => {
    return { transition: transition + 'ms' };
  }
};

@Radium
export default class Progress extends React.Component {
  static propTypes = {
    percent: React.PropTypes.number.isRequired,
    transition: React.PropTypes.number,
    height: React.PropTypes.number,
    children: React.PropTypes.element
  }

  render() {
    let percent = this.props.percent > 0 ? this.props.percent : 0;
    percent = percent < 100 ? percent : 100;
    return (
      <div>
        <div
          style={[
            styles.base,
            styles.percent(percent),
            styles.transition(this.props.transition),
            styles.height(this.props.height)
          ]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
