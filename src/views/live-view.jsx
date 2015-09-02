import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNovel } from 'actions';

const NOVEL_ID = 'f2d1c3b5-b9d7-4e4d-a8ea-3d0bb9a26780';

@connect(state => ({
  live: state.live
}), { loadNovel })
export default class LiveView extends React.Component {
    static propTypes = {
      loadNovel: PropTypes.func.isRequired
    };

    constructor () {
      super();
    }

    handleLoadNovel = () => {
      this.props.loadNovel(NOVEL_ID);
    }

    render () {
      const { live } = this.props;
      const novel = live.novels[NOVEL_ID];
      const novelTitle = novel ? novel.title : 'Loading...';

      return (
        <div>
          <p>Currently reading: {novelTitle}</p>
          <button onClick={this.handleLoadNovel}></button>
        </div>
      );
    }
}
