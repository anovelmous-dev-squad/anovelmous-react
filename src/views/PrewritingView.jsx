import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import CharacterCreator from 'components/CharacterCreator';
import PlaceCreator from 'components/PlaceCreator';
import NovelCrafter from 'components/NovelCrafter';
import CreateCharacterMutation from 'mutations/CreateCharacterMutation';
import CreatePlaceMutation from 'mutations/CreatePlaceMutation';

const styles = {
  base: {
    border: 1,
    borderRadius: 3
  }
};

@Radium
class PrewritingView extends React.Component {
  static propTypes = {
    contributor: React.PropTypes.object.isRequired,
    novelId: React.PropTypes.string.isRequired
  }

  _handlePlaceCreation = ({ name, description }) => {
    Relay.Store.update(
      new CreatePlaceMutation({
        name,
        description,
        novelId: this.props.novelId,
        viewer: this.props.contributor
      })
    );
  }

  _handleCharacterCreation = ({ firstName, lastName, bio }) => {
    Relay.Store.update(
      new CreateCharacterMutation({
        firstName,
        lastName,
        bio,
        novelId: this.props.novelId,
        viewer: this.props.contributor
      })
    );
  }

  render() {
    const { contributor } = this.props;
    const needsSummary = true;
    return (
      <div style={styles.base}>
        <CharacterCreator onSave={this._handleCharacterCreation} />
        <PlaceCreator onCreate={this._handlePlaceCreation} />
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
