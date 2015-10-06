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

  _handleOnCreate() {
    const { name, description } = this.state;
    this.props.onCreate({
      name, description
    });
  }

  render() {
    return (
      <div style={styles.base}>
        <h3>Create a place!</h3>
        <input placeholder="New York City"></input>
        <textarea placeholder="Description"></textarea>
        <button onClick={this._handleOnCreate}>Create!</button>
      </div>
    );
  }
}
