import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(181, 181, 181)'
  }
};

@Radium
export default class PlotCreator extends React.Component {
  static propTypes = {
    onCreate: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { summary: '' };
  }

  _resetFormData = () => {
    this.setState({ summary: '' });
  }

  _handleSummaryChange = (event) => {
    this.setState({ summary: event.target.value });
  }

  _handleOnSubmit = (event) => {
    event.preventDefault();
    const { summary } = this.state;
    this.props.onCreate(summary);
    this._resetFormData();
  }

  render() {
    const { summary } = this.state;
    return (
      <div style={styles.base}>
        <form onSubmit={this._handleOnSubmit}>
          <textarea placeholder="Enter a brief summary of the novel's plot"
                    value={summary}
                    onChange={this._handleSummaryChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
