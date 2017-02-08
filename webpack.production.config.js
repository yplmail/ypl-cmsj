var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/pages/main.jsx'),
        vendors: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /^node_modules$/,
            loader: 'babel?presets=es2015&compact=false',
        }, {
            test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
        }, {
            test: /\.scss$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=10240&name=fonts/[name]_[hash:7].[ext]'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=10240&name=images/[name]_[hash:7].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css', '.less'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new ExtractTextPlugin('css/app.css'),
        // new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new uglifyJsPlugin({
            comments: false,        //去掉注释
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            { from: './app/reset/reset.css', to: 'reset/reset.css' },
            { from: './app/reset/reset.js', to: 'reset/reset.js' }
        ]),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: './app/template.html',
            chunksSortMode: 'dependency',
            inject: true,
            hash: true
        })
    ],
    postcss: [
        require('autoprefixer')({
            browsers: ['> 1%', 'last 5 versions', 'Firefox >= 20', 'ie > 8']
        })
    ]
};

if (true) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
