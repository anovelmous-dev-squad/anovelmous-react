import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

import Novel from 'components/Novel';
import NovelSelect from 'containers/NovelSelect';

class Reader extends Component {
  static propTypes = {
    novel: PropTypes.object.isRequired,
    novels: PropTypes.object.isRequired,
    onNovelChange: PropTypes.func.isRequired
  }
  render () {
    return (
      <div>
        <NovelSelect
          currentNovelId={this.props.novel.id}
          novels={this.props.novels}
          onChange={this.props.onNovelChange}
        />
        <Novel novel={this.props.novel} />
      </div>
    );
  }
}

export default Relay.createContainer(Reader, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        ${Novel.getFragment('novel')}
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        ${NovelSelect.getFragment('novels')}
      }
    `
  }
});
