const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path');
const ngToolsWebpack = require('@ngtools/webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main-aot.ts' // AoT compilation
    },

    output: {
        path: path.join(__dirname, '.dist/web/aot/'),
        filename: 'js/[name]-[hash:8].bundle.js',
        chunkFilename: 'js/[id]-[hash:8].chunk.js',
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                use: 'file-loader?name=assets/[name]-[hash:6].[ext]',
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader')
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),

        new CleanWebpackPlugin(
            [
                './.dist/web/aot/'
            ]
        ),

        new ngToolsWebpack.AngularCompilerPlugin({
            tsConfigPath: './tsconfig-aot.json'
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),

        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),

        new ExtractTextPlugin("styles.css"),

        new webpack.optimize.CommonsChunkPlugin(
        {
            name: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: './src/index.html'
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};