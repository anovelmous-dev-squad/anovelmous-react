import React from 'react';
import { TextField, RaisedButton } from 'material-ui';

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
    this.setState({ firstName: event.target.getValue() });
  }

  _handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.getValue() });
  }

  _handleBioChange = (event) => {
    this.setState({ bio: event.target.getValue() });
  }

  _handleOnCreate = () => {
    const { firstName, lastName, bio } = this.state;
    this.props.onCreate({
      firstName, lastName, bio
    });
    this._resetFormData();
  }

  render() {
    return (
      <div>
        <TextField
          hintText="First Name"
          onChange={this._handleFirstNameChange}
          />
        <TextField
          hintText="Last Name"
          onChange={this._handleLastNameChange}
          />
        <TextField
          hintText="Biography"
          onChange={this._handleBioChange}
          multiLine="true"
          fullWidth="true"
          rows="6"
          />
        <RaisedButton
          label="Create"
          onClick={this._handleOnCreate}
          />
      </div>
    );
  }
}
