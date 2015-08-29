import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNovel } from 'actions';

@connect(state => ({
  novel: state.currentNovel.novel
}), { loadNovel })
export default class LiveView extends React.Component {
    static propTypes = {
      loadNovel: PropTypes.func.isRequired
    };

    constructor () {
      super();
    }

    handleLoadNovel = () => {
      this.props.loadNovel(1);
    }

    render () {
      const { novel } = this.props;

      return (
        <div>
          <p>Currently reading: {novel.name}</p>
          <button onClick={this.handleLoadNovel}></button>
        </div>
      );
    }
}
