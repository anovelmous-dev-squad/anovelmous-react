import React from 'react';
import Relay from 'react-relay';
import Select from 'react-select';

class ChapterSelect extends React.Component {
  static propTypes = {
    currentChapterId: React.PropTypes.string.isRequired,
    chapters: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired
  }

  _updateValue = (newValue) => {
    this.props.onSelect(newValue);
  }

  render() {
    const chapters = this.props.chapters.edges.map(edge => (
      { value: edge.node.id, label: edge.node.title })
    );
    return (
      <Select
        name="form-chapter-select"
        value={this.props.currentChapterId}
        options={chapters}
        onChange={this._updateValue}
        searchable={false}
      />
    );
  }
}

export default Relay.createContainer(ChapterSelect, {
  fragments: {
    chapters: () => Relay.QL`
      fragment on ChapterConnection {
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
