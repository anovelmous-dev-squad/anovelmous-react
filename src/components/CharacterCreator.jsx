import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(121, 121, 121)'
  }
};

@Radium
export default class CharacterCreator extends React.Component {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', bio: '' };
  }

  _handleOnSave() {
    const { firstName, lastName, bio } = this.state;
    this.props.onSave({
      firstName, lastName, bio
    });
  }

  render() {
    return (
      <div style={styles.base}>
        <h3>Create a character!</h3>
        <input placeholder="First Name"></input>
        <input placeholder="Last Name"></input>
        <textarea placeholder="Short bio"></textarea>
        <button onClick={this._handleOnSave}>Create!</button>
      </div>
    );
  }
}
