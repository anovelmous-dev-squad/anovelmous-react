import React from 'react';
import Radium from 'radium';

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
      <div style={styles.base}>
        <h3>Create a place!</h3>
        <input placeholder="New York City"
               value={name}
               onChange={this._handleNameChange}
        />
        <textarea placeholder="A large American city with mass appeal"
                  value={description}
                  onChange={this._handleDescriptionChange}
        />
        <button onClick={this._handleOnCreate}>Create!</button>
      </div>
    );
  }
}
