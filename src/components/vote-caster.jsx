import React from 'react';
import Autocomplete from 'react-autocomplete';

const styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  }
}

function getTokens () {
  return ['arrow', 'blow', 'tack', 'tacky', 'take', 'taken']
}

function filterTokens (value, cb) {
  if (value === '') {
    return getTokens()
  }

  const tokens = getTokens().filter((token) => {
    return token.startsWith(value);
  })

  cb(tokens);
}


export default class VoteCaster extends React.Component {
  constructor (props) {
    super(props);
    this.state = { allowedTokens: getTokens(), loading: false };
  }

  render () {
    const { allowedTokens } = this.props;

    return (
      <div>
        <Autocomplete
          initialValue=""
          items={getTokens()}
          getItemValue={(item) => item}
          shouldItemRender={(token, value) => token.startsWith(value)}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item}
            >{item}</div>
          )}
        />
      </div>
    );
  }
}
