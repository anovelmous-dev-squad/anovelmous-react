import React from 'react';
import { Paper, IconButton, Card, CardHeader, CardText, CardActions } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

export default class ScoreCard extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func,
  };

  static defaultProps = {
    onUpvote: () => {},
    onDownvote: () => {},
  }

  _handleUpvote = () => {
    return this.props.onUpvote(this.props.id);
  }

  _handleDownvote = () => {
    return this.props.onDownvote(this.props.id);
  }

  render() {
    const { score, title, description } = this.props;
    return (
      <Paper style={{padding: 12, margin: "6px 0px"}}>
        <table>
          <tbody>
          <tr style={{verticalAlign : "top"}}>
            <td>
              <IconButton
                iconStyle={{color: Colors.red900}}
                iconClassName="material-icons"
                onClick={this._handleUpvote}>arrow_upward</IconButton>
              <div style={{textAlign : "center"}}> {score} </div>
              <IconButton
                iconStyle={{color: Colors.grey700}}
                iconClassName="material-icons"
                onClick={this._handleDownvote}>arrow_downward</IconButton>
            </td>
            <td>
              <h2>{title}</h2>
              {description}
            </td>
          </tr>
          </tbody>
        </table>
      </Paper>
    );
  }
}
