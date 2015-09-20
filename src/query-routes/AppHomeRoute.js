import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    contributor: () => Relay.QL`query { contributor }`
  };
  static routeName = 'AppHomeRoute';
}
