import React from 'react';
import { Paper, IconButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

const getScoreColor = (score) => {
  if (score === 0) {
    return 'black';
  }
  return score === 1 ? Colors.red900 : Colors.gray700;
};

export default class ScoreCard extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    userScore: React.PropTypes.number.isRequired,
    onUndoVote: React.PropTypes.func,
    onUpvote: React.PropTypes.func,
    onDownvote: React.PropTypes.func,
  };

  static defaultProps = {
    onUpvote: () => {},
    onDownvote: () => {},
  }

  _handleUpvote = () => {
    if (this.props.userScore === 1) {
      return this.props.onUndoVote(this.props.id);
    }
    return this.props.onUpvote(this.props.id);
  }

  _handleDownvote = () => {
    if (this.props.userScore === -1) {
      return this.props.onUndoVote(this.props.id);
    }
    return this.props.onDownvote(this.props.id);
  }

  render() {
    const { score, title, description, userScore } = this.props;

    const styles = {
      upvote: {
        color: Colors.red900,
        fontWeight: userScore === 1 ? 'bold' : 'normal',
      },
      downvote: {
        color: Colors.grey700,
        fontWeight: userScore === -1 ? 'bold' : 'normal',
      },
      score: {
        fontSize: 18,
        color: getScoreColor(score),
        textAlign: "center",
        fontWeight: userScore !== 0 ? 'bold' : 'normal',
      },
    };

    return (
      <Paper style={{padding: 12, margin: "6px 0px"}}>
        <table>
          <tbody>
          <tr style={{verticalAlign : "top"}}>
            <td>
              <IconButton
                iconStyle={styles.upvote}
                iconClassName="material-icons"
                onClick={this._handleUpvote}>arrow_upward</IconButton>
              <div style={styles.score}> {score} </div>
              <IconButton
                iconStyle={styles.downvote}
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
