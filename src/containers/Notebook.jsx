import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';

import Novel from 'containers/Novel';
import Contribute from 'containers/Contribute';
import NovelSelect from 'containers/NovelSelect';

class Notebook extends Component {
  static propTypes = {
    novel: PropTypes.object.isRequired,
    novels: PropTypes.object.isRequired,
    onNovelChange: PropTypes.func.isRequired,
    onVoteCast: PropTypes.func,
    onVoteChange: PropTypes.func
  }
  render () {
    const { novel, novels, onVoteCast, onNovelChange, onVoteChange } = this.props;
    const allowContribution = novel.stage.name === 'WRITING';
    return (
      <div>
        <NovelSelect
          currentNovelId={novel.id}
          novels={novels}
          onChange={onNovelChange}
        />
      {allowContribution ?
        <Contribute
          novel={this.props.novel}
          onVoteCast={onVoteCast}
          onVoteChange={onVoteChange} />
        :
        <Novel novel={this.props.novel} />
      }
      </div>
    );
  }
}

export default Relay.createContainer(Notebook, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        stage {
          name
        }
        ${Novel.getFragment('novel')}
        ${Contribute.getFragment('novel')}
      }
    `,
    novels: () => Relay.QL`
      fragment on NovelConnection {
        ${NovelSelect.getFragment('novels')}
      }
    `
  }
});
