import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import CharacterCreator from 'components/CharacterCreator';

const styles = {
  base: {
    border: 1,
    borderRadius: 3
  }
};

@Radium
class PrewritingView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired
  }

  _handleCharacterCreation = ({ firstName, lastName, bio }) => {

  }

  render() {
    return (
      <div style={styles.base}>
        <h3>Please vote on the following attributes of the new novel.</h3>
        <textarea placeholder="Enter a brief summary of the novel"></textarea>

        <CharacterCreator onSave={this._handleCharacterCreation} />

        <h3>Let's name it!</h3>
        <input placeholder="New novel title (i.e. Dracula)" />
        <input placeholder="First chapter title" />
      </div>
    );
  }
}

export default Relay.createContainer(PrewritingView, {
  initialVariables: {
    novelId: null
  },
  fragments: {
    contributor: () => Relay.QL`
      fragment on Contributor {
        id
        novel(id: $novelId) {
          title
        }
      }
    `
  }
});
