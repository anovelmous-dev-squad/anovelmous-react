import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import CharacterCreator from 'components/CharacterCreator';
import NovelCrafter from 'components/NovelCrafter';

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
    const { contributor } = this.props;
    const needsSummary = true;
    return (
      <div style={styles.base}>
        <CharacterCreator onSave={this._handleCharacterCreation} />
        <NovelCrafter needsSummary={needsSummary} />
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
