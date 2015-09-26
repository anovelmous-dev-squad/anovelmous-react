import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'white'
  }
};

@Radium
export default class Reader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    sections: React.PropTypes.object.isRequired,
    currentSection: React.PropTypes.isRequired
  }

  render() {
    return (
      <div style={styles.base}>
        <h1>{title} <small>{sections.currentSection.title}</small></h1>
        <p>sections.currentSection.text</p>
      </div>
    );
  }
}
