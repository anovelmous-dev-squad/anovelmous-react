import React from 'react';
import { Tab, TextField, RaisedButton } from 'material-ui';

export default class PlotItemCreator extends React.Component {
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
    const { name, description } = this.state;
    return (

        <div>

          <TextField hintText="Plot Item Name"
                     onChange={this._handleNameChange}/>

          <TextField hintText="Description"
                     onChange={this._handleDescriptionChange}
                     multiLine="true"
                     fullWidth="true"
                     rows="6"/>

          <RaisedButton label="Create"
                        onClick={this._handleOnCreate}/>

          </div>

    );
  }
}
