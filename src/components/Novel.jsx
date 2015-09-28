import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Chapter from './Chapter';
import Radium from 'radium';

@Radium
class Novel extends React.Component {
  static propTypes = {
    novel: PropTypes.object.isRequired
  }

  render () {
    const { novel } = this.props;
    return (
      <div>
        <h3>{novel.title}</h3>
        <Chapter chapter={novel.chapter}/>
      </div>
    );
  }
}

export default Relay.createContainer(Novel, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        id
        title
        chapter(mostRecent: true) {
          ${Chapter.getFragment('chapter')}
        }
      }
    `
  }
});
