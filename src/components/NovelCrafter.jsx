import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
    background: 'rgb(181, 181, 181)'
  }
};

@Radium
export default class NovelCrafter extends React.Component {
  static propTypes = {
    needsSummary: React.PropTypes.bool
  }

  renderSummaryEntry() {
    return (
      <div>
        <h3>Please vote on the following attributes of the new novel.</h3>
        <textarea placeholder="Enter a brief summary of the novel"></textarea>
      </div>
    );
  }

  renderTitleEntry() {
    return (
      <div>
        <h3>Let's name it!</h3>
        <input placeholder="New novel title (i.e. Dracula)" />
      </div>
    );
  }

  render() {
    const { needsSummary } = this.props;
    return (
      <div style={styles.base}>
        {needsSummary ? this.renderSummaryEntry() : this.renderTitleEntry()}
      </div>
    );
  }
}
