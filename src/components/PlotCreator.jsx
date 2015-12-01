import React from 'react';
import { TextField, RaisedButton } from 'material-ui';

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
      <div>
        <form onSubmit={this._handleOnSubmit}>
          <TextField
            hintText="Write a back-of-book plot summary that you think this novel should have!"
            floatingLabelText="Plot Summary Proposal"
            value={summary}
            onChange={this._handleSummaryChange}
            multiLine
            fullWidth
            rows={10} />
          <RaisedButton type="submit" label="Submit" primary />
        </form>
      </div>
    );
  }
}
