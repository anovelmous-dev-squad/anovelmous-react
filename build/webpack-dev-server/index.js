const express = require('express');
const graphQLHTTP = require('express-graphql');
const schema = require('../../data/schema');
const Schema = schema.Schema;
const webpack = require('webpack'),
      config  = require('../../config'),
      WebpackDevServer = require('webpack-dev-server'),
      makeCompiler = require('../webpack/client');

const graphQLServer = express();
const GRAPHQL_PORT = 8080;

graphQLServer.use('/', graphQLHTTP({ schema: Schema, pretty: true }));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  'GraphQL Server is now running on http://localhost:' + GRAPHQL_PORT
));

const server = new WebpackDevServer(webpack(makeCompiler()), {
  contentBase : config.inProject(config.SRC_DIRNAME),
  hot    : true,
  quiet  : config.QUIET_MODE,
  noInfo : config.QUIET_MODE,
  lazy   : false,
  stats  : {
    colors : true
  },
  historyApiFallback : true,
  proxy: { '/graphql': 'http://localhost:' + GRAPHQL_PORT }
});

server.listen(config.WEBPACK_PORT, 'localhost', function () {
  console.log('Webpack dev server running at localhost:' + config.WEBPACK_PORT);
});

module.exports = exports = server;
