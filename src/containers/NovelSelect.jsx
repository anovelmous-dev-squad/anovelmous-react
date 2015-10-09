import React from 'react';
import Relay from 'react-relay';
import Select from 'react-select';

class NovelSelect extends React.Component {
  static propTypes = {
    currentNovelId: React.PropTypes.string.isRequired,
    novels: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  _updateValue = (newValue) => {
    this.props.onChange(newValue);
  }

  render() {
    const novels = this.props.novels.edges.map(edge => (
      { value: edge.node.id, label: edge.node.title })
    );
    return (
      <Select
        name="form-novel-select"
        value={this.props.currentNovelId}
        options={novels}
        onChange={this._updateValue}
        searchable={false}
      />
    );
  }
}

export default Relay.createContainer(NovelSelect, {
  fragments: {
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
