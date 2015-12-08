const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('require-env');

const API_HOST = env.require('API_HOST');
const API_PORT = env.require('API_PORT');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

const DEV_PORT = 8098;
const cssFilename = isProduction ? '[name].[hash].css' : '[name].css';
const JSFilename = isProduction ? 'app.[hash].js' : 'app.js';
const devOrigin = `http://localhost:${DEV_PORT}/`;
const PublicPath = isProduction ? 'https://s3.amazonaws.com/react-starter.com/' : devOrigin;

const API_ORIGIN = {
  'development': `http://${API_HOST}:${API_PORT}`,
  'production': 'https://mine-portfolio.herokuapp.com'
}[NODE_ENV];

const LOGIN_URL = {
  'development': `${API_ORIGIN}/auth/twitter`,
  'production': 'https://mine-portfolio.herokuapp.com/auth/twitter'
}[NODE_ENV];

const S3_POLICY_URL = `${API_ORIGIN}/file-upload/policy`;

const S3_ORIGIN = {
  'development': 'https://mine-stag.s3.amazonaws.com',
  'production': 'https://mine-prod.s3.amazonaws.com'}[NODE_ENV];

export const IMGIX_ORIGIN = {
  'development': 'https://mine-staging.imgix.net',
  'production': 'https://mine-prod.imgix.net'}[NODE_ENV];

const cssLoaders = function(env) {
  const localIdentName = {
    development: '[path][name]---[local]---[hash:base64:5]',
    production: '[hash:base64:5]',
  }[env];

  const ret = [
    `css-loader?modules&localIdentName=${localIdentName}`,
    'autoprefixer-loader?browsers=last 2 versions',
    'sass',
  ];
  if (!isProduction) ret.unshift('style-loader');

  return ret;
}(NODE_ENV);

const config = {
  entry: { app: ['./index.js'] },
  devtool: (isProduction ? null : 'cheap-module-source-map'),
  context: __dirname + '/app',
  output: {
    filename: JSFilename,
    path: __dirname + '/dist',
    publicPath: PublicPath
  },
  resolve: {
    alias: {
      app: __dirname + '/app'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './app/index.html', title: 'Mine' }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(NODE_ENV),
      __API_ORIGIN__: JSON.stringify(API_ORIGIN),
      __LOGIN_URL__: JSON.stringify(LOGIN_URL),
      __S3_POLICY_URL__: JSON.stringify(S3_POLICY_URL),
      __IMGIX_ORIGIN__: JSON.stringify(IMGIX_ORIGIN),
      __S3_ORIGIN__: JSON.stringify(S3_ORIGIN),
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {plugins: ['./app/util/babelRelayPlugin']}
      },
      {
        test: /\.(svg|png)/,
        loader: 'url?limit=100000'
      }
    ]
  },
};

if (isProduction) {
  config.plugins.push(new ExtractTextPlugin(cssFilename));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  config.plugins.push(new webpack.optimize.DedupePlugin());
}

if (isProduction) {
  config.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
  });
} else {
  config.module.loaders.push({
    test: /\.(css|scss)$/,
    loader: cssLoaders.join('!')
  });
}

config.devServer = {
  port: DEV_PORT
};

module.exports = config;
