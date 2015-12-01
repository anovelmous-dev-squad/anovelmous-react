import React from 'react';
import Relay from 'react-relay';
import { DropDownMenu } from 'material-ui';

class NovelSelect extends React.Component {
  static propTypes = {
    currentNovel: React.PropTypes.object.isRequired,
    novels: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  _updateValue = (event, selectedIndex, menuItem) => {
    this.props.onChange(menuItem.payload);
  }

  render() {
    const novels = this.props.novels.edges.map(edge => (
      { payload: edge.node.id, text: edge.node.title }
    ));
    const novelIndices = {};
    novels.map((novel, index) => {
      novelIndices[novel.payload] = index;
    });
    return (
      <DropDownMenu
        labelStyle={{color: 'white'}}
        menuItems={novels}
        onChange={this._updateValue}
        selectedIndex={novelIndices[this.props.currentNovel.id]} />
    );
  }
}

export default Relay.createContainer(NovelSelect, {
  fragments: {
    currentNovel: () => Relay.QL`
      fragment on Novel {
        id
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        edges {
          node {
            id
            title
          }
        }
      }
    `
  }
});
