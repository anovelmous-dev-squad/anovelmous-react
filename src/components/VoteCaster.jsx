import React from 'react';
import Relay from 'react-relay';
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
};

class VoteCaster extends React.Component {
  static propTypes = {
    tokens: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired
  }

  _handleVoteCast = (tokenText, token) => {
    this.props.onSave(token);
  }

  render() {
    const { tokens } = this.props;
    const tokenList = tokens.edges.map(edge => edge.node);

    return (
      <div>
        <Autocomplete
          initialValue=""
          items={tokenList}
          getItemValue={(item) => item.content}
          shouldItemRender={(token, value) => token.content.startsWith(value)}
          renderItem={(token, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedToken : styles.token}
              key={token.id}
              >
              {token.content}
            </div>
          )}
          onSelect={this._handleVoteCast}
        />
      </div>
    );
  }
}

export default Relay.createContainer(VoteCaster, {
  fragments: {
    tokens: () => Relay.QL`
      fragment on TokenConnection {
        edges {
          node {
            id
            content
          }
        }
      }
    `
  }
});
