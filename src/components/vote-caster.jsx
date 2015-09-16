import React, { PropTypes } from 'react';
import Autocomplete from 'react-autocomplete';

const styles = {
  token: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedToken: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  }
}

export default class VoteCaster extends React.Component {
  static propTypes = {
    tokens: PropTypes.array.isRequired
  }

  render () {
    return (
      <div>
        <Autocomplete
          initialValue=""
          items={this.props.tokens}
          getItemValue={(item) => item.content}
          shouldItemRender={(token, value) => token.content.startsWith(value)}
          renderItem={(token, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedToken : styles.token}
              key={token.clientId}
            >{token.content}</div>
          )}
        />
      </div>
    );
  }
}
