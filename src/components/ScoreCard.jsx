import React from 'react';
import { Paper, IconButton } from 'material-ui';

export default class ScoreCard extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    onUpvote: React.PropTypes.func.isRequired,
  }

  _handleUpvote = () => {
    this.props.onUpvote(this.props.id);
  }

  render() {
    const { score, title, description } = this.props;
    return (
      <Paper>
        <IconButton iconClassName="material-icons" onClick={this._handleUpvote}>arrow_upward</IconButton>
        <h3>{score}</h3>
        <IconButton iconClassName="material-icons">arrow_downward</IconButton>
        <h2>{title}</h2>
        <p>{description}</p>
      </Paper>
    );
  }
}
