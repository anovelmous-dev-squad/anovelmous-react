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

  render() {
    const { score, title, description } = this.props;
    return (

        <Paper>

          <table>
            <tr>
              <td>
                <IconButton iconClassName="material-icons"
                            onClick={this._handleUpvote}>arrow_upward</IconButton>
                <div style={{textAlign : "center"}}> {score} </div>
                <IconButton iconClassName="material-icons">arrow_downward</IconButton>
              </td>

              <td style={{verticalAlign : "top"}}>
                <h2>{title}</h2>
                {description}
              </td>

            </tr>
          </table>

        </Paper>

    );
  }
}