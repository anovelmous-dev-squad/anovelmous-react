import React from 'react';
import routes from '../routes';
import { RelayRouter } from 'react-router-relay';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import lightTheme from '../styles/lightTheme';

@ThemeDecorator(ThemeManager.getMuiTheme(lightTheme))
export default class Root extends React.Component {

  static propTypes = {
    routerHistory: React.PropTypes.object
  }

  renderRouter () {
    return (
      <RelayRouter
        history={this.props.routerHistory}
        routes={routes} />
    );
  }

  render () {
    return (
      <div>
        {this.renderRouter()}
      </div>
    );
  }
}
