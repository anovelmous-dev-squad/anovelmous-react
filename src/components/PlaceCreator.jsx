import React from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui';

export default class PlaceCreator extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  _resetFormData = () => {
    this.setState({ name: '', description: '' });
  }

  _handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  _handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  _handleOnCreate = () => {
    const { name, description } = this.state;
    this.props.onCreate({
      name, description
    });
    this._resetFormData();
  }

  render() {
    return (
      <Paper style={{padding: "12px", margin: "6px"}}>
        <TextField
          hintText="Place Name"
          onChange={this._handleNameChange}/>
        <TextField
          hintText="Description"
          onChange={this._handleDescriptionChange}
          multiline="true"
          fullWidth="true"
          rows="3"
          />
        <RaisedButton
          label="Create"
          onClick={this._handleOnCreate}
          />
      </Paper>
    );
  }
}
