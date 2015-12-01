import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

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

  _getErrorStyle = () => {
    const { summary } = this.state;
    if (summary.length > 3000) {
      return { color: Colors.red900 };
    }

    return { color: summary.length < 2000 ? Colors.green400 : Colors.amber500 };
  }

  render() {
    const { summary } = this.state;
    return (
      <div>
        <form onSubmit={this._handleOnSubmit}>
          <TextField
            type="text"
            hintText="Write a back-of-book plot summary that you think this novel should have!"
            floatingLabelText="Plot Summary Proposal"
            errorStyle={this._getErrorStyle()}
            errorText={`${summary.length} / 3000`}
            value={summary}
            onChange={this._handleSummaryChange}
            multiLine
            fullWidth
            rows={10}
            />
          <RaisedButton type="submit" label="Submit" primary />
        </form>
      </div>
    );
  }
}
