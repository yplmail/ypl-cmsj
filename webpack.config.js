var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './app',
        port: 8080
    },
    //在控制台的sources下，点开可以看到webpack://目录，里面可以直接看到我们开发态的源代码，
    //这样方便我们直接在浏览器中打断点调试
    //devtool: 'cheap-source-map',
    //devtool: '#source-map',
    devtool: '#cheap-module-source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        path.resolve(__dirname, 'app/pages/main.jsx')
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: './js/app.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel?presets=es2015&compact=false',
            }, {
                test: /\.json$/,
                use: 'json-loader'
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
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css', '.less'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'layer': path.resolve(__dirname, './app/components/layer'),
            'player': path.resolve(__dirname, './app/components/player'),
            'scroll': path.resolve(__dirname, './app/components/scroll'),
            'server': path.resolve(__dirname, './app/components/server'),
            'share': path.resolve(__dirname, './app/components/share'),
            'md5'  : path.resolve(__dirname, './app/components/md5'),
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new ExtractTextPlugin("css/app.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: './app/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), //启用报错不打断模式     
        new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
    ],
    postcss: [
        require('autoprefixer')({
            browsers: ['> 1%', 'last 5 versions', 'Firefox >= 20', 'ie > 8']
        })
    ]
};
