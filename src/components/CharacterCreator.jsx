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
    onCreate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', bio: '' };
  }

  _resetFormData = () => {
    this.setState({ firstName: '', lastName: '', bio: '' });
  }

  _handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  }

  _handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  }

  _handleBioChange = (event) => {
    this.setState({ bio: event.target.value });
  }

  _handleOnCreate = () => {
    const { firstName, lastName, bio } = this.state;
    this.props.onCreate({
      firstName, lastName, bio
    });
    this._resetFormData();
  }

  render() {
    const { firstName, lastName, bio } = this.state;
    return (
      <div style={styles.base}>
        <h3>Create a character!</h3>
        <input placeholder="First Name"
               value={firstName}
               onChange={this._handleFirstNameChange}
        />
        <input placeholder="Last Name"
               value={lastName}
               onChange={this._handleLastNameChange}
        />
        <textarea placeholder="Short bio"
                  value={bio}
                  onChange={this._handleBioChange}
        />
        <button onClick={this._handleOnCreate}>Create!</button>
      </div>
    );
  }
}
