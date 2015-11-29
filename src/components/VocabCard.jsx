import React from 'react';
import { Card, CardActions, CardTitle,
         CardText, RaisedButton, IconButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

export default class VocabCard extends React.Component {
  static propTypes = {
    term: React.PropTypes.string.isRequired,
    tag: React.PropTypes.string,
    description: React.PropTypes.string,
    onSelectVote: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { detail: false };
  }

  _submitTerm = (event) => {
    event.preventDefault();
    this.props.onSelectVote(this.props.term);
  }

  render() {
    const { term, tag, description } = this.props;
    return (
      <Card>
        {this.state.detail ? (
          <CardText onClick={() => this.setState({detail: false})}>
            {description}
          </CardText>
        ) : (
          <CardTitle
            title={term}
            subtitle={tag}
            onClick={() => this.setState({detail: true})}
            />
        )}
          <div style={{
          display: 'flex',
          alignItems: 'center'}}>
          <IconButton iconClassName="material-icons" onClick={this._submitTerm}>
            done
          </IconButton>
          <IconButton iconClassName="material-icons" iconStyle={{color: Colors.red900}}>
            favorite
          </IconButton>
          <IconButton iconClassName="material-icons">
            more_horiz
          </IconButton>
        </div>
      </Card>
    );
  }
};
