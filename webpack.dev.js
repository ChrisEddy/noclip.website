const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
const express = require('express');
const mkdirp = require('mkdirp');
const fetch = require('node-fetch');
const app = express();
const _setCorsHeaders = res => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Access-Control-Allow-Headers', '*');
};
app.get('*', (req, res, next) => {
  _setCorsHeaders(res);
  res.end(JSON.stringify({
    ok: true,
  }));
});
app.options('*', (req, res, next) => {
  _setCorsHeaders(res);
  res.end();
});
app.put('*', (req, res, next) => {
  _setCorsHeaders(res);
  const bs = [];
  req.on('data', d => {
    bs.push(d);
  });
  req.on('end', () => {
    try {
      const s = Buffer.concat(bs);
      const j = JSON.parse(s);
      console.log('got j', j);
      const u = new url.URL(j.url);
      console.log('got url', u);
      const p = path.join('d', u.pathname);
      const d = path.dirname(p);
      mkdirp(d);
      fetch(u)
        .then(res => res.arrayBuffer())
        .then(ab => {
          console.log('got ab', u, ab);
          const b = Buffer.from(ab);
          fs.writeFileSync(p, b, err => {
            if (err) {
              console.warn('error', u, err.stack);
            }
          });
        });
    } catch (err) {
      console.warn(err.stack);
    }
    res.end();
  });
});
http.createServer(app)
  .listen(9000);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          // Cache intermediate results
          {loader: 'cache-loader'},
          // Run ts-loader in parallel, leaving one CPU for checker
          {
            loader: 'thread-loader',
            options: {
              workers: require('os').cpus().length - 1,
              poolTimeout: Infinity, // set to Infinity in watch mode
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    // Run ts checker asynchronously
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
    }),
  ],
});
