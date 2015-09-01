import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadNovel } from 'actions';

@connect(state => ({
  novel: state.currentNovel
}), { loadNovel })
export default class LiveView extends React.Component {
    static propTypes = {
      loadNovel: PropTypes.func.isRequired
    };

    constructor () {
      super();
    }

    handleLoadNovel = () => {
      this.props.loadNovel('f2d1c3b5-b9d7-4e4d-a8ea-3d0bb9a26780');
    }

    render () {
      const { novel } = this.props;

      return (
        <div>
          <p>Currently reading:</p>
          <button onClick={this.handleLoadNovel}></button>
        </div>
      );
    }
}
