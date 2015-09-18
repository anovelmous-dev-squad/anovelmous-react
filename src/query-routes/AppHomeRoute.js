import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    novels: () => Relay.QL`query { novels(ids: $novelIds) }`
  };
  static routeName = 'AppHomeRoute';
}
