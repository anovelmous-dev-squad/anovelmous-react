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
    currentSectionId: React.PropTypes.number.isRequired
  }

  render() {
    const { title, sections, currentSectionId } = this.props;
    return (
      <div style={styles.base}>
        <h1>{title}</h1>
        <p>{sections[currentSectionId]}</p>
      </div>
    );
  }
}
