import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    novels: () => Relay.QL`query { contributor }`
  };
  static routeName = 'AppHomeRoute';
}
