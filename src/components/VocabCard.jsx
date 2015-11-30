import React from 'react';
import { Card, CardTitle, CardText, IconButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import { hexToRgb } from 'utils';

const PREVIEW_LENGTH = 65;

export default class VocabCard extends React.Component {
  static propTypes = {
    term: React.PropTypes.string.isRequired,
    tag: React.PropTypes.string,
    description: React.PropTypes.string,
    onSelectVote: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { detail: false, liked: false };
  }

  _submitTerm = () => {
    this.props.onSelectVote(this.props.term);
  }

  _getDescriptionPreview = (description) => {
    if (description.length < PREVIEW_LENGTH) {
      return description;
    }
    const preview = description.substring(0, PREVIEW_LENGTH);

    return preview.substring(0, preview.lastIndexOf(' ')) + '...';
  }

  render() {
    const { term, tag, description } = this.props;
    let cardColor = '#e0dede';
    switch (tag) {
    case 'Place':
      cardColor = Colors.blueGrey800;
      break;
    case 'Character':
      cardColor = Colors.blueGrey400;
      break;
    case 'Plot Item':
      cardColor = Colors.grey500;
      break;
    default:
      cardColor = '#e0dede';
    }
    const hex = hexToRgb(cardColor);
    cardColor = `rgba(${hex.r}, ${hex.g}, ${hex.b}, 0.45)`;
    const { liked } = this.state;
    return (
      <Card style={{backgroundColor: cardColor}}>
        {this.state.detail && tag !== 'Token' ? (
          <CardText
            onClick={() => this.setState({detail: false})}>
            {this._getDescriptionPreview(description)}
          </CardText>
        ) : (
          <CardTitle
            title={term}
            subtitle={tag}
            onClick={() => this.setState({detail: true})}
            />
        )}
        <div style={{display: 'flex', alignItems: 'center'}}>
          <IconButton iconClassName="material-icons" onClick={this._submitTerm}>
            done
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            iconStyle={{color: Colors.red900}}
            onClick={() => this.setState({liked: !liked})}
            >
            {liked ? 'favorite' : 'favorite_outline'}
          </IconButton>
          <IconButton iconClassName="material-icons">
            more_horiz
          </IconButton>
        </div>
      </Card>
    );
  }
}
