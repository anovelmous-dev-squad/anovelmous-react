import React from 'react';
import Relay from 'react-relay';
import { Dialog } from 'material-ui';


class PlotDetailDialog extends React.Component {
  static propTypes = {
    novel: React.PropTypes.object.isRequired,
  };

  render() {
    const { novel } = this.props;
    return (
      <Dialog
        title={novel.title}
        open
        >
        <div>
          {novel.plot.summary}
        </div>
      </Dialog>
    );
  }
}

export default Relay.createContainer(PlotDetailDialog, {
  fragments: {
    novel: () => Relay.QL`
      fragment on Novel {
        title
        plot {
          summary
        }
      }
    `
  }
});
