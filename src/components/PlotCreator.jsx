import React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

export default class PlotCreator extends React.Component {
  static propTypes = {
    maxSummaryLength: React.PropTypes.number.isRequired,
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
    const { maxSummaryLength } = this.props;
    const { summary } = this.state;
    if (summary.length > maxSummaryLength) {
      return { color: Colors.red900 };
    }

    const threshold = maxSummaryLength * (2 / 3);

    return { color: summary.length < threshold ? Colors.green400 : Colors.amber500 };
  }

  render() {
    const { maxSummaryLength } = this.props;
    const { summary } = this.state;
    return (
      <div>
        <form onSubmit={this._handleOnSubmit}>
          <TextField
            type="text"
            hintText="Write a back-of-book plot summary that you think this novel should have!"
            floatingLabelText="Plot Summary Proposal"
            errorStyle={this._getErrorStyle()}
            errorText={`${summary.length} / ${maxSummaryLength}`}
            value={summary}
            onChange={this._handleSummaryChange}
            multiLine
            fullWidth
            rows={10}
            />
          <RaisedButton
            type="submit"
            label="Submit"
            primary
            disabled={summary.length > maxSummaryLength}
            />
        </form>
      </div>
    );
  }
}
