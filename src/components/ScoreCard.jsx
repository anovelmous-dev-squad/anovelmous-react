import React from 'react';
import { Paper, IconButton, Card, CardHeader, CardText, CardActions } from 'material-ui';

export default class ScoreCard extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    onUpvote: React.PropTypes.func.isRequired
  };

  _handleUpvote = () => {
    this.props.onUpvote(this.props.id);
  };

  render() {
    const { score, title, description } = this.props;
    return (

        <Card>
          <CardHeader
              title={title}
              avatar={<div></div>}>
          </CardHeader>

          <CardText>{description}</CardText>

          <CardActions>
            <IconButton iconClassName="material-icons"
                        onClick={this._handleUpvote}>arrow_upward</IconButton>
            <span> {score} </span>
            <IconButton
                iconClassName="material-icons">arrow_downward</IconButton>
          </CardActions>

        </Card>

    );
  }
}