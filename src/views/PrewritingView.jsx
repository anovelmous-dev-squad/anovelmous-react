import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';
import CharacterCreator from 'components/CharacterCreator';
import PlaceCreator from 'components/PlaceCreator';
import PlotItemCreator from 'components/PlotItemCreator';
import PlotCreator from 'components/PlotCreator';
import CreateCharacterMutation from 'mutations/CreateCharacterMutation';
import CreatePlaceMutation from 'mutations/CreatePlaceMutation';
import CreatePlotItemMutation from 'mutations/CreatePlotItemMutation';
import CreatePlotMutation from 'mutations/CreatePlotMutation';

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

  _handlePlotCreation = (summary) => {
    Relay.Store.update(
      new CreatePlotMutation({
        summary,
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

  _handlePlotItemCreation = ({ name, description }) => {
    Relay.Store.update(
      new CreatePlotItemMutation({
        name,
        description,
        novelId: this.props.novelId,
        viewer: this.props.contributor
      })
    );
  }

  render() {
    return (
      <div style={styles.base}>
        <PlotCreator onCreate={this._handlePlotCreation} />
        <CharacterCreator onCreate={this._handleCharacterCreation} />
        <PlaceCreator onCreate={this._handlePlaceCreation} />
        <PlotItemCreator onCreate={this._handlePlotItemCreation}/>
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
        plots(first: 5) {
          edges {
            node {
              summary
            }
          }
        }
        characters(first: 5) {
          edges {
            node {
              firstName
              lastName
              bio
            }
          }
        }
        places(first: 5) {
          edges {
            node {
              name
              description
            }
          }
        }
        plotItems(first: 5) {
          edges {
            node {
              name
              description
            }
          }
        }
        ${CreatePlotMutation.getFragment('viewer')}
        ${CreateCharacterMutation.getFragment('viewer')}
        ${CreatePlaceMutation.getFragment('viewer')}
        ${CreatePlotItemMutation.getFragment('viewer')}
      }
    `
  }
});
