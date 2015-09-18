import webpack          from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config           from '../config';
import webpackConfig    from './webpack/client';
import express          from 'express';
import graphQLHTTP      from 'express-graphql';
import { Schema }       from '../data/schema';

const graphQLServer = express();
const GRAPHQL_PORT = 8080;

graphQLServer.use('/', graphQLHTTP({ schema: Schema, pretty: true }));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

const paths = config.get('utils_paths');

const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase : paths.project(config.get('dir_src')),
  hot    : true,
  quiet  : false,
  noInfo : false,
  lazy   : false,
  stats  : {
    colors : true
  },
  historyApiFallback : true,
  proxy: { '/graphql': `http://localhost:${GRAPHQL_PORT}` }
});

export default server;
