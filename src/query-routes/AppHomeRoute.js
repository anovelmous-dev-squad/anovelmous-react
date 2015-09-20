import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    contributor: () => Relay.QL`query { contributor }`,
    novels: () => Relay.QL`query { novels }`
  };
  static routeName = 'AppHomeRoute';
}
