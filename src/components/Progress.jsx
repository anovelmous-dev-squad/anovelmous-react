import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(27, 238, 112)'
  },
  percent: (percent = 0) => {
    return { width: percent + '%' };
  },
  height: (height = 10) => {
    return { height: height };
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
            styles.height(this.props.height),
            styles.percent(percent),
            styles.transition(this.props.transition)
          ]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
