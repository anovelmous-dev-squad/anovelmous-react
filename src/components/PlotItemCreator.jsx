import React from 'react';
import Radium from 'radium';

const styles = {
  base: {

  }
};

@Radium
export default class PlotItemCreator extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  _handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  _handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  }

  render() {
    const { name, description } = this.state;
    return (
      <div style={styles.base}>
        <input placeholder="Abacaderon Scepter"
               value={name}
               onChange={this._handleNameChange}
        />
        <textarea placeholder="Transmogrifies foes"
                  value={description}
                  onChange={this._handleDescriptionChange}
        />
        <button>Create a plot item!</button>
      </div>
    );
  }
}
