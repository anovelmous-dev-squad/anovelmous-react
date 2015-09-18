import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Chapter from 'components/chapter';
import Relay from 'react-relay';

class RelayView extends React.Component {
    static propTypes = {
      novels: PropTypes.array.isRequired
    };

    render () {
      const { novels } = this.props;
      const novel = novels ? novels[1] : [];

      return (
        <ol>
          {novel.chapters.edges.map(edge => (
            <li><Chapter chapter={edge.chapter}/></li>
          ))}
        </ol>
      );
    }
}

export default Relay.createContainer(RelayView, {
  fragments: {
  }
});
