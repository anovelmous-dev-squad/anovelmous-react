import React from 'react';

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
        <h3>Create a plot item!</h3>
        <input placeholder="Abacaderon Scepter"
               value={name}
               onChange={this._handleNameChange}
        />
        <textarea placeholder="Transmogrifies foes"
                  value={description}
                  onChange={this._handleDescriptionChange}
        />
        <button onClick={this.props.onCreate}>Create a plot item!</button>
      </div>
    );
  }
}
