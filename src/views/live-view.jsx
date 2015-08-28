import React from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  novel: state.currentNovel.novel
}))
export default class LiveView extends React.Component {
    constructor () {
      super();
    }

    render () {
      const { novel } = this.props;

      return (
        <div>
          <p>Currently reading: {novel.name}</p>
        </div>
      );
    }
}
