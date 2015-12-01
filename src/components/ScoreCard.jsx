import React from 'react';
import { Paper, IconButton } from 'material-ui';

export default class ScoreCard extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
  }

  render() {
    const { title, description } = this.props;
    return (
      <Paper>
        <IconButton iconClassName="material-icons">arrow_upward</IconButton>
        <IconButton iconClassName="material-icons">arrow_downward</IconButton>
        <h2>{title}</h2>
        <p>{description}</p>
      </Paper>
    );
  }
}
