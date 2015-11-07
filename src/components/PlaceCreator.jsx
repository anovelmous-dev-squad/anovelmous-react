import React from 'react';
import Radium from 'radium';
import { Tab,  TextField, RaisedButton } from 'material-ui';

const styles = {
  base: {

  }
};

@Radium
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
    const { name, description } = this.state;
    return (

        <div>

          <TextField hintText="Place Name"
                     onChange={this._handleNameChange}/>

          <TextField hintText="Description"
                     onChange={this._handleDescriptionChange}
                     multiline="true"
                     fullWidth="true"
                     rows="6"/>

          <RaisedButton label="Create"
                        onClick={this._handleOnCreate}/>
          </div>


    );
  }
}
